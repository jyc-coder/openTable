import { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bearerToken = req.headers['authorization'] as string
  // 토큰에서 bearer를 분리한다.
  const token = bearerToken.split(' ')[1]

  // 토큰 복호화
  const payload = jwt.decode(token) as { email: string }

  // email 이 없으면?
  if (!payload.email) {
    res.status(401).json({ errorMessage: 'Unauthorized(invalid token)' })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    // password를 제외한 모든 필드를 가져온다.
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  })
  if (!user) {
    res.status(401).json({
      errorMessage: 'User not found',
    })
  }
  return res.json({
    id: user?.id,
    firstName: user?.first_name,
    lastName: user?.last_name,
    phone: user?.phone,
    city: user?.city,
  })
}
