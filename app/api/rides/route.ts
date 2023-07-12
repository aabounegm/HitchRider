import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const rides = await prisma.rideRequest.findMany();
    return NextResponse.json(rides);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
