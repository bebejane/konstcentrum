import styles from "./index.module.scss";
import text from "./text.json";
import { SubmitButton } from "./Auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function SignIn({ csrfToken, providers }) {

	const router = useRouter();
	const [error, setError] = useState<undefined | string | Error>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmitSignIn = async ({ username, password }) => {

		await signIn("credentials", {
			callbackUrl: `${window.location.origin}/konstnar/konto`,
			username,
			password,
		});
		console.log('signin done');
	};

	useEffect(() => {
		router.query.error && setError("Användarnamn eller lösnord är felaktigt")
	}, [router]);

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				method="post"
				action="/api/auth/callback/credentials"
				onSubmit={handleSubmit(onSubmitSignIn)}
			>
				<input name="csrfToken" type="hidden" value={csrfToken} />
				<input
					{...register("username", { required: true })}
					placeholder={`${text.email}...`}
					name="username"
					type="text"
					className={errors.password && styles.error}
				/>
				<input
					{...register("password", { required: true })}
					placeholder={`${text.password}...`}
					name="password"
					type="password"
					className={errors.password && styles.error}
				/>
				<SubmitButton loading={isSubmitting}>
					{text.send}
				</SubmitButton>
				{error &&
					<p className={styles.formError}>
						{`${typeof error === 'string' ? error : error.message}`}
					</p>
				}
			</form>
		</div>
	);
}
