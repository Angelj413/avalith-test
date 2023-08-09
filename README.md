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
