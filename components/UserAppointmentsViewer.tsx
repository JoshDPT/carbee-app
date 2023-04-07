import { Button, Card } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikInput from './FormikInput';
import { useEffect, useState, useMemo, useCallback } from 'react';
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

	// fetch protected data and update the appointment options
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

	const formMap: FormikProps[] = useMemo(
		() => [
			{
				id: 'date',
				name: 'date',
				label: 'Pick your date',
				type: 'date',
				width: '36',
			},
		],
		[]
	);

	const handleFormSubmit = useCallback(({ date }: { date: string }) => {
		setDate(date);
	}, []);

	return (
		<div className="flex flex-col w-96 gap-4">
			<Card className='flex flex-col justify-center content-center p-4'>
				<Formik
					initialValues={{
						date: '',
					}}
					onSubmit={handleFormSubmit}
				>
					<Form className="flex w-full flex-row content-center items-center justify-center gap-6">
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
						<div className="mt-8 w-36">
							<Button type="submit" className="w-full mb-2">
								Select Day
							</Button>
						</div>
					</Form>
				</Formik>
			</Card>

			{appointments && appointments.length > 0 && (
				<Card className='flex flex-col justify-center content-center p-4'>
					<Formik
						initialValues={{
							time: '',
						}}
						onSubmit={({ time }) => {
							setTime(time);
						}}
					>
						<Form className="flex w-full flex-row content-center items-center justify-center gap-6">
							<FormikInput
								key={'time'}
								id={'time'}
								name={'time'}
								label={'Select time'}
								as={'select'}
								options={appointments}
								width="36"
							/>
							<div className="mt-8 w-36">
								<Button type="submit" className="w-full mb-2">
									Reserve
								</Button>
							</div>
						</Form>
					</Formik>
				</Card>
			)}
		</div>
	);
}
