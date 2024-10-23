import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()
    
    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 })
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/verification`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()

    // Use the access token to get user information
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorData = await userResponse.text()
      console.error('User data fetch failed:', errorData)
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 400 })
    }

    const userData = await userResponse.json()

    // Here you would typically save the user data to your database
    // For now, we'll just return it
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Discord callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
