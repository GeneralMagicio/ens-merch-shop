import { Layout, SEO } from '@components/common';
import { privacyPolicyContent } from '@config/data/privacy-policy';
import FormatMarkdown from '@components/common/FormatMarkdown/FormatMarkdown';
import Newsletter from '@components/common/Newsletter';

export default function PrivacyPolicy() {
	return (
		<>
			<div className='max-w-6xl px-4 my-44 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>
					Privacy Policy
				</h2>
				<article className='mt-14 '>
					{privacyPolicyContent.map(
						({ title, description }, index) => (
							<section className='my-10' key={title}>
								<h3 className='mb-4 text-3xl font-bold text-blue-primary'>{`${
									index + 1
								}. ${title}`}</h3>
								<FormatMarkdown
									key={description}
									content={description}
									className='text-base my-3 font-medium leading-7 prose-a:text-blue-primary prose-a:no-underline prose-a:font-bold prose-headings:text-blue-primary prose-strong:text-blue-primary prose-strong:font-bold'
								/>
							</section>
						),
					)}
				</article>
			</div>
			<Newsletter />
			<SEO title='Privacy Policy' />
		</>
	);
}

PrivacyPolicy.Layout = Layout;
