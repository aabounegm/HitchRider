import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parse, validate } from '@tma.js/init-data-node';
import { pointToCoords } from '../../utils';
import type { RideRequestQueryResult } from '@/lib/types/request';

type Params = {
  params: {
    id: string;
  };
};

// TODO: factor out this functionality into a separate function and reuse for requests and announcements
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const rides: RideRequestQueryResult[] = await prisma.$queryRaw`
      SELECT "id", "from"::Text, "fromAddr", "to"::Text, "toAddr", "time", "passengers", "userChatId"
      FROM requests
      WHERE "id" = ${Number(params.id)}
      LIMIT 1
    `;
    if (rides.length !== 1) {
      return NextResponse.json(
        {
          message: 'Request not found',
        },
        { status: 404 }
      );
    }
    const ride = rides[0];
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
  const { initData } = await req.json();

  try {
    validate(initData, process.env.BOT_TOKEN!);
  } catch {
    return NextResponse.json(
      { message: 'Invalid initData passed' },
      { status: 401 }
    );
  }

  const parsedInitData = parse(initData);

  const { userChatId, id } = await prisma.rideRequest.findUniqueOrThrow({
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
      { message: 'You can only delete your own requests' },
      { status: 403 }
    );
  }

  await prisma.rideRequest.delete({
    where: {
      id,
    },
  });

  return new NextResponse(null, { status: 204 });
}
