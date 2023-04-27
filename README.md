# E-Commerce (back-end)

This application takes an already working Express.js API and configures it to use Sequelize to interact with a MySQL database.

A walk-through tutorial via Insomnia will show you how this functions, assuring that CRUD functionality is working as it should.

## Features

- Express
- MySQL2
- Sequelize
- dotenv

## Installation

Install dependencies with npm

```cmd-line
  npm install
```

Requires `express`, `mysql2`, and `.env`

## Run Locally

Install dependencies

```bash
  npm install
```

access your environmental variables
(MAKE SURE YOU HAVE .env IN YOUR LOCAL REPO)

```bash
mysql -u root -p
(insert your password)
SOURCE db/schema.sql
exit
```

Seed the data

```bash
npm run seed
```

Start the server

```bash
  npm run start
```

## Demo

<img width="1271" alt="Screenshot 2023-04-26 at 11 35 39 AM" src="https://user-images.githubusercontent.com/115678318/234628007-688dd141-9eab-42d1-a861-820894d543f0.png">

## Deployment

To see a walk-through tutorial, click here:
https://drive.google.com/file/d/1M6-rFGk8VrZYF9FpPuZ8L73iPhYqHC-Y/view

## License

Please refer to license in Repo.
