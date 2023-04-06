import { signIn } from 'next-auth/react';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface LoginData {
	username: string;
	password: string;
}

export default async function handleLogin({ username, password }: LoginData) {
	const accessToken: string = (
		await axios.post(`${publicRuntimeConfig.DOMAIN_URL}/server/auth/login`, {
			username,
			password,
		})
	).data.accessToken;

	if (accessToken) {
		await signIn('jwt', { token: accessToken });
    // needs better error handling in future
    return true;
	} else {
		// handle login error
	}

  return false;

}
