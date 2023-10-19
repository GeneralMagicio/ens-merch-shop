import { useState } from 'react';

export function useWeb3FormsEmail() {
	const [isSending, setIsSending] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [responseMessage, setResponseMessage] = useState('');

	const sendEmail = async (body: string) => {
		setHasError(false);
		setIsSending(true);
		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body,
			});

			if (response.status === 200) {
				setResponseMessage('Email sent successfully!');
			}
		} catch (error) {
			console.error('Error sending email:', error);
			setResponseMessage('Error sending email. Please try again later.');
			setHasError(true);
		} finally {
			setIsSending(false);
		}
	};
	const reset = () => {
		setIsSending(false);
		setHasError(false);
		setResponseMessage('');
	};
	return { sendEmail, isSending, responseMessage, hasError, reset };
}
