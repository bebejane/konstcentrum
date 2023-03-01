import s from "./index.module.scss";
import text from './text.json'
import memberService from "/lib/services/member";
import { SubmitButton } from "./Auth";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from '/components'
import { isEmail } from "/lib/utils";
import type { Upload } from '/components/common/FileUpload'

export default function Apply({ regions = [], onSuccess }) {
	const [application, setApplication] = useState();
	const successRef = useRef<HTMLDivElement | undefined>()

	useEffect(() => {
		application && successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		application && onSuccess(application)
	}, [application, successRef, onSuccess])

	return (
		<div className={s.container}>
			{!application ? (
				<ApplicationForm regions={regions} setApplication={setApplication} />
			) : (
				<div className={s.success} ref={successRef}>
					<h1>{text.thanksForRegistering}</h1>
					<p>{text.reviewYourRegistration}</p>
				</div>
			)}
		</div>
	);
}

const ApplicationForm = ({ regions, setApplication }) => {

	const [error, setError] = useState<undefined | Error>();
	const { register, handleSubmit, watch, getValues, formState: { errors, isSubmitting, isValid } } = useForm();
	const [upload, setUpload] = useState<Upload | undefined>()
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState<number | undefined>()
	const [uploadError, setUploadError] = useState<Error | undefined>()
	const uploadRef = useRef<HTMLInputElement | undefined>()
	const email = watch('email')
	const regionId = watch('regionId')

	const handleUploadDone = (upload: Upload) => {
		setUpload(upload)
		setProgress(undefined)
		setUploading(false)
	}
	useEffect(() => { uploading && setUpload(undefined) }, [uploading])
	useEffect(() => {
		if (!uploadError) return
		setProgress(undefined)
		setUploading(false)
	}, [uploadError])

	useEffect(() => {
		isSubmitting && setError(undefined)
	}, [isSubmitting]);

	const onSubmitApplication = async ({ email, firstName, lastName, education, webpage, message, regionId }) => {

		try {
			const app = await memberService.apply({
				email,
				firstName,
				lastName,
				education,
				webpage,
				message,
				regionId,
				pdf: upload ? { upload_id: upload.id } : undefined
			});
			setApplication(app);
		} catch (err) {
			console.log(err.response?.data);
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};

	const uploadTags = regionId && regionId !== 'false' ? [regions.find(el => el.id === regionId).slug] : []

	return (
		<>
			<form className={s.form} onSubmit={handleSubmit(onSubmitApplication)}>
				{errors.email && <label className={s.formError}>E-post felaktig...</label>}
				<input
					className={errors.email && s.error}
					placeholder={`${text.email}...`}
					{...register("email", {
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
				/>

				{errors.firstName && <label className={s.formError}>Förnamn felaktigt...</label>}
				<input
					{...register("firstName", { required: true })}
					className={errors.firstName && s.error}
					placeholder={`${text.firstName}...`}

				/>

				{errors.lastName && <label className={s.formError}>Efternamn felaktigt...</label>}
				<input
					{...register("lastName", { required: true })}
					className={errors.lastName && s.error}
					placeholder={`${text.lastName}...`}
				/>

				{errors.webpage && <label className={s.formError}>Websida är ogiltig...</label>}
				<input
					{...register("webpage", {
						required: false,
						pattern: /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/s
					})}
					className={errors.webpage && s.error}
					placeholder={`${text.webpage}...`}

				/>

				{errors.education && <label className={s.formError}>Utbildning felatktigt format...</label>}
				<textarea
					{...register("education", { required: false })}
					rows={5}
					className={errors.education && s.error}
					placeholder={`${text.education}...`}
				/>

				{errors.message && <label className={s.formError}>Meddelande är tomt...</label>}
				<textarea
					{...register("message", { required: true })}
					rows={10}
					className={errors.message && s.error}
					placeholder={`${text.message}...`}
				/>

				{errors.regionId && <label className={s.formError}>Välj en region...</label>}
				<select
					{...register("regionId", {
						required: true,
						validate: (value: string) => regions.find(({ id }) => value === id) !== undefined
					})}
					className={errors.roledId && s.error}
					placeholder={`${text.region}...`}
				>
					<option value="false">Välj region</option>
					{regions.map((r, i) => (
						<option key={i} value={r.id}>
							{r.name}
						</option>
					))}
				</select>

				{uploadError &&
					<div className={s.formError}>{uploadError.message}</div>
				}
				<button
					type="button"
					onClick={() => uploadRef.current?.click()}
					disabled={progress !== undefined || uploading || !isEmail(email) || !regionId || regionId === 'false'}
				>
					{upload ? upload.basename : progress === undefined ? 'Ladda upp Pdf' : `${progress}%`}
				</button>

				<FileUpload
					ref={uploadRef}
					customData={{}}
					tags={uploadTags}
					accept=".pdf"
					sizeLimit={10}
					onDone={handleUploadDone}
					onProgress={setProgress}
					onUploading={setUploading}
					onError={setUploadError}
					mediaLibrary={false}
				/>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				{error &&
					<p className={s.formError}>{`${error.error || error.message || error}`}</p>
				}
			</form>
		</>
	);
};
