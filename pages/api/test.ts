// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Appointment[]>
) {
	// initial auth post
	let accessToken = (
		await axios.post(`${serverRuntimeConfig.DOMAIN_URL}/server/auth/login`, {
			username: 'candidate@curbee.com',
			password: 'password',
		})
	).data;

	console.log(accessToken);
	accessToken = accessToken.accessToken;
	
	// test the appointment endpoint with jwt auth
	const appointmentsData: Appointment[] = (
		await axios.get(
			`${serverRuntimeConfig.DOMAIN_URL}/server/api/v1/appointments`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
	).data;

	res.status(200).send(appointmentsData);
}
