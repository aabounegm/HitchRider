import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const rides = await prisma.rideAnnouncement.findMany();
    return NextResponse.json(
      rides.map((ride) => ({
        ...ride,
        userChatId: Number(ride.userChatId),
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return;
}
