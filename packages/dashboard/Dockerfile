# Initial stage, just build the app
FROM node:lts as builder

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY . .
RUN pnpm install --force --frozen-lockfile

WORKDIR /usr/src/app/packages/dashboard/
RUN pnpm run build


# Final stage, take the build artifacts and package it into a static Caddy server
FROM caddy:2-alpine
WORKDIR /site
COPY packages/dashboard/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/packages/dashboard/dist/ .

EXPOSE 8080