import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import UserAppointmentsViewer from '@/components/UserAppointmentsViewer';

//  UpcomingAvailabilityList
//  UserAppointmentsViewer

export default function Dashboard() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="flex min-h-screen min-w-full flex-col items-center justify-start gap-4 bg-gray-300 p-4">
				<UserAppointmentsViewer />
			</div>
		);
	}
	return <div>Access Denied</div>;
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
