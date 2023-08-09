# Sky Lending Initial Assessment

A brief description of what this project does and who it's for

## Authors

- [Angel Morante](https://www.github.com/Angelj413)

## Installation

Install my-project with npm

    1. Clone Repository

```bash
  git clone https://github.com/Angelj413/avalith-test.git
```

    2. Enter inside project folder

```bash
  cd avalith-test
```

    3. Install dependecies

NPM:

```bash
  npm i
```

Yarn:

```bash
  yarn
```

## Run Locally

#### Normal Run:

Make sure to create the .env file in the root of the project with the environment variables specified in the .env.example or later in the environment variables section

NPM

```bash
  npm run start:dev
```

Yarn

```bash
  yarn start:dev
```

#### Docker Compose

    1. Run with docker compose

```bash
docker-compose up --build
```

## Documentation

Once you have run the project, you can access the documentation:

[Documentation /docs](http://localhost:3000/docs)

Or you can see the API Reference section.

## API Reference

### Users

#### Create (Public)

```http
  POST /users
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username of user |
| `password` | `string` | **Required**. Password of user |

#### Find All Users

```http
  GET /users
```

| Headers         | Type           | Description                                 |
| :-------------- | :------------- | :------------------------------------------ |
| `Authorization` | `Bearer token` | **Required**. Token auth from login method. |

#### Get User Data

```http
  GET /users/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Id of user |

| Headers         | Type           | Description                                 |
| :-------------- | :------------- | :------------------------------------------ |
| `Authorization` | `Bearer token` | **Required**. Token auth from login method. |

#### Update User Data

```http
  PUT /users/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Id of user |

| Body            | Type     | Description       |
| :-------------- | :------- | :---------------- |
| `username`      | `string` | Username of user  |
| `password`      | `string` | Password of user  |
| `first_name`    | `string` | Firt Name of user |
| `last_name`     | `string` | Last Name of user |
| `ssn`           | `string` | SSN of user       |
| `date_of_birth` | `Date`   | Datebirth of user |
| `phone`         | `string` | Phone of user     |

| Headers         | Type           | Description                                 |
| :-------------- | :------------- | :------------------------------------------ |
| `Authorization` | `Bearer token` | **Required**. Token auth from login method. |

### Auth

#### Sign In (Public)

This endpoint return the token for the rest of private endpoints.

```http
  POST /auth/signin
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username of user |
| `password` | `string` | **Required**. Password of user |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=3000`

`DATABASE_HOST=mahmud.db.elephantsql.com`

`DATABASE_PORT=5432`

`DATABASE_USERNAME=swhaytvx`

`DATABASE_PASSWORD=fctR7eMkDz_8eBb1BHmJhkRJZ_LH7FuW`

`DATABASE_NAME=swhaytvx`

`DATABASE_SCHEMA=dev`

`JWT_SECRET=YXZhbGl0aC10ZXN0LWFuZ2Vs`

## Tech Stack

**Server:** Node, NestJS, Express, JWT
