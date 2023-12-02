import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type {
  RideAnnouncementParams,
  RideAnnouncementQueryResult,
} from '@/lib/types/ride';
import { parse, validate } from '@tma.js/init-data-node';
import { pointToCoords } from '../utils';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const latFrom = parseInt(params.get('from_lat') ?? req.geo?.latitude ?? '0');
  const lngFrom = parseInt(params.get('from_lng') ?? req.geo?.longitude ?? '0');
  // TODO:
  // const latTo = parseInt(params.get('to_lat') ?? req.geo?.latitude ?? '0');
  // const lngTo = parseInt(params.get('to_lng') ?? req.geo?.longitude ?? '0');
  const page = parseInt(params.get('page') ?? '1');
  const limit = parseInt(params.get('limit') ?? '10');

  const offset = (page - 1) * limit;

  try {
    const rides: RideAnnouncementQueryResult[] = await prisma.$queryRaw`
        SELECT "id", "from"::Text, "fromAddr", "to"::Text, "toAddr", "time", "passengers", "userChatId",
        point(${latFrom}, ${lngFrom})<->"from" as "distanceFrom",
          count(*) OVER() AS "totalCount"
        FROM announcements
        WHERE "time" >= now()
        ORDER BY "distanceFrom" ASC, "time" ASC
        OFFSET ${offset}
        LIMIT ${limit}`;

    return NextResponse.json(
      rides.map((ride) => ({
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
        totalCount: Number(ride.totalCount),
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
    INSERT INTO announcements ("from", "fromAddr", "to", "toAddr", "time", "price", "passengers", "carInfo", "userChatId")
    VALUES (point(${from.coords[0]}, ${from.coords[1]}), ${from.address},
      point(${to.coords[0]}, ${to.coords[1]}), ${to.address},
      ${time}::timestamptz, ${price}, ${passengers}, ${carInfo}, ${parsedInitData.user.id})
    RETURNING "id"`;

  return NextResponse.json(newAnnouncement[0]);
}
