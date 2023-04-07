import { Card } from 'flowbite-react';

export default function AppointmentCard() {
	return (
		<div>
			<Card>
				<div className="divide-y divide-gray-200">
					<div>Child element 1</div>
					<div>Child element 2</div>
					<div>Child element 3</div>
				</div>
			</Card>
		</div>
	);
}
