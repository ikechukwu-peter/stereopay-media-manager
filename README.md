# StereoPay Media Manager

## Description

StereoPay Media Manager is a NestJS application that provides a media manager for audio and images. It is built using NestJS, MySQL, and Prisma.

**Note:** This project assumes that the media is going to come as a string either as a URL or a base64 encoded string, hence the url to the media has been stored as a string.

## Table of Contents

- [StereoPay Media Manager](#stereopay-media-manager)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Built With 🌩️](#built-with-️)
  - [Getting Started ☀️](#getting-started-️)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Installation](#installation)
  - [Configuration and MySQL Database Setup with Prisma](#configuration-and-mysql-database-setup-with-prisma)
    - [Migrations and SQL](#migrations-and-sql)
  - [Running the App](#running-the-app)
  - [Testing](#testing)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Author](#author)
  - [📝 License](#-license)

## Built With 🌩️

- NestJS
- MySQL
- Prisma

## Getting Started ☀️

To get a local copy up and running, follow these simple example steps.

### Prerequisites

You'll need Node.js and npm installed on your system. You can install them by running the following command:

You'll also need to install yarn. You can do this by running the following command: `npm install`

You'll also need to install yarn. You can do this by running the following command: `npm install --global yarn`

### Setup

Clone this repository by typing the following command on your terminal:

```
git clone https://github.com/ikechukwu-peter/stereopay-media-manager.git
```

## Installation

After cloning the repository, navigate to the project directory and run the following command to install the project dependencies:

`yarn install`

## Configuration and MySQL Database Setup with Prisma

**Note** I have already set up all you need to use mysql with prisma, the only required things to do are written below.

You'll need to set the following environment variables in a .env file:

```
DATABASE_URL=<your-database-url>
SHADOW_DATABASE_URL=<your-shadow-database-url>
PORT=<your-port>

```

The `DATABASE_URL` is the URL of your MySQL database. The `SHADOW_DATABASE_URL` is needed only if your MySQL user does not have the privilege to create a database. By default, Prisma creates a shadow database for migrations, and if your user does not have the privilege to create one, you'll need to set the `SHADOW_DATABASE_URL` environment variable to a URL of a MySQL database where you have the privilege to create databases. If you have the privilege to create databases, you can comment out the `SHADOW_DATABASE_URL` line in the `prisma/schema.prisma` file. The `PORT` is the port that the application will run on.

It should be in this format `DATABASE_URL=mysql://user:password@host:port/my_database`

Replace `user`, `password`, `host` and `port ` with the username, password, host and port for your MySQL database, and `my_database` with the name of the database you created. It is the same if you are using a shadow database.

### Migrations and SQL

The migrations and SQL files are located in the `prisma` directory. You can use the Prisma CLI to create and apply migrations, and to generate TypeScript code based on your database schema.

To generate migration for your own database follow this procedure, right in your terminal from `https://github.com/ikechukwu-peter/stereopay-media-manager.git` project directory
`cd/prisma`
Now inside here, you will find two folders `migrations` and `schema.prisma` delete the `migrations` folder and then run
` npx prisma migrate dev --name init` to generate a new migrations.

## Running the App

To start the application, run the following command:

`yarn run start`

This will start the application in production mode.

To run the application in development mode, use the following command:

`yarn run start:dev`

This will start the application in watch mode, so any changes you make to the code will be automatically detected and the application will be recompiled.

## Testing

To run the unit tests, use the following command:
`yarn run test`

To run the end-to-end tests, use the following command:

`yarn run test:e2e`

To generate a test coverage report, use the following command:

`yarn run test:cov`

## Usage

To use this project, follow these steps:

1. Open your termina and run `yarn run start:dev` to start a developement server
2. Go to any API testing tool of your choice, the server should be running in `localhost:<port>` where `port` is supplied by you.
   Look below to understand the endpoints.

## API Endpoints

The following API endpoints are available:

- `POST /api/v1/media`: Create a new media
- `GET /api/v1/media?page=1&perPage=12`: Get a list of paginated media
- `GET /api/v1/media/search?query=search`: Get a list of media by search query
- `GET /api/v1/media/:id`: Get a media by id
- `PATCH /api/v1/media/:id`: Update a media by id
- `DELETE /api/v1/media/:id`: Delete a media by id

## Author

👤 **Ikechukwu Peter**

- GitHub: [@ikechukwu-peter](https://github.com/ikechukwu-peter)
- Twitter: [@pete_iyke](https://twitter.com/pete_iyke)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/peter-ikechukwu/)

## 📝 License

This project is [MIT](./LICENSE) licensed.
