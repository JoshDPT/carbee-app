import { Button } from 'flowbite-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
	const { data: sessionData } = useSession();

	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<p className="text-center text-sm italic text-gray-800">
				{sessionData && <span>Welcome, {sessionData.user?.name}</span>}
			</p>
			<Button className='px-2'
				onClick={sessionData ? () => void signOut() : () => void signIn()}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</Button>
		</div>
	);
}
