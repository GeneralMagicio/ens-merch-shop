import { Layout } from '@components/common';
import { termsOfUseContent } from '@config/data/terms-of-use';
import FormatMarkdown from '@components/common/FormatMarkdown/FormatMarkdown';
import Newsletter from '@components/common/Newsletter';

export default function TermsAndConditions() {
	return (
		<>
			<div className='max-w-6xl px-4 my-44 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>
					Terms and Conditions
				</h2>
				<article className='mt-14 '>
					{termsOfUseContent.map(({ title, description }, index) => (
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
					))}
				</article>
			</div>
			<Newsletter />
		</>
	);
}

TermsAndConditions.Layout = Layout;
