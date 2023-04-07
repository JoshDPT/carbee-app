import FormikLogin from '@/components/FormikLogin';

export default function Login() {
	return (
		<div className="flex min-h-screen min-w-full flex-col items-center gap-4 bg-gray-300 p-12">
			<FormikLogin />
		</div>
	);
}
