import { getSearchStaticProps } from '@lib/search-props'
import Search from '@components/search'
import type { GetStaticPropsContext } from 'next'

export async function getStaticProps(context: GetStaticPropsContext) {
	return getSearchStaticProps(context)
}

export default Search
