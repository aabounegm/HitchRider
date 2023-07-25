import { Markup, Telegraf } from 'telegraf';

export const bot = new Telegraf(process.env.BOT_TOKEN!);

const BASE_URL = 'https://hitch-rider.vercel.app';

bot.start(async (ctx) => {
  await Promise.all([
    ctx.setChatMenuButton({
      text: 'Open HitchRider',
      type: 'web_app',
      web_app: {
        url: BASE_URL,
      },
    }),
    ctx.reply(
      'Welcome to HitchRider!\nTo get started, use one of the buttons below:',
      Markup.inlineKeyboard([
        Markup.button.webApp('🚗 Explore available rides', `${BASE_URL}/rides`),
        Markup.button.webApp(
          '🙋‍♂️ Find a travel companion',
          `${BASE_URL}/requests`
        ),
      ])
    ),
  ]);
});
