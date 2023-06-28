import { gql } from 'graphql-request';

export const queryDomains = gql`
	query queryDomains($owner: String!) {
		domains(first: 1000, where: { owner_: { id: $owner } }) {
			id
			name
			labelName
			labelhash
			resolvedAddress {
				id
			}
		}
	}
`;
