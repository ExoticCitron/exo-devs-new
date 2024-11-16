import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Discord API error:', await response.text());
      return NextResponse.json({ error: 'Failed to fetch servers' }, { status: response.status });
    }

    const servers = await response.json();
    
    // Filter servers where user has MANAGE_GUILD permission (0x20)
    const managedServers = servers.filter((server: any) => {
      const permissions = BigInt(server.permissions);
      return (permissions & BigInt(0x20)) === BigInt(0x20);
    });

    return NextResponse.json({ servers: managedServers });
  } catch (error) {
    console.error('Server fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
