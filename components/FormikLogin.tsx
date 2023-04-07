import { Button, Card } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikInput from './FormikInput';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { AiFillCar } from 'react-icons/ai';

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.email()
		.required('Required'),
	password: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
});

export default function FormikLogin() {
	const router = useRouter();
	const { data: session } = useSession();
	console.log(session);

	// console.log('session ', session);
	async function handleSubmit({ username, password }: LoginData) {
		const res = await signIn('credentials', {
			redirect: false,
			username,
			password,
		});
		if (res?.error) {
			console.log('invalid credentials');
		} else {
			console.log('signed in');
			router.push('/dashboard');
		}
	}

	const formMap: FormikProps[] = [
		{
			id: 'username',
			name: 'username',
			label: 'Your username',
			placeholder: 'email@email.com',
		},
		{
			id: 'password',
			type: 'password',
			name: 'password',
			label: 'Your password',
		},
	];

	return (
		<div className="w-80 md:w-96">
			<Card className="p-5 shadow-lg">
				<div className="flex content-center items-center justify-center font-bold">
				<a href="#" className="flex items-center gap-3">
          {/* IMAGE */}
          <span className="self-center whitespace-nowrap text-3xl italic font-black dark:text-white">
            Carbee
          </span>
          <AiFillCar size={36}/>
        </a>
				</div>
				<Formik
					initialValues={{
						username: '',
						password: '',
					}}
					validationSchema={LoginSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ errors, touched, handleSubmit, isSubmitting }) => (
						<Form className="flex flex-col gap-6">
							{formMap.map((e, i) => (
								<FormikInput
									key={i}
									id={e.id}
									name={e.name}
									label={e.label}
									as={e.as}
									options={e.options}
									type={e.type}
									placeholder={e.placeholder}
									width={e.width}
								/>
							))}
							<div className="mt-8">
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Please wait...' : 'Login'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
}
