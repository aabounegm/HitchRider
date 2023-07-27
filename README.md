<img src="./public/banner.png" alt="Logo" align="right" width="130" />

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
2. Send the command `/dev` to the bot to update the links to your local one.

Note that this method is **not** recommended for use in production or when there is more than one developer working on the project. A proper dev setup with a separate test bot is needed.

## Demo

_TODO_
