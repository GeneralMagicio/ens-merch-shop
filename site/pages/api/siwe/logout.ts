import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { IRON_SESSION_CONFIG } from '@config/iron-session/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    req.session.destroy()
    return res.send({ ok: true })
  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG)