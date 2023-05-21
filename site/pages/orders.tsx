import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useRouter } from 'next/router'
import useLogout from '@framework/auth/use-logout'
import commerce from '@lib/api/commerce'
import Link from 'next/link'
import { Bag, Exit } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/Table'
import Newsletter from '@components/common/Newsletter/Newsletter'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Orders() {
  const router = useRouter()
  const logout = useLogout()
  const { data } = useCustomer()

  return (
    <Container className="mt-44">
      <h2 className="font-bold text-5xl">Account</h2>
      <div className="flex mt-6 mb-16 items-center gap-x-5">
        <h3 className="text-base font-bold">{`${data?.firstName} ${data?.lastName}`}</h3>
        <p
          className="flex items-center gap-x-2 font-medium text-lg text-blue-primary cursor-pointer"
          onClick={() => {
            router.push('/')
            logout()
          }}
        >
          Sign out
          <Exit />
        </p>
      </div>

      {data?.orders && data.orders.length > 0 ? (
        <>
          <h3 className="font-bold text-2xl mb-8">Order History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment status</TableHead>
                <TableHead>Fulfillment status</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orders.map(
                ({
                  id,
                  orderNumber,
                  lineItems,
                  processedAt,
                  financialStatus,
                  fulfillmentStatus,
                  totalPrice,
                  statusUrl,
                }) =>
                  lineItems?.map(({ title, quantity }) => (
                    <TableRow key={id + title}>
                      <TableCell className="font-medium">
                        {orderNumber}
                      </TableCell>
                      <TableCell className="font-medium">{title}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{processedAt}</TableCell>
                      <TableCell>{financialStatus.toLowerCase()}</TableCell>
                      <TableCell>{fulfillmentStatus.toLowerCase()}</TableCell>
                      <TableCell className="text-blue-primary font-medium">
                        <Link href={statusUrl} target="_blank">
                          Track order
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        ${totalPrice}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <div>
          <Text variant="pageHeading">My Orders</Text>
          <div className="flex-1 p-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              No orders found
            </h2>
          </div>
        </div>
      )}
    </Container>
  )
}

Orders.Layout = Layout
