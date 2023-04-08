import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import UserAppointmentsViewer from '@/components/UserAppointmentsViewer';
import NavBar from '@/components/NavBar';
import UpcomingAvailabilityList from '@/components/UpcomingAvailabilityList';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function Dashboard() {
	const { data: session } = useSession();
	const accessToken = session?.user.accessToken;
	const domainUrl = publicRuntimeConfig.DOMAIN_URL;

	if (session && accessToken && domainUrl) {
		return (
			<>
				<NavBar />
				<main className="flex min-h-screen min-w-full flex-col items-center justify-start gap-4 bg-gray-300 p-4">
					<UserAppointmentsViewer
						accessToken={accessToken}
						domainUrl={domainUrl}
					/>
					<UpcomingAvailabilityList
						accessToken={accessToken}
						domainUrl={domainUrl}
					/>
				</main>
			</>
		);
	}
	return (
		<main className="flex min-h-screen min-w-full flex-col items-center justify-start gap-4 bg-gray-300 p-4">
			<div className="text-3xl text-red-500 font-bold animate-pulse">
				Access Denied
			</div>
		</main>
	);
}

// this is a server side retreival of the session cookie, which then returns the props to the component above- allows the page to not even render if no cookie
export async function getServerSideProps(context: any) {
	// this gets the session cookie from the server
	const session = await getServerSession(context.req, context.res, authOptions);

	// if there is no session cookie, redirect them to the signin page - well before page renders
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
