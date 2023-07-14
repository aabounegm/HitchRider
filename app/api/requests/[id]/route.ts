import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = {
  params: {
    id: string;
  };
};

// TODO: factor out this functionality into a separate function and reuse for requests and announcements
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const ride = await prisma.rideRequest.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      ...ride,
      userChatId: Number(ride.userChatId),
    });
  } catch (e) {
    if ((e as any).name === 'NotFoundError') {
      return NextResponse.json({ message: 'Ride not found' }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
