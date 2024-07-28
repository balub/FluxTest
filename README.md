# FluxTest

FluxTest is a simple, open-source, self-hostable tool for collecting product feedback and analysis.

Some of the things it can do:

- Built to involve team members with less technical skills.
- Very minimal setup required to start using FluxTest.
- A diverse collection of input feedback collection components that can be used with the click of a button.

Find out more from the video below.

## Run Locally

### Requirements

- A server with Node.js version 16.13 or newer
- A database. FluxTest supports [PostgreSQL](https://www.postgresql.org/).
- FluxTest requires `pnpm` to be installed if not already present. can be done with `npm i -g pnpm`
- Docker and Docker Compose

Clone the project

```bash
  git clone https://github.com/balub/FluxTest.git
```

Go to the project directory

```bash
  cd FluxTest
```

Install dependencies

```bash
  pnpm install
```

Build the FluxText images with

```bash
  docker compose build .
```

Start all the service with

```bash
    docker compose up .
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can do so using the `.env.example` file already present by.

```bash
    cp .env.example .env
```

The following are the environment variables used by FluxTest.

```
# Database configs
POSTGRES_USER= **********
POSTGRES_PASSWORD= **********
POSTGRES_DB= **********
DATABASE_URL=postgresql://user:password@databaseURL:5432/databaseName
PORT=3170

# Auth Tokens Config
JWT_SECRET="secret1233"
TOKEN_SALT_COMPLEXITY=10
MAGIC_LINK_TOKEN_VALIDITY= 3
REFRESH_TOKEN_VALIDITY="604800000" # Default validity is 7 days (604800000 ms) in ms
ACCESS_TOKEN_VALIDITY="86400000" # Default validity is 1 day (86400000 ms) in ms
SESSION_SECRET='add some secret here'
ALLOW_SECURE_COOKIES=false

# App Domain Config
REDIRECT_URL="http://localhost:5173"
WHITELISTED_ORIGINS = "http://localhost:3170,http://localhost:3000,http://localhost:5173"

# Google Auth Config
GOOGLE_CLIENT_ID= ****************************************
GOOGLE_CLIENT_SECRET= ****************************************
GOOGLE_CALLBACK_URL=http://localhost:3170/v1/auth/google/callback
GOOGLE_SCOPE=email,profile

# Github Auth Config
GITHUB_CLIENT_ID= ******************************
GITHUB_CLIENT_SECRET= ******************************
GITHUB_CALLBACK_URL=http://localhost:3170/v1/auth/github/callback
GITHUB_SCOPE=user:email%
```

## Contributing

Contributions are always welcome!

Talented frontend engineers and designers please help us 🥲🥲.

## License

FluxTest (the code in this repository) is licensed under the MIT license.

[MIT](https://choosealicense.com/licenses/mit/)
