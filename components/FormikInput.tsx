import { Label } from 'flowbite-react';
import { ErrorMessage, Field, useField } from 'formik';

export default function FormikInput({
	id,
	name,
	label,
	placeholder,
	as,
	options,
	type,
	width,
}: FormikProps) {
	width = width ? `w-${width}` : 'w-full';
	const [field, meta] = useField(name);

	if (as) {
		return (
			<div className={`${width}`}>
				<div className="mb-2 block">
					<Label htmlFor={id} value={label} />
				</div>
				<Field
					id={id}
					name={name}
					as={as}
					className={`${
						field && meta.error && meta.touched
							? 'border-red-500 ring-red-500'
							: ''
					} 
          block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
				>
					{options?.map((e) => (
						<option value={e} key={e}>
							{e}
						</option>
					))}
				</Field>
				<div className="h-2">
					<ErrorMessage
						name={name}
						component="div"
						className="p-1 text-sm font-bold text-red-600"
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className={`${width}`}>
				<div className="mb-2 block">
					<Label htmlFor={id} value={label} />
				</div>
				<Field
					id={id}
					name={name}
					placeholder={placeholder}
					type={type}
					className={`${
						field && meta.error && meta.touched
							? 'border-red-500 ring-red-500'
							: ''
					} 

          block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
				/>
				<div className="h-2">
					<ErrorMessage
						name={name}
						component="div"
						className="p-1 text-sm font-bold text-red-600"
					/>
				</div>
			</div>
		);
	}
}
