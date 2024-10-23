import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { captchaVerified } = await req.json()

  if (captchaVerified) {
    // Here you would typically update the user's verification status in your database
    return NextResponse.json({ message: 'Verification successful' })
  } else {
    return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 })
  }
}
