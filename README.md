# Placeholdr

This project has been renamed from FluxTest to Placeholdr. Honestly, FluxTest was a terrible, ChatGPT-generated name that we selected because we were too lazy to pick a good one, and we chose Placeholdr🤣.

Placeholdr is a simple, open-source, self-hostable tool for collecting product feedback and analysis. The idea behind Placeholdr is that product managers or other non-technical team members no longer have to rely on the engineering team to help them run minor experiments and other activities they want to conduct on their platform with their users.

With Placeholdr, all the developers have to do is integrate minimal code into their product's HTML. After that, Placeholdr handles everything else, from rendering components from its collection of pre-built feedback components, which users can pick from, to ensuring that the data collected from these pre-built components is stored in the right location for running analytics.

Some of the things it can do:

- Involve team members with less technical skills.

- Require minimal setup to start using Placeholdr.

- Offer diverse feedback collection components that can be used with the click of a button.

Find out more from the video [here](https://drive.google.com/file/d/1jkpKCRn0iRIuRqgM0WXncKKvtPNU8gVV/view?usp=drive_link).

## Run Locally

### Requirements

- A server with Node.js version 16.13 or newer
- A database. Placeholdr supports [PostgreSQL](https://www.postgresql.org/).
- Placeholdr requires `pnpm` to be installed if not already present. can be done with `npm i -g pnpm`
- Docker and Docker Compose

Clone the project

```bash
  git clone https://github.com/balub/Placeholdr.git
```

Go to the project directory

```bash
  cd Placeholdr
```

Install dependencies

```bash
  pnpm install
```

Make the installation script executable:

```bash
  chmod +x install.sh
```

Run the installation script to set up `pnpm` and other necessary steps:

```bash
  ./install.sh
```

Build the containers:

```bash
  docker compose build
```

### Backend Run Instructions

From the root directory:

1. Start the containers:

```bash
  docker compose up
```

2. Run the migrations in the backend containers:

- Find the container ID for the backend by running:

```bash
  docker ps
```

- Copy the container ID of the `placeholdr-backend` image.

- Run the following command to access the container shell:

```bash
  docker exec -it <container_id> bash
```

- Inside the shell, run:

```bash
  npx prisma migrate dev
```
- Run the seed script

```bash
  npx run seed
```

3. Navigate to the backend package and open it in your preferred IDE:

```bash
  cd packages/backend
```

### Frontend Run Instructions

1. Navigate to the dashboard package:

```bash
  cd packages/dashboard
```

2. If dependencies are not installed, run:

```bash
  pnpm i
```

3. Start the development server:

```bash
  pnpm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can do so using the `.env.example` file already present by.

```bash
    cp .env.example .env
```

## Contributing

Contributions are always welcome!

Talented frontend engineers and designers please help us 🥲🥲.

## License

Placeholdr (the code in this repository) is licensed under the MIT license.

[MIT](https://choosealicense.com/licenses/mit/)

