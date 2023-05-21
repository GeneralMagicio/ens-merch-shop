export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      tags
      acceptsMarketing
      createdAt
      orders(first: 10) {
        edges {
          node {
            id
            processedAt
            totalPrice
            financialStatus
            fulfillmentStatus
            orderNumber
            statusUrl
            lineItems(first: 4) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`
export default getCustomerQuery
