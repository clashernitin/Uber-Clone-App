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
      }
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
      }
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

---

# Captain Registration API Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. Requires full name, email, password, and vehicle details. Returns a JWT token and the created captain object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullName.firstName`: String, required, minimum 4 characters
- `fullName.lastName`: String, required, minimum 4 characters
- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters
- `vehicle.color`: String, required
- `vehicle.plate`: String, required
- `vehicle.capacity`: Integer, required, minimum 1
- `vehicle.vehicleType`: String, required, one of `car`, `bike`, `auto`

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "<captain_id>",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": null,
        "lng": null
      }
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
        "msg": "First name must be at least 4 characters long",
        "param": "fullName.firstName",
        "location": "body"
      }
    ]
  }
  ```

### Conflict

- **Status Code:** `409 Conflict`
- **Body:**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "Jane", "lastName": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

# Captain Login API Documentation

## Endpoint

`POST /captains/login`

## Description

Authenticates a captain with email and password. Returns a JWT token and the captain object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "jane.smith@example.com",
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
    "captain": {
      "_id": "<captain_id>",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": null,
        "lng": null
      }
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
        "msg": "Invalid email format",
        "param": "email",
        "location": "body"
      }
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
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "yourpassword"
  }'
```

---

# Get Captain Profile API Documentation

## Endpoint

`GET /captains/profile`

## Description

Retrieves the authenticated captain's profile information. Requires a valid JWT token in the cookie or `Authorization` header.

## Authentication

- Send the JWT token as a cookie named `token` **or**
- Send the JWT token in the `Authorization` header as `Bearer <token>`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "<captain_id>",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": null,
        "lng": null
      }
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
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# Captain Logout API Documentation

## Endpoint

`GET /captains/logout`

## Description

Logs out the authenticated captain by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token in the cookie or `Authorization` header.

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
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt_token>"
```