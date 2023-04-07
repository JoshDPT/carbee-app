import { Button, Card } from 'flowbite-react';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import { useSession } from 'next-auth/react';

const { publicRuntimeConfig } = getConfig();

export default function UpcomingAvailabilityList() {
  // pull the session token from the server
	const { data: session } = useSession();

	// Define a reducer function to handle the increment/decrement logic
	function reducer(state: number, action: PageAction) {
		switch (action.type) {
			case 'increment':
				return state + 1;
			case 'decrement':
				return state > 0 ? state - 1 : 0;
			default:
				throw new Error();
		}
	}
  // initialize state for appointments
	const [appointments, setAppointments] = useState<object[] | null>(null);

	// Use the useReducer hook to manage the state and dispatch function
	const [count, dispatch] = useReducer(reducer, 0);

	useEffect(() => {
		if (count) {
			fetchAvailability();
		}
	}, [count]);

	// Define event handlers for the increment and decrement buttons
	function handleIncrement() {
		dispatch({ type: 'increment' });
	}
	function handleDecrement() {
		dispatch({ type: 'decrement' });
	}
	// Pagination not working: 
	// fetch protected data and update the appointment options
	async function fetchAvailability() {
		const appointmentsData = (await axios.get(
			`${publicRuntimeConfig.DOMAIN_URL}/server/api/v1/appointments?page=${count}&size=1`,
			{
				headers: {
					Authorization: `Bearer ${session?.user?.accessToken}`,
				},
			}
		)).data;
    if(appointmentsData.length === 0) {
      return
    }
		console.log(appointmentsData);
		setAppointments(appointmentsData);
	}

	// Render the component with the count and button elements
	return (
		<div className="w-96 mx-auto">
			<Card className="flex flex-col items-center justify-center p-4">
				<h1 className="flex items-center justify-center w-36 h-12 text-lg font-bold text-white bg-slate-500 rounded-full mx-auto">
					Count: {count}
				</h1>
				<div className="flex justify-center gap-6">
					<Button className="w-36" onClick={handleDecrement}>
						Previous
					</Button>
					<Button className="w-36" onClick={handleIncrement}>
						Next
					</Button>
				</div>
			</Card>
			{appointments &&
				appointments.length > 0 &&
				appointments?.map((appointment) => (
					<Card
						key={appointment.id}
						className="flex flex-col justify-center content-center p-4 w-96 h-12"
					>
						<h1>{appointment.id}</h1>
					</Card>
				))}
		</div>
	);
}
