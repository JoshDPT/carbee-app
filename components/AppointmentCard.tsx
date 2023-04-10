import { Card } from 'flowbite-react';
import dayjs from 'dayjs';
import { BsCalendarCheck } from 'react-icons/bs';
import formatString from '@/lib/formatString';

export default function AppointmentCard({
	scheduledTime,
	duration,
	status,
	startTime,
	completeTime,
	service,
}: AppointmentCardProps) {
	console.log(startTime, completeTime);

	// Format the scheduledTime, startTime, and completeTime using dayjs
	const date = dayjs(scheduledTime).format('MMMM D, YYYY');
	const start = dayjs(startTime).format('h:mm A');
	const complete = completeTime
		? dayjs(completeTime).format('h:mm A')
		: 'Not Completed';
	const formattedStatus = formatString(status);

	return (
		<div>
			<Card
				className="shadow"
				role="region"
				aria-label={`Appointment on ${date}`}
			>
				<div>
					{/* Date Header */}
					<div
						className="flex flex-row content-center justify-start items-center gap-3 p-4 text-2xl text-gray-700 border-b border-solid border-gray-200 font-serif font-medium"
						role="heading"
						aria-level={2}
					>
						<BsCalendarCheck size={28} />
						<h2>{date}</h2>
					</div>

					{/* Appointment Information */}
					<div className="flex flex-col gap-4 px-4 py-6">
						{/* STATUS */}
						<div className="text-slate-700">
							<div className="font-bold text-sm text-gray-800">Status</div>
							<div role="status">{formattedStatus}</div>
						</div>

						{/* TIME */}
						<div className="text-slate-700">
							<div className="font-bold text-sm text-gray-800">
								Started/Completed
							</div>

							<div>
								<time dateTime={startTime}>{start}</time> -{' '}
								<time dateTime={completeTime}>{complete}</time>
							</div>
						</div>

						{/* DURATION */}
						<div className="text-slate-700">
							<div className="font-bold text-sm text-gray-800">Duration</div>
							<div>{duration} minutes</div>
						</div>

						{/* SERVICE */}
						<div>
							<div className="font-semibold text-sm text-gray-500">Service</div>
							<div className="text-slate-700">{service}</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
