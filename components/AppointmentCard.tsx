import { Card } from 'flowbite-react';
import dayjs from 'dayjs';
import { BsCalendarCheck } from 'react-icons/bs';

export default function AppointmentCard({
	scheduledTime,
	duration,
	status,
	startTime,
	completeTime,
	service,
}: AppointmentCardProps) {

	// Format the scheduledTime, startTime, and completeTime using dayjs
	const date = dayjs(scheduledTime).format('MMMM D, YYYY');
	const start = dayjs(startTime).format('h:mm A');
	const complete = dayjs(completeTime).format('h:mm A');

	return (
		<div>
			<Card className="shadow">
				<div>
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
						<h3 className="text-slate-700"> •{service}</h3>
					</div>
				</div>
			</Card>
		</div>
	);
}
