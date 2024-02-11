import { Layout, SEO } from '@components/common';
import { cookiesContent } from '@config/data/cookies';
import FormatMarkdown from '@components/common/FormatMarkdown/FormatMarkdown';
import Newsletter from '@components/common/Newsletter';

export default function Cookies() {
	return (
		<>
			<div className='max-w-6xl px-4 my-44 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>Cookies</h2>
				<article className='mt-14 '>
					<section className='my-10'>
						<FormatMarkdown
							content={cookiesContent}
							className='text-base my-3 font-medium leading-7 prose-a:text-blue-primary prose-a:no-underline prose-a:font-bold prose-headings:text-blue-primary prose-strong:text-blue-primary prose-strong:font-bold'
						/>
					</section>
				</article>
			</div>
			<Newsletter />
			<SEO
				title='Cookies'
				description='Cookie Policy for ENS Merch Shop'
			/>
		</>
	);
}

Cookies.Layout = Layout;
