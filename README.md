<h1 align="center" id="title">Album Club</h1>

<p align="center"><img width="250px" src="./public/android-chrome-512x512.png" alt="project-logo"></p>

My friends and I started an album listening club and I wanted to make a website to share and track our listening experience.

## Demo

<p align="center"><img src="https://i.imgur.com/tep8FV5.png" alt="project-image"></p>

---

You can visit a public instance [here](https://club.kv7.dev/)

(**Note:** This is a demo/public instance, I track our albums on a private instance)

## Getting Started

You will need Node.js, git, and a Postgres database to run this project locally

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

## Architecture

The site was boostrapped with the [t3](https://github.com/t3-oss/create-t3-app) stack so check that out if you want to learn about it. It's a lot of fun to build a site with.

Most of the data is provided thanks to the Spotify API, which just uses one account for authentication that is setup before hand. Of course all the API calls are done on the backend, and just passed to the client to keep it all secure.

## What I Learned

### Postgres

I had some challenges getting my schema configured correctly, as well as dealing with some foreign key issues when trying to create album and track tables at the same time.

You can check the commit log for all the migrations 😅 I performed trying to get everything to work.

One of the main things I struggled with was maping an array of songs I wanted to track to the database, and connecting those songs to the album in one transaction. I really didn't want to have separate transactions for each song, as that would be a lot of overhead.

It wasn't super intuitive to me, I assumed you could just .map() the the tracks when adding the data, but I was having trouble figuring out how to do that.

I hadn't dealt with foreign keys issues before either, but after stuggling for a while, (and actually sitting down and learning about some database concepts) I definitely have a better understanding of how it all ties together.

After a little bit (_a lot_) of trial and error with some googling thrown in I was able to get it all working how I wanted in the end.

### React Query

I went a little deeper with React Query than I have in the past, and I'm gaining a better understanding of how it works.

There's a good amount of mutations and queries happening in the site, and I just gotta say, I'm very happy I don't have to use useEffect() for all the data fetching.

It's really a fantastic library for managing data fetching, you should definitely check it out.

### Mobile First

For most of my past sites, I haven't been using a mobile first approach, and that was seriously limiting the amount of responsive design I could accomplish.

With this site I almost exclusively developed in the mobile view in chrome dev tools, and it really made it a much smoother process overall. It's just so much easier to conver a mobile view to a desktop view.

I really think it looks great and this is going to be my process for the rest of my projects.

## Built With

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
  - [Next.js](https://nextjs.org/)
  - [TRPC](https://trpc.io/)
  - [Prisma](https://www.prisma.io/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Typescript](https://www.typescriptlang.org/)
  - [NextAuth](https://next-auth.js.org/)
- [React Query](https://tanstack.com/query/v4/)
- [DaisyUI](https://daisyui.com/components/)

## License

This project is licensed under the MIT License

[![wakatime](https://wakatime.com/badge/user/10b1254d-ffa0-4ffb-889d-7d140765d5fb/project/a6192aa9-b96c-4b71-9bc2-694b49b576a4.svg)](https://wakatime.com/badge/user/10b1254d-ffa0-4ffb-889d-7d140765d5fb/project/a6192aa9-b96c-4b71-9bc2-694b49b576a4)
