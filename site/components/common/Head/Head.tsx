import { SEO } from '@components/common';
import type { VFC } from 'react';

const Head: VFC = () => {
	return (
		<SEO>
			<meta
				key='viewport'
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<link rel='manifest' href='/site.webmanifest' key='site-manifest' />
		</SEO>
	);
};

export default Head;
