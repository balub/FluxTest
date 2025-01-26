# install pnpm
npm install -g pnpm@latest-10

# install dependencies
pnpm install

# copy .env.example to .env
cp .env.example .env

# build docker images
docker compose build
