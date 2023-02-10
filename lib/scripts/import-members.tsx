
import * as dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

import { buildClient } from '@datocms/cma-client'
import regions from '../../regions.json';
import slugify from 'slugify'
import ExcelJS from 'exceljs';
import fs from 'fs';
import jwt from 'jsonwebtoken'

import { Email } from '../emails'
import { Item } from '@datocms/cma-client/dist/types/generated/SimpleSchemaTypes';

//const excelFile = `${process.cwd()}/KOMPLETT MEDLEMSLISTA (KC JANUARI 2023).xlsx`;
const excelFile = `${process.cwd()}/medlemslista-test.xlsx`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const workbook = new ExcelJS.Workbook();
const allMembers = [];
const errors = [];

const environment = "dev";
const mainclient = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL as string, environment });


const generateToken = async (email: string): Promise<any> => {
	return jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: 12000 });
}

console.time("import");

workbook.xlsx.readFile(excelFile).then((doc) => {
	doc.eachSheet(function (worksheet, sheetId) {
		worksheet.eachRow((row, idx) => {
			if (idx > 1) {
				const regionSlug = worksheet.name
					.toLowerCase()
					.replace("ö", "o")
					.replace("å", "a")
					.replace("ä", "a");

				const member = {
					first_name: row.getCell(1).value?.trim(),
					last_name: row.getCell(2).value?.trim(),
					full_name: `${row.getCell(1).value?.trim()} ${row.getCell(2).value?.trim()}`,
					email:
						typeof row.getCell(3) === "object"
							? row.getCell(3).text.trim()
							: row.getCell(3).value.trim(),
					slug: slugify(`${row.getCell(1).value} ${row.getCell(2).value}`, {
						lower: true,
						strict: true,
					}),
					region: regions.find((el) => el.slug === regionSlug),
				};
				if (
					!member.email ||
					!member.region ||
					!member.first_name ||
					!member.last_name ||
					!member.slug
				) {
					errors.push(member);
				} else allMembers.push(member);
			}
		});
		if (doc.worksheets.length === sheetId) importMembers();
	});
});

async function createMember() {

}

async function importMembers() {

	let currentMembers = []; //await mainclient.items.list({ filter: { type: "member" } });
	console.log("get current members...");
	for await (const record of mainclient.items.listPagedIterator({ filter: { type: "member" } })) {
		currentMembers.push(record);
	}

	const r = {};
	const slugs = {};
	const failed = [];
	const success = [];
	let insertCount = 0;

	allMembers
		.filter((m) => !currentMembers.find((el) => el.email === m.email))
		.forEach((member) => {
			!r[member.region.slug] && (r[member.region.slug] = { members: [] });
			r[member.region.slug].members.push(member);
			insertCount++;
		});

	currentMembers.concat(allMembers).forEach((el) => {
		slugs[el.slug] === undefined && (slugs[el.slug] = 0);
		slugs[el.slug]++;
		slugs[el.slug] > 1 && (el.slug = `${el.slug}-${slugs[el.slug]}`);
	});

	//return;
	console.log(
		`Creating ${insertCount} members (${currentMembers.length}), ${Object.keys(r).length
		} regions...`
	);

	let counter = 0;

	for (let x = 0; x < Object.keys(r).length; x++) {
		const { members } = r[Object.keys(r)[x]];
		const apiToken = process.env[`GRAPHQL_API_TOKEN_${members[0].region.slug.toUpperCase()}`];
		const client = buildClient({ apiToken, environment });
		let reqs: Promise<Item>[] = [];

		for (let i = 0; i < members.length; i++) {

			const member = {
				item_type: { type: "item_type", id: "1185543" },
				...members[i],
				resettoken: await generateToken(members[i].email),
				region: members[i].region.id,
			};

			console.log(`create member ${i}/${members.length}:`, member.first_name, member.last_name, member.email)

			try {
				await client.items.create(member)
				await Email.memberInvitation({
					email: member.email,
					name: `${member.first_name} ${member.last_name}`,
					token: member.resettoken
				})

				success.push(member)
			} catch (err) {
				failed.push({ member, err });
			}
			await sleep(100);
		}
	}
	fs.writeFileSync("./failed.json", JSON.stringify(failed, null, 2));
	fs.writeFileSync("./success.json", JSON.stringify(failed, null, 2));
	console.timeEnd("import");
	process.exit(0);
}
