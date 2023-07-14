import { type NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { parseInitData } from '@twa.js/init-data';
// @ts-ignore - It exists, not sure why TS thinks it doesn't
import { validate } from '@twa.js/init-data/validation';
import prisma from '@/lib/prisma';

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
  const parsedInitData = parseInitData(initData);

  if (parsedInitData.user == undefined) {
    return NextResponse.json(
      { message: 'Cannot find user in initData' },
      { status: 401 }
    );
  }

  const { from, to, time, passengers } =
    rideRequest as Prisma.RideRequestCreateArgs['data'];

  const newRequest = await prisma.rideRequest.create({
    data: {
      from,
      to,
      time,
      passengers,
      userChatId: parsedInitData.user.id,
    },
  });

  return NextResponse.json({
    ...newRequest,
    userChatId: Number(newRequest.userChatId),
  });
}
