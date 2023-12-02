import { type NextRequest, NextResponse } from 'next/server';
import type {
  RideRequestParams,
  RideRequestQueryResult,
} from '@/lib/types/request';
import { parse, validate } from '@tma.js/init-data-node';
import prisma from '@/lib/prisma';
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
    const rides: RideRequestQueryResult[] = await prisma.$queryRaw`
        SELECT "id", "from"::Text, "fromAddr", "to"::Text, "toAddr", "time", "passengers", "userChatId",
          point(${latFrom}, ${lngFrom})<->"from" as "distanceFrom",
          count(*) OVER() AS "totalCount"
        FROM requests
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
    INSERT INTO requests ("from", "fromAddr", "to", "toAddr", "time", "passengers", "userChatId")
    VALUES (point(${from.coords[0]}, ${from.coords[1]}), ${from.address},
      point(${to.coords[0]}, ${to.coords[1]}), ${to.address},
      ${time}::timestamptz, ${passengers}, ${parsedInitData.user.id})
    RETURNING "id"`;

  return NextResponse.json(newRequest[0]);
}
