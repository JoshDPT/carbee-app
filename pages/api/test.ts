// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// type for appointment
type Appointment = {
	id: string;
	userId: string;
	duration: number;
	scheduledTime: string;
	workOrderDto: Object;
	status: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Appointment[]>
) {
	// initial auth post
	const accessToken: string = (
		await axios.post('http://modulith.herokuapp.com/auth/login', {
			username: 'candidate@curbee.com',
			password: 'password',
		})
	).data.accessToken;

	// test the appointment endpoint with jwt auth
	const appointmentsData: Appointment[] = (
		await axios.get('http://modulith.herokuapp.com/api/v1/appointments', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	).data;

	res.status(200).send(appointmentsData);
}
