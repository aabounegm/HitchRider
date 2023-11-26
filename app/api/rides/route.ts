import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type {
  RideAnnouncementParams,
  RideAnnouncementQueryResult,
} from '@/lib/types/ride';
import { parse, validate } from '@tma.js/init-data-node';
import { pointToCoords } from '../utils';

export async function GET(req: NextRequest) {
  try {
    const rides: RideAnnouncementQueryResult[] = await prisma.$queryRaw`
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
        to: {
          coords: pointToCoords(ride.to),
          // TODO
          address: pointToCoords(ride.to).toString(),
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
  // TODO: factor out the whole "validate initData then parse it and check user exists" workflow into a reusable function
  const { initData, rideAnnouncement } = await req.json();
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

  const { from, to, time, passengers, carInfo, price } =
    rideAnnouncement as RideAnnouncementParams;

  const newAnnouncement: [{ id: number }] = await prisma.$queryRaw`
    INSERT INTO announcements ("from", "to", "time", "price", "passengers", "carInfo", "userChatId")
    VALUES (point(${from.coords[0]}, ${from.coords[1]}), point(${to.coords[0]}, ${to.coords[1]}),
      ${time}::timestamptz, ${price}, ${passengers}, ${carInfo}, ${parsedInitData.user.id})
    RETURNING "id"`;

  return NextResponse.json(newAnnouncement[0]);
}
