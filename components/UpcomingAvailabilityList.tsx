import { Button, Card } from 'flowbite-react';
import { useState, useEffect, useReducer } from 'react';

// GETs availability and lists times by a selected upcoming date (eg: 2023-03-30), starting with tomorrow. You can use a <select> to choose availability, or get creative with it if you so choose.

type Action = { type: 'increment' } | { type: 'decrement' };

export default function UpcomingAvailabilityList() {
	// Define a reducer function to handle the increment/decrement logic
	function reducer(state: number, action: Action) {
		switch (action.type) {
			case 'increment':
				return state + 1;
			case 'decrement':
				return state > 1 ? state - 1 : 1;
			default:
				throw new Error();
		}
	}

	// Use the useReducer hook to manage the state and dispatch function
	const [count, dispatch] = useReducer(reducer, 1);

	// Define event handlers for the increment and decrement buttons
	function handleIncrement() {
		dispatch({ type: 'increment' });
	}
	function handleDecrement() {
		dispatch({ type: 'decrement' });
	}

	// Render the component with the count and button elements
	return (
		<div>
			<Card className='flex flex-col justify-center content-center p-4 w-96'>
				<div>Count: {count}</div>
				<div className='flex flex-row justify-center gap-6'>
					<Button className="w-36" onClick={handleDecrement}>
						Previous
					</Button>
					<Button className="w-36" onClick={handleIncrement}>
						Next
					</Button>
				</div>
			</Card>
		</div>
	);
}
