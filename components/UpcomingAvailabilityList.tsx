import { Button, Card } from 'flowbite-react';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import { BsFillCalendarEventFill } from 'react-icons/bs';



interface UpcomingAvailabilityListProps {
	accessToken: string;
	domainUrl: string;
}

export default function UpcomingAvailabilityList({
	accessToken,
	domainUrl,
}: UpcomingAvailabilityListProps) {
	// pull the session token from the server
	// const { data: session } = useSession();

	// initialize state for appointments
	const [appointments, setAppointments] = useState<Appointment[] | null>(null);
	const [appointmentNum, setAppointmentNum] = useState(-1);

	useEffect(() => {
		handleAppointmentChange(true);
	}, []);

	// handle the appointment change either next or previous
	async function handleAppointmentChange(increment: boolean) {
		const newAppointmentNum = increment
			? appointmentNum + 1
			: appointmentNum - 1;

		if (newAppointmentNum < 0) return;

		const appointmentsData: Appointment[] = (
			await axios.get(
				`${domainUrl}/server/api/v1/appointments?page=${newAppointmentNum}&size=1`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
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
		<div className="flex flex-col w-80 gap-4">
			<Card className="flex flex-col items-center justify-center p-4 shadow">
				<h1 className="flex items-center justify-center text-lg font-bold text-gray-700 rounded-full mx-auto gap-2">
					<BsFillCalendarEventFill />
					Select Appointment
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
					<AppointmentCard
						key={appointment.id}
						scheduledTime={appointment.scheduledTime}
						duration={appointment.duration}
						status={appointment.status}
						startTime={appointment.workOrderDto.startTime}
						completeTime={appointment.workOrderDto.completeTime}
						service={appointment.workOrderDto.service}
					/>
				))}
		</div>
	);
}
