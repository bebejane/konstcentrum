import s from "./[about].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AboutDocument, AllAboutsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article } from "/components";

type AboutProps = {
	about: AboutRecord
}

export default function About({ about: { title, image, intro, content } }: AboutProps) {

	return (
		<Article
			title={title}
			image={image}
			text={intro}
			content={content}
		/>
	);
}

export async function getStaticPaths() {
	const { abouts } = await apiQuery(AllAboutsDocument)
	const paths = abouts.map(({ slug }) => ({ params: { about: slug } }));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.about;
	const { about } = await apiQuery(AboutDocument, { variables: { slug } });

	return {
		props: {
			...props,
			about
		},
		revalidate
	};
});

