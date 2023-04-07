import { Card } from 'flowbite-react';
import dayjs from 'dayjs';
import { BsCalendarCheck } from 'react-icons/bs';
// shape of data:
// {
//   "id": "string",
//   "userId": "string",
//   "duration": 0,
//   "scheduledTime": "2023-04-07T13:32:00.029Z",
//   "workOrderDto": {
//     "service": "string",
//     "status": "READY",
//     "notes": "string",
//     "startTime": "2023-04-07T13:32:00.029Z",
//     "completeTime": "2023-04-07T13:32:00.029Z",
//     "paymentTime": "2023-04-07T13:32:00.029Z",
//     "cancelTime": "2023-04-07T13:32:00.029Z"
//   },
//   "status": "SCHEDULED",
//   "completeTime": "2023-04-07T13:32:00.029Z",
//   "paymentId": "string",
//   "cancelTime": "2023-04-07T13:32:00.029Z"
// }

export default function AppointmentCard(appointment) {
	const dummyAppointment: Appointment = appointment.appointment;
	const date = dayjs(dummyAppointment.scheduledTime).format('MMMM D, YYYY');
	const start = dayjs(dummyAppointment.workOrderDto.startTime).format('h:mm A');
	const complete = dayjs(dummyAppointment.workOrderDto.completeTime).format(
		'h:mm A'
	);

	return (
		<div>
			<Card className='shadow'>
				<div
				// className="divide-y divide-gray-200"
				>
					<div className="flex flex-row content-center justify-start items-center gap-3 p-4 text-2xl text-gray-700 border-b border-solid border-gray-200 font-serif font-medium">
						<BsCalendarCheck size={28} />
						{date}
					</div>
					<div className="p-4 text-slate-700">
						<span className="font-bold text-sm text-gray-800">
							Started/Completed
						</span>
						<br></br>
						{start} - {complete}
					</div>
					<div className="p-4">
						<span className="font-semibold text-sm text-gray-500">Service</span>
						<br></br>
						<h3 className='text-slate-700'> •{dummyAppointment.workOrderDto.service}</h3>
					</div>
				</div>
			</Card>
		</div>
	);
}
