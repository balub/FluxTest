FROM node:20.12.2 AS builder

WORKDIR /usr/src/app

# # Install pnpm
RUN npm i -g pnpm

COPY .env .
COPY pnpm-lock.yaml .
RUN pnpm fetch

ENV PORT=${PORT}

# # PNPM package install
COPY ./packages/backend .
RUN pnpm i pnpm
RUN pnpm i --filter backend

# Prisma bits
RUN pnpm exec prisma generate

FROM builder AS dev
ENV PRODUCTION="false"
ENTRYPOINT ["sh", "-c", "npx prisma migrate dev && npm run seed && pnpm run start:dev"]
EXPOSE 3170

FROM builder AS prod
ENV PRODUCTION="true"
ENTRYPOINT ["sh", "-c", "npx prisma migrate dev && npm run seed && pnpm run start:prod"]
EXPOSE 3170