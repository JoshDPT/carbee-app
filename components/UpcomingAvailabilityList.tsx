import { Button, Card } from 'flowbite-react';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import { useSession } from 'next-auth/react';
import AppointmentCard from './AppointmentCard';

const { publicRuntimeConfig } = getConfig();

export default function UpcomingAvailabilityList() {
	// pull the session token from the server
	const { data: session } = useSession();

	// initialize state for appointments
	const [appointments, setAppointments] = useState<Appointment[] | null>(null);
	const [appointmentNum, setAppointmentNum] = useState(-1);

	useEffect(() => {
		handleAppointmentChange(true);
	}, []);

	async function handleAppointmentChange(increment: boolean) {
		const newAppointmentNum = increment
			? appointmentNum + 1
			: appointmentNum - 1;

		if (newAppointmentNum < 0) return;

		const appointmentsData: Appointment[] = (
			await axios.get(
				`${publicRuntimeConfig.DOMAIN_URL}/server/api/v1/appointments?page=${newAppointmentNum}&size=1`,
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			)
		).data;
		// If there are no appointments at that page #, return without incrementing/decrementing
		if (!appointmentsData.length) return;

		setAppointmentNum(newAppointmentNum);
		setAppointments(appointmentsData);
	}

	// Render the component with the count and button elements
	return (
		<div className="w-80">
			<Card className="flex flex-col items-center justify-center p-4">
				<h1 className="flex items-center justify-center w-36 h-12 text-lg font-bold text-white bg-slate-500 rounded-full mx-auto">
					Count: {appointmentNum}
				</h1>
				<div className="flex justify-center gap-3">
					<Button
						className="w-36"
						onClick={() => handleAppointmentChange(false)}
					>
						Previous
					</Button>
					<Button
						className="w-36"
						onClick={() => handleAppointmentChange(true)}
					>
						Next
					</Button>
				</div>
			</Card>
			{appointments &&
				appointments.length > 0 &&
				appointments?.map((appointment) => (
					// <Card
					// 	key={appointment.id}
					// 	className="flex flex-col justify-center content-center p-4 w-96 h-12"
					// >
					// 	<h1>{appointment.id}</h1>
					// 	<h1>{appointment.workOrderDto.service}</h1>
					// </Card>
					<AppointmentCard key={appointment.id} appointment={appointment} />
				))}
		</div>
	);
}
