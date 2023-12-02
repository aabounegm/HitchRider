import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parse, validate } from '@tma.js/init-data-node';
import { RideAnnouncementQueryResult } from '@/lib/types/ride';
import { pointToCoords } from '../../utils';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const announcements: RideAnnouncementQueryResult[] = await prisma.$queryRaw`
      SELECT "id", "from"::Text, "fromAddr", "to"::Text, "toAddr", "time", "passengers", "price", "carInfo", "userChatId"
      FROM announcements
      WHERE "id" = ${Number(params.id)}
      LIMIT 1
    `;
    if (announcements.length !== 1) {
      return NextResponse.json(
        {
          message: 'Ride not found',
        },
        { status: 404 }
      );
    }

    const ride = announcements[0];

    return NextResponse.json({
      ...ride,
      from: {
        coords: pointToCoords(ride.from),
        address: ride.fromAddr,
      },
      to: {
        coords: pointToCoords(ride.to),
        address: ride.toAddr,
      },
      userChatId: Number(ride.userChatId),
    });
  } catch (e) {
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
