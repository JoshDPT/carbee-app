import FormikLogin from '@/components/FormikLogin';

export default function Login() {


	return (
		<div className="flex min-h-screen min-w-full flex-col items-center justify-start gap-4 bg-gray-300 p-4">
			<FormikLogin />
		</div>
	);
}

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context: any) {
// 	return {
// 		props: {
// 			csrfToken: await getCsrfToken(context),
// 		},
// 	};
// }
