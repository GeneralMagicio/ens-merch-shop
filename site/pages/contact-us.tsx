import { useState } from 'react'
import Link from 'next/link'
import { Layout } from '@components/common'
import Newsletter from '@components/common/Newsletter'
import { InfoStyled } from '@components/icons'

export default function Home() {
	const [sentEmail, setSentEmail] = useState<boolean>(false)

	const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
		e.preventDefault()
		setSentEmail(true)
	}

	return (
		<>
			<div className='max-w-2xl my-44 px-4 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>Contact</h2>
				{sentEmail ? (
					<div className='px-2'>
						<div className='flex flex-col mt-14 gap-y-2 py-4 px-6 rounded-lg items-center w-full bg-blue-surface border border-blue-primary'>
							<InfoStyled />
							<p className='text-base font-medium'>Your message has been sent!</p>
						</div>
						<p className='mt-8 text-lg font-medium text-center'>
							Thank you for contacting us. One of our team members will get back to you.
							Typical response time is 2-4 days.
						</p>
						<button
							className='w-full rounded-lg border text-gray-light text-base font-bold mt-20 py-3'
							onClick={() => setSentEmail(false)}
						>
							Send another message
						</button>
						<div className='text-center mt-4 text-blue-primary text-sm font-medium'>
							<Link href='/'>Homepage</Link>
						</div>
					</div>
				) : (
					<form className='mt-14 font-medium' onSubmit={handleSubmit}>
						<div className='flex flex-col'>
							<label className='text-base font-bold text-gray-light' htmlFor='name'>
								Name
							</label>
							<input
								required
								id='name'
								className='mt-1 p-4 border border-gray-300 rounded-md'
								placeholder='Your full name'
								type='text'
							/>
						</div>
						<div className='flex flex-col mt-6'>
							<label className='text-base font-bold text-gray-light' htmlFor='email'>
								Email
							</label>
							<input
								required
								id='email'
								className='mt-1 p-4 border border-gray-300 rounded-md'
								placeholder='Your email address'
								type='email'
							/>
						</div>
						<div className='flex flex-col mt-6'>
							<label className='text-base font-bold text-gray-light' htmlFor='message'>
								Message
							</label>
							<textarea
								required
								className='mt-1 p-4 border border-gray-300 rounded-md'
								placeholder='Message'
								id='message'
								cols={30}
								rows={10}
							></textarea>
						</div>
						<button
							className='w-full mt-8 bg-blue-primary text-white font-bold py-3 px-4 rounded-md'
							type='submit'
						>
							Send message
						</button>
					</form>
				)}
			</div>
			<section className='w-full py-24 bg-blue-surface'>
				<div className='text-center px-4'>
					<h3 className='font-bold text-5xl'>Discover the latest high quality ENS merch</h3>
					<h5 className='mt-3 font-medium text-xl'>
						Look good and feel good knowing you support decentralized naming
					</h5>
				</div>
			</section>
			<Newsletter />
		</>
	)
}

Home.Layout = Layout
