import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import getConfig from 'next/config';
import axios from 'axios';

const { serverRuntimeConfig } = getConfig();

export const authOptions: NextAuthOptions = {
	// sets the next option as JWT
	session: {
		strategy: 'jwt',
	},
	// sets the provider as credentials : ie: username / password
	providers: [
		CredentialsProvider({
			name: 'credentials',

			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Username' },
				password: { label: 'Password', type: 'password' },
			},

			// this is related to the sign in page and sign in function
			async authorize(credentials, req) {
				const { username, password } = credentials as {
					username: string;
					password: string;
				};

				const accessToken: string = (
					await axios.post(
						`${serverRuntimeConfig.DOMAIN_URL}/server/auth/login`,
						{
							username,
							password,
						}
					)
				).data.accessToken;

				if (accessToken) {
					// Return the user object, which will be added to the session
					// Hardcoding id and name fields since current API doesn't provide them
					console.log('access token got here ', accessToken);
					return {
						id: 'tempId',
						name: 'John Doe',
						accessToken: accessToken,
					};
				}

				// Return null if the user is not authenticated
				console.log('user is not authenticated')
				return null;
			},
		}),
	],
	secret: serverRuntimeConfig.NEXTAUTH_SECRET!,

	pages: {
	  signIn: '/login',
	},

	callbacks: {
		// 	the why is below in these articles for syntax
		// https://cloudcoders.xyz/blog/nextauth-credentials-provider-with-external-api-and-login-page/
		// https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in

		async jwt({ token, user }: any) {
			user ? token.user = user: null;
			return token;
		},
		async session({ session, token }: any) {
			return { ...session, ...token };
		},
	},
};

export default NextAuth(authOptions);
