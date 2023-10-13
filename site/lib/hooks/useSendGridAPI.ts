import { SEND_GRID_API_KEY, SEND_GRID_SENDER_EMAIL } from '@framework/const';
import { useState } from 'react';

interface SendEmailParams {
	message: string;
	name: string;
	email: string;
	subject: string;
}

export default function useSendGridAPI() {
	const [isSending, setIsSending] = useState(false);
	const [responseMessage, setResponseMessage] = useState('');

	const sendEmail = async ({
		message,
		name,
		email,
		subject,
	}: SendEmailParams) => {
		setIsSending(true);
		try {
			const response = await fetch(
				'https://api.sendgrid.com/v3/mail/send',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${SEND_GRID_API_KEY}`,
					},
					body: JSON.stringify({
						personalizations: [
							{
								to: [
									{
										email: SEND_GRID_SENDER_EMAIL,
									},
								],
							},
						],
						subject,
						from: { email: SEND_GRID_SENDER_EMAIL },
						reply_to: {
							name: name,
							email,
						},
						content: [{ type: 'text/plain', value: message }],
					}),
				},
			);

			if (response.status === 202) {
				setResponseMessage('Email sent successfully!');
			} else {
				setResponseMessage(
					'Failed to send email. Please try again later.',
				);
			}
		} catch (error) {
			console.error('Error sending email:', error);
			setResponseMessage('Error sending email. Please try again later.');
		} finally {
			setIsSending(false);
		}
	};
	return { sendEmail, isSending, responseMessage };
}
