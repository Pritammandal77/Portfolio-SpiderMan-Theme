import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isLocal = process.env.NODE_ENV === 'development';

  if (isLocal) {
    console.log('--- Local Development Mode: Returning mock visitor count ---');
    return NextResponse.json({ count: 124 });
  }

  try {
    const response = await axios.get(
      'https://api.counterapi.dev/v1/pritamm.vercel.app/portfolio/up',
      {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0' 
        }
      }
    );
    
    const totalValue = response.data?.value;
    
    if (typeof totalValue !== 'number') {
      throw new Error('Invalid data structure received from CounterAPI');
    }
    
    return NextResponse.json({ count: totalValue });
    
  } catch (error: any) {
    console.error('Production Server Proxy Error:', error?.message || error);
    return NextResponse.json({ count: 1 }, { status: 200 });
  }
}