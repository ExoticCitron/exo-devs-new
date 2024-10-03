import { NextResponse } from 'next/server';

let emails: string[] = [];

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 });
    }

    emails.push(email);
    console.log('Stored emails:', emails); // For debugging purposes

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ emails });
}