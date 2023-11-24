import { type NextRequest, NextResponse } from 'next/server';
import { parse, validate } from '@tma.js/init-data-node';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
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

  if (parsedInitData.user == undefined) {
    return NextResponse.json(
      { message: 'Cannot find user in initData' },
      { status: 401 }
    );
  }

  const { id, username } = parsedInitData.user;

  const user = await prisma.user.upsert({
    create: {
      chatId: id,
      username,
    },
    update: {
      username,
    },
    where: {
      chatId: id,
    },
  });

  return NextResponse.json({
    ...user,
    chatId: Number(user.chatId),
  });
}

export async function PATCH(req: NextRequest) {
  const { initData, tonAddress } = await req.json();
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

  const { id } = parsedInitData.user;

  const user = await prisma.user.update({
    data: {
      tonAddress,
    },
    where: {
      chatId: id,
    },
  });

  return NextResponse.json({
    ...user,
    chatId: Number(user.chatId),
  });
}
