import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'cookies-next'

const prisma = new PrismaClient()
// making sinup handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200)
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, city, password } = req.body
    const errors: string[] = []
    const validatationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: 'First name is Invalid',
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: 'First name is Invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is Invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone is Invalid',
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: 'City is Invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not Strong enough',
      },
    ]

    validatationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage + ' ')
      }
    })
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors })
    }
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithEmail) {
      return res.status(400).json({ errorMessage: 'Email is associated with another account' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city,
        password: hashedPassword,
      },
    })

    const alg = 'HS256'

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret)
    setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 })
    res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    })
  }
  return res.status(404).json('Unkown endpoint')
}
