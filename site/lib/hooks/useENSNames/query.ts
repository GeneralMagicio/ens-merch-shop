import { gql } from 'graphql-request'

export const queryDomains = gql`
  query queryDomains($owner: String!) {
    domains(where: { owner_: { id: $owner } }) {
      id
      name
      labelName
      labelhash
      resolvedAddress {
        id
      }
    }
  }
`
