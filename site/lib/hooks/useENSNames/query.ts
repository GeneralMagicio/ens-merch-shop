import { gql } from 'graphql-request';

export const queryDomains = gql`
	query queryDomains($owner: String!) {
		domains(
			first: 1000
			where: { or: [{ owner: $owner }, { resolvedAddress: $owner }] }
		) {
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
