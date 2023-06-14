import { type NextRequest, NextResponse } from 'next/server';
import { bot } from '@/lib/telegram';

const secretToken = process.env.TELEGRAM_SECRET_TOKEN;

export async function GET(req: NextRequest) {
  const { json, headers, ip } = req;

  try {
    if (secretToken === headers.get('X-Telegram-Bot-Api-Secret-Token')) {
      await bot.handleUpdate(await json());
    } else {
      console.warn('Received an unauthorized request from', ip);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: 'An error occurred',
      },
      {
        status: 500,
      }
    );
  }
}
