# HitchRider

HitchRider is a [Telegram Web App](https://core.telegram.org/bots/webapps) for connecting hitchhikers and drivers together. You can use it by going to [@hitchrider_bot](https://t.me/hitchrider_bot) and hitting `/start`.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) hosted on Vercel.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Since most of the functionality depends on the web app running inside the Telegram client, you will need to either [use the test environment](https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment) to access the app without using HTTPS, or use a proxy that provides HTTPS links that redirect to your localhost. To create such a proxy, follow these steps:

1. In another terminal, run: `npx localtunnel --host https://loca.lt --port 3000 --subdomain hitch-rider`
2. Change the url in `lib/telegram.ts:11` to point to the URL configured in the previous step (`https://hitch-rider.loca.lt`), but don't commit this change (so that Vercel doesn't redirect to it in production by mistake).
3. In any HTTP client, `GET` `https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://hitch-rider.loca.lt/api/telegram&secret_token=<SECRET_TOKEN>`, where `<BOT_TOKEN>` is the token from BotFather the `<SECRET_TOKEN>` corresponds to the value you assigned to the environment variable `TELEGRAM_SECRET_TOKEN`.
4. After you're done with the development session, use a similar HTTP call to set it back to `https://hitch-rider.vercel.app/api/telegram`.

Note that this method is **not** recommended for use in production or when there is more than one developer working on the project. A proper dev setup is needed.

## Demo

_TODO_
