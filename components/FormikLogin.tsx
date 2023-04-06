import { Button, Card } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikInput from './FormikInput';
import * as Yup from 'yup';

interface FormikProps {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	as?: string;
	options?: string[] | number[];
	errors?: Error;
	touched?: Touched;
	type?: 'text' | 'password' | 'email' | 'date';
	width?: string;
}

interface Error {
	email: string;
	password: string;
}
interface Touched {
	email: boolean;
	password: boolean;
}

const ReservationSchema = Yup.object().shape({
	email: Yup.string()
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
	
	const formMap: FormikProps[] = [
		{
			id: 'email',
			name: 'email',
			label: 'Your email',
			placeholder: 'email@email.com',
      width: '48',
		},
		{
			id: 'password',
			name: 'password',
			label: 'Your password',
      width: '48',
		},
	];

	return (
		<div className="w-96">
			<Card className='p-5'>
				<div className="flex content-center items-center justify-center font-bold">
					<h1>Carbee</h1>
				</div>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={ReservationSchema}
					onSubmit={(values) => {
						alert(JSON.stringify(values, null, 2));
					}}
				>
					{({ errors, touched }) => (
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
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
}
