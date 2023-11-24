import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { parse, validate } from '@tma.js/init-data-node';

export async function GET(req: NextRequest) {
  try {
    const rides = await prisma.rideAnnouncement.findMany({
      where: {
        time: {
          gte: new Date(),
        },
      },
      orderBy: {
        time: 'asc',
      },
    });
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
    rideAnnouncement as Prisma.RideAnnouncementCreateArgs['data'];

  const newRequest = await prisma.rideAnnouncement.create({
    data: {
      from,
      to,
      time,
      price,
      passengers,
      carInfo,
      userChatId: parsedInitData.user.id,
    },
  });

  return NextResponse.json({
    ...newRequest,
    userChatId: Number(newRequest.userChatId),
  });
}
