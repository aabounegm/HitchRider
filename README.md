<img src="./public/banner.png" alt="Logo" align="right" width="130" />

# HitchRider

HitchRider is a [Telegram Web App](https://core.telegram.org/bots/webapps) for connecting hitchhikers and drivers together. You can use it by going to [@hitchrider_bot](https://t.me/hitchrider_bot) and hitting `/start`.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) hosted on Vercel.

## Features

### Done

These are the features that are already implemented as part of the MVP:

- Announcing rides (as a driver) with endpoints, time, free seats, car information, and possibly price.
- Requesting rides (as a hitchhiker)
- Listing all announced rides/requests
- Page with ride/request details
- Connecting a TON wallet for receiving payment
- Paying for a ride using TON

### TODO

The features we plan to add in the future (in no particular order) are:

- Filtering the requests/rides list by location and/or time
- Migrate from Next.js to React with Vite (we don't need SSR, and it's overcomplicating things)
- i18n
- Recurring trips
- A map interface for selecting the location
- Support for contacting users without a username (chat through the bot perhaps)
- Storing cars in profile for quick access
- Sharing car info only after driver approves the request
- Rating for drivers and passengers
- Automatically suggesting a match between rides and requests
- Saved locations (home, work, ...)

## Demo

Here is a YouTube video demonstrating the functionalities:

<iframe width="560" height="315" src="https://www.youtube.com/embed/wyaPcYA1sD0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Since most of the functionality depends on the web app running inside the Telegram client, you will need to either [use the test environment](https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment) to access the app without using HTTPS, or use a proxy that provides HTTPS links that redirect to your localhost. To create such a proxy, follow these steps:

1. In another terminal, run: `npx localtunnel --host https://loca.lt --port 3000 --subdomain hitch-rider`
2. Send the command `/dev` to the bot to update the links to your local one.

Note that this method is **not** recommended for use in production or when there is more than one developer working on the project. A proper dev setup with a separate test bot is needed.

## Useful Resources

- [Telegram bot Web Apps documentation](https://core.telegram.org/bots/webapps)
- [TON Telegram bot integration](https://docs.ton.org/develop/dapps/ton-connect/tg-bot-integration)
- [TON TWA template](https://github.com/ton-community/twa-template)
- [TON Connect UI React](https://www.npmjs.com/package/@tonconnect/ui-react)
