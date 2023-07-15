import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

// 미들웨어 생성
export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get('authorization') as string
  // 토큰이 없다?
  if (!bearerToken) {
    return new NextResponse(JSON.stringify({ errorMessage: 'Unauthorized request' }), {
      status: 401,
    })
  }

  // 토큰에서 bearer를 분리한다.
  const token = bearerToken.split(' ')[1]

  // 분리한 토큰이 없다?
  if (!token) {
    return new NextResponse(JSON.stringify({ errorMessage: 'Unauthorized request' }), {
      status: 401,
    })
  }

  // 토큰을 검증한다.
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    await jose.jwtVerify(token, secret)
  } catch (err) {
    return new NextResponse(JSON.stringify({ errorMessage: 'Unauthorized request' }), {
      status: 401,
    })
  }
}
export const config = {
  matcher: ['/api/auth/me'],
}
