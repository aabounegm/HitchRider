import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parse, validate } from '@tma.js/init-data-node';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const ride = await prisma.rideAnnouncement.findUniqueOrThrow({
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

export async function DELETE(req: NextRequest, { params }: Params) {
  const initData = req.nextUrl.searchParams.get('initData');
  if (initData === null) {
    return NextResponse.json(
      { message: 'No initData passed' },
      { status: 401 }
    );
  }

  try {
    validate(initData, process.env.BOT_TOKEN!);
  } catch {
    return NextResponse.json(
      { message: 'Invalid initData passed' },
      { status: 401 }
    );
  }

  const parsedInitData = parse(initData);

  const { userChatId, id } = await prisma.rideAnnouncement.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      userChatId: true,
    },
  });

  if (Number(userChatId) !== parsedInitData.user?.id) {
    return NextResponse.json(
      { message: 'You can only delete your own rides' },
      { status: 403 }
    );
  }

  await prisma.rideAnnouncement.delete({
    where: {
      id,
    },
  });

  return new NextResponse(null, { status: 204 });
}
