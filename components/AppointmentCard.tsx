import { Card } from 'flowbite-react';
import { StringLiteral } from 'typescript';

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
	return (
		<div>
			<Card>
				<div className="divide-y divide-gray-200">
					<div className='p-2'>{dummyAppointment.scheduledTime}</div>
					<div className='p-2'  >
						Started/Completed<br></br>
						{dummyAppointment.workOrderDto.startTime} -{' '}
						{dummyAppointment.workOrderDto.completeTime}
					</div>
					<div className='p-2'>
						Service<br></br>
						{dummyAppointment.workOrderDto.service}
					</div>
				</div>
			</Card>
		</div>
	);
}
