import { type NextRequest, NextResponse } from 'next/server';
import type {
  RideRequestParams,
  RideRequestQueryResult,
} from '@/lib/types/request';
import { parse, validate } from '@tma.js/init-data-node';
import prisma from '@/lib/prisma';
import { pointToCoords } from '../utils';

export async function GET(req: NextRequest) {
  try {
    const rides: RideRequestQueryResult[] = await prisma.$queryRaw`
        SELECT "id", "from"::Text, "to"::Text, "time", "passengers", "userChatId"
        FROM requests
        WHERE "time" >= now()
        ORDER BY "time" ASC`;

    return NextResponse.json(
      rides.map((ride) => ({
        ...ride,
        from: {
          coords: pointToCoords(ride.from),
          // TODO
          address: pointToCoords(ride.from).toString(),
        },
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
  const { initData, rideRequest } = await req.json();
  try {
    validate(initData, process.env.BOT_TOKEN!);
  } catch {
    return NextResponse.json(
      { message: 'Invalid initData passed' },
      { status: 401 }
    );
  }
  const parsedInitData = parse(initData);

  if (parsedInitData.user == undefined) {
    return NextResponse.json(
      { message: 'Cannot find user in initData' },
      { status: 401 }
    );
  }

  const { from, to, time, passengers } = rideRequest as RideRequestParams;

  const newRequest: [{ id: number }] = await prisma.$queryRaw`
    INSERT INTO requests ("from", "to", "time", "passengers", "userChatId")
    VALUES (point(${from.coords[0]}, ${from.coords[1]}), ${to}, ${time}::timestamptz,
      ${passengers}, ${parsedInitData.user.id})
    RETURNING "id"`;

  return NextResponse.json(newRequest[0]);
}
