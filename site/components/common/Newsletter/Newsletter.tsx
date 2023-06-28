import Image from 'next/image';
import { FC } from 'react';
import { Eth } from '@components/icons';

const Newsletter: FC = () => {
	return (
		<section className='bg-blue-surface overflow-hidden min-h-[500px] flex items-center justify-between lg:h-[512px]'>
			<div
				id='suscription-form'
				className='relative mx-auto text-center xl:text-left xl:ml-20 2xl:ml-60 z-10'
			>
				<form
					action='https://app.convertkit.com/forms/5294609/subscriptions'
					className='seva-form formkit-form'
					method='post'
					data-sv-form='5294609'
					data-uid='6a28ce3450'
					data-format='inline'
					data-version='5'
					data-options={JSON.stringify({
						settings: {
							after_subscribe: {
								action: 'message',
								success_message:
									'Success! Now check your email to confirm your subscription.',
								redirect_url: '',
							},
							analytics: {
								google: null,
								fathom: null,
								facebook: null,
								segment: null,
								pinterest: null,
								sparkloop: null,
								googletagmanager: null,
							},
							modal: {
								trigger: 'timer',
								scroll_percentage: null,
								timer: 5,
								devices: 'all',
								show_once_every: 15,
							},
							powered_by: {
								show: true,
								url: 'https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic',
							},
							recaptcha: {
								enabled: false,
							},
							return_visitor: {
								action: 'show',
								custom_content: '',
							},
							slide_in: {
								display_in: 'bottom_right',
								trigger: 'timer',
								scroll_percentage: null,
								timer: 5,
								devices: 'all',
								show_once_every: 15,
							},
							sticky_bar: {
								display_in: 'top',
								trigger: 'timer',
								scroll_percentage: null,
								timer: 5,
								devices: 'all',
								show_once_every: 15,
							},
						},
						version: '5',
					})}
					style={{
						minWidth: '400 500 600 700 800',
						backgroundColor: 'rgb(249, 250, 251)',
						borderRadius: '4px',
					}}
				>
					<div
						className='formkit-background'
						style={{ opacity: 0.2 }}
					></div>
					<div data-style='minimal'>
						<div
							className='formkit-header'
							data-element='header'
							style={{
								color: 'rgb(77, 77, 77)',
								fontSize: '27px',
								fontWeight: 700,
							}}
						>
							<h2>Stay in the loop</h2>
						</div>
						<div
							className='formkit-subheader'
							data-element='subheader'
							style={{
								color: 'rgb(104, 104, 104)',
								fontSize: '18px',
							}}
						>
							<p>Get first dibs on the latest ENS merchdrops</p>
						</div>
						<ul
							className='formkit-alert formkit-alert-error'
							data-element='errors'
							data-group='alert'
						></ul>
						<div
							data-element='fields'
							data-stacked='false'
							className='seva-fields formkit-fields'
						>
							<div className='formkit-field'>
								<input
									className='formkit-input'
									name='email_address'
									aria-label='Your Email Address'
									placeholder='Your Email Address'
									required
									type='email'
									style={{
										color: 'rgb(0, 0, 0)',
										borderColor: 'rgb(227, 227, 227)',
										borderRadius: '4px',
										fontWeight: 400,
									}}
								/>
							</div>
							<button
								data-element='submit'
								className='formkit-submit formkit-submit'
								style={{
									color: 'rgb(255, 255, 255)',
									backgroundColor: 'rgb(55, 137, 255)',
									borderRadius: '4px',
									fontWeight: 400,
								}}
							>
								<div className='formkit-spinner'>
									<div></div>
									<div></div>
									<div></div>
								</div>
								<span>Get notified</span>
							</button>
						</div>
						<div
							className='formkit-guarantee'
							data-element='guarantee'
							style={{
								color: 'rgb(77, 77, 77)',
								fontSize: '13px',
								fontWeight: 400,
							}}
						>
							We won't send you spam. Unsubscribe at any time.
						</div>
						<div className='formkit-powered-by-convertkit-container'>
							<a
								href='https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic'
								data-element='powered-by'
								className='formkit-powered-by-convertkit'
								data-variant='dark'
								target='_blank'
								rel='nofollow noreferrer'
							>
								Built with ConvertKit
							</a>
						</div>
					</div>
				</form>
			</div>
			<div className='min-h-full hidden xl:block w-1/2 relative'>
				<Eth className='absolute -top-6 right-60' />
				<Eth className='absolute top-2 translate-y-1/2 -rotate-90 right-16 translate-x-1/2 ' />
				<Image
					quality={100}
					className='absolute -bottom-20 right-24'
					alt='ENS shirts'
					height={445}
					width={574}
					src='/assets/newsletter-image.png'
				/>
			</div>
		</section>
	);
};

export default Newsletter;
