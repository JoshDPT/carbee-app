import { Button, Card } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikInput from './FormikInput';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function UserAppointmentsViewer() {
	const { data: session } = useSession();

	const [date, setDate] = useState<string | null>(null);
	const [time, setTime] = useState<string | null>(null);
	const [appointments, setAppointments] = useState<string[] | null>(null);

	useEffect(() => {
		if (date) {
			fetchAvailability();
		}
	}, [date]);

	async function fetchAvailability() {
		const appointmentsData: string[] = (
			await axios.get(
				`${publicRuntimeConfig.DOMAIN_URL}/server/api/v1/availability/${date}`,
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			)
		).data.times;
		setAppointments(appointmentsData);
	}

	const formMap: FormikProps[] = [
		{
			id: 'date',
			name: 'date',
			label: 'Pick your date',
			type: 'date',
			width: '24',
		},
	];

	return (
		<div>
			<Card>
				<Formik
					initialValues={{
						date: '',
					}}
					onSubmit={({ date }) => {
						setDate(date);
					}}
				>
					<Form className="flex flex-row gap-6 sm:w-48 md:w-96 lg:w-96">
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
								Find Time
							</Button>
						</div>
					</Form>
				</Formik>
			</Card>

			{appointments && appointments.length > 0 && (
				<Card>
					<Formik
						initialValues={{
							time: '',
						}}
						onSubmit={({ time }) => {
							setTime(time);
						}}
					>
						<Form className="flex flex-row gap-6 sm:w-48 md:w-96 lg:w-96">
							<FormikInput
								key={'time'}
								id={'time'}
								name={'time'}
								label={'Select time'}
								as={'select'}
								options={appointments}
							/>
							<div className="mt-8">
								<Button type="submit" className="w-full">
									Find Time
								</Button>
							</div>
						</Form>
					</Formik>
				</Card>
			)}
		</div>
	);
}
