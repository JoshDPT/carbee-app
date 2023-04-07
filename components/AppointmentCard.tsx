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

interface AppointmentProps {
  duration: number;
  scheduledTime: string;
  workOrderDto: {
    service: string;
    status: string;
    notes: string;
    startTime: string;
    completeTime: string;
    paymentTime: string;
    cancelTime: string;
  }
}

export default function AppointmentCard(appointment: AppointmentProps) {
	return (
		<div>
			<Card>
				<div className="divide-y divide-gray-200">
					<div>{appointment.scheduledTime}</div>
					<div>Started/Completed
						{appointment.workOrderDto.startTime} - {appointment.workOrderDto.completeTime}
					</div>
					<div>Service
						{appointment.workOrderDto.service}
					</div>
				</div>
			</Card>
		</div>
	);
}
