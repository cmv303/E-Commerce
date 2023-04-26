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

```bash
(MAKE SURE YOU HAVE .env IN YOUR LOCAL REPO)
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

[screenshot here]

## Deployment

To see a walk-through tutorial, click here:

## License

Please refer to license in Repo.
