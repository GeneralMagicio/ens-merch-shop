import { FC, useState } from 'react';
import useSignup from '@framework/auth/use-signup';
import { validate } from 'email-validator';
import { Info } from '@components/icons';
import { useUI } from '@components/ui/context';
import { Input } from '@components/ui';

interface Props {}

const SignUpView: FC<Props> = () => {
	// Form State
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	// const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const signup = useSignup();
	const { setModalView, closeModal } = useUI();

	const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
		e.preventDefault();

		const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

		// Unable to send form unless fields are valid.
		if (!(firstName && lastName && email && password)) {
			return setMessage('Please fill out all fields.');
		}
		if (!validate(email)) {
			return setMessage(
				'Email address is invalid. Please enter a valid email address.',
			);
		}
		if (password.length < 7) {
			return setMessage(
				'Password is invalid. Please enter a valid password with at least 7 characters.',
			);
		}
		if (!validPassword) {
			return setMessage(
				'Password is invalid. Please enter a valid password with at least one letter and one number.',
			);
		}

		try {
			// setLoading(true);
			setMessage('');
			await signup({
				email,
				firstName,
				lastName,
				password,
			});
			closeModal();
		} catch (e: any) {
			const { errors } = e;
			console.error(errors);
			if (errors instanceof Array) {
				setMessage(errors.map((e: any) => e.message).join('<br/>'));
			} else {
				setMessage('Unexpected error');
			}
		} finally {
			// setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSignup}
			className='w-80 flex flex-col justify-between p-3'
		>
			<div className='flex flex-col space-y-4'>
				{message && (
					<div
						className='text-red border border-red p-3'
						dangerouslySetInnerHTML={{
							__html: message,
						}}
					></div>
				)}
				<Input placeholder='First Name' onChange={setFirstName} />
				<Input placeholder='Last Name' onChange={setLastName} />
				<Input type='email' placeholder='Email' onChange={setEmail} />
				<Input
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<span className='text-accent-8'>
					<span className='inline-block align-middle text-blue-primary'>
						<Info width='15' height='15' />
					</span>{' '}
					<span className='leading-6 text-sm'>
						<strong className='text-blue-primary'>Info</strong>:
						Passwords must be longer than 7 chars and include
						numbers.{' '}
					</span>
				</span>
				<div className='pt-2 w-full flex flex-col'>
					<button
						type='submit'
						className='block w-full font-bold py-3 rounded-lg text-white bg-blue-primary'
					>
						Sign Up
					</button>
				</div>

				<span className='pt-1 text-center text-sm'>
					<span className='text-accent-7'>
						Do you have an account?
					</span>
					{` `}
					<a
						className='text-blue-primary font-bold hover:underline cursor-pointer'
						onClick={() => setModalView('LOGIN_VIEW')}
					>
						Log In
					</a>
				</span>
			</div>
		</form>
	);
};

export default SignUpView;
