# User Registration API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires a first name, last name, email, and password. Returns a JWT token and the created user object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `422 Unprocessable Entity`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      },
      ...
    ]
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# User Login API Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and the user object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `422 Unprocessable Entity`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email address",
        "param": "email",
        "location": "body"
      },
      ...
    ]
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# Get User Profile API Documentation

## Endpoint

`GET /users/profile`

## Description

Retrieves the authenticated user's profile information. Requires a valid JWT token in the cookie or `Authorization` header.

## Authentication

- Send the JWT token as a cookie named `token` **or**
- Send the JWT token in the `Authorization` header as `Bearer <token>`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# User Logout API Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token in the cookie or `Authorization` header.

## Authentication

- Send the JWT token as a cookie named `token` **or**
- Send the JWT token in the `Authorization` header as `Bearer <token>`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```