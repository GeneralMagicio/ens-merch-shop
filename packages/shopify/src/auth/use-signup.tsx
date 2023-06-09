import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { CommerceError } from '@vercel/commerce/utils/errors'
import useSignup, { type UseSignup } from '@vercel/commerce/auth/use-signup'
import type { SignupHook } from '@vercel/commerce/types/signup'
import useCustomer from '../customer/use-customer'
import { Mutation, MutationCustomerCreateArgs } from '../../schema'

import {
  handleAutomaticLogin,
  throwUserErrors,
  customerCreateMutation,
} from '../utils'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    query: customerCreateMutation,
  },
  async fetcher({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) {
    const { customerCreate } = await fetch<
      Mutation,
      MutationCustomerCreateArgs
    >({
      ...options,
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
        },
      },
    })

    throwUserErrors(customerCreate?.customerUserErrors)
    await handleAutomaticLogin(fetch, { email, password })

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
