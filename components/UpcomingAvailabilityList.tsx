import { Button, Card } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikInput from './FormikInput';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function UpcomingAvailabilityList({
	accessToken,
	domainUrl,
}: UpcomingAvailabilityListProps) {
	// const { data: session } = useSession();

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
			await axios.get(`${domainUrl}/server/api/v1/availability/${date}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		).data.times;
		setAppointments(appointmentsData);
	}

	// added useCallback to improve performance
	const handleFormSubmit = useCallback(({ date }: { date: string }) => {
		setDate(date);
	}, []);

	return (
		<>
			<Card className="shadow sm:w-96 w-80">
				<div className="flex justify-between gap-4 p-4">
					{/* PICK DATE COMPONENT */}
					<div className="sm:w-40 w-32">
						<Formik
							initialValues={{
								date: '',
							}}
							onSubmit={handleFormSubmit}
						>
							<Form>
								<div className="">
									<FormikInput
										key={'date'}
										id={'date'}
										name={'date'}
										label={'Pick your date'}
										type={'date'}
										width={'w-full'}
									/>
									<Button className="sm:w-40 w-32" type="submit">
										Select Day
									</Button>
								</div>
							</Form>
						</Formik>
					</div>

					{/* PICK TIME COMPONENT*/}
					<div className="sm:w-40 w-32">
						{appointments && appointments.length > 0 && (
							<Formik
								initialValues={{
									time: '',
								}}
								onSubmit={({ time }) => {
									setTime(time);
								}}
							>
								<Form>
									<div>
										<FormikInput
											key={'time'}
											id={'time'}
											name={'time'}
											label={'Select time'}
											as={'select'}
											options={appointments}
											width={'w-full'}
										/>

										<Button type="submit" className="sm:w-40 w-32">
											Reserve
										</Button>
									</div>
								</Form>
							</Formik>
						)}
					</div>
				</div>
			</Card>
		</>
	);
}
