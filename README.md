<h1 align="center" id="title">Album Club</h1>

<p align="center"><img width="250px" src="./public/android-chrome-512x512.png" alt="project-image"></p>

My friends and I started an album listening club and I wanted to make a website to share and track our listening experience.

## Demo

Public Instance [here](https://club.kv7.dev/)

(**Note:** This is a demo/public instance, I track our albums on a private instance)

## Getting Started

You will need Node.js and git to run this project locally

### Installing

```bash
git clone https://github.com/Kalmarv/MusicClub
cd MusicClub
pnpm install
```

### Environment Variables

This site uses a lot of environment variabls, so it'll take a little bit of time to set them up.

You'll need the following environment variables:

```bash
# Prisma (Postrgres)
DATABASE_URL

# Next Auth
NEXTAUTH_SECRET

# Leave this as localhost for dev, and set the public domain of the site for the value on Vercel
NEXTAUTH_URL=http://localhost:3000

# Spotify API
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN

# Discord provider, you can swap this out for a different provider if you want
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
```

TODO: explain how to set these up

After that you can spin up the dev server and you should be good to go

```bash
pnpm dev
```

## Project Info

## Architecture

## Challenges

## Built With

- T3 Stack
  - Next.js
  - TRPC
  - Prisma
  - React
  - Tailwind CSS
  - Typescript
- DaisyUI

## License

This project is licensed under the MIT License
