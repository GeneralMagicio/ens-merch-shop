import { Layout, SEO } from '@components/common';
import { refundContent } from '@config/data/refund';
import FormatMarkdown from '@components/common/FormatMarkdown/FormatMarkdown';
import Newsletter from '@components/common/Newsletter';

export default function Refund() {
	return (
		<>
			<div className='max-w-6xl px-4 my-44 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>
					Refund and returns policy
				</h2>
				<article className='mt-14 '>
					<section className='my-10'>
						<FormatMarkdown
							content={refundContent}
							className='text-base my-3 font-medium leading-7 prose-a:text-blue-primary prose-a:no-underline prose-a:font-bold prose-headings:text-blue-primary prose-strong:text-blue-primary prose-strong:font-bold'
						/>
					</section>
				</article>
			</div>
			<Newsletter />
			<SEO title='Refund' description='Refund and returns policy' />
		</>
	);
}

Refund.Layout = Layout;
