interface FormikProps {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	as?: string;
	options?: string[] | number[];
	errors?: Error;
	touched?: Touched;
	type?: 'text' | 'password' | 'email' | 'date';
	width?: string;
}

interface Error {
	email: string;
	password: string;
}
interface Touched {
	email: boolean;
	password: boolean;
}

interface LoginData {
	username: string;
	password: string;
}

type Appointment = {
	id: string;
	userId: string;
	duration: number;
	scheduledTime: string;
	workOrderDto: Object;
	status: string;
};