
## Introduction

Your Project is a web application that allows users to manage user accounts and books.

## Installation and Setup

1. **Clone the Repository:**
   ```
   git clone https://github.com/8309h/digital_pani_bookmanagement.git
   ```

2. **Install Dependencies:**
   ```
   cd digital_pani_bookmanagement
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-secret-key
   ```

4. **Start the Server:**
   ```
   npm run server
   ```

5. **Access the API:**
   Once the server is running, you can access the API endpoints using the base URL `http://localhost:3000/api/`.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- Swagger for API documentation

## Contributors

- [Your Name](https://github.com/8309h)

## API Documentation

### Authentication

API endpoints may require authentication using JWT tokens. Please refer to the authentication section of the documentation for details on obtaining and using authentication tokens.

### User Routes

#### Register a New User

- **URL:** `/user/register`
- **Method:** `POST`
- **Description:** Registers a new user account.
- **Request Body:**
  - `email` (string, required): Email address of the user.
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
- **Response:** 
  - Status Code: `201 Created`
  - Body: User object of the newly created user.

#### User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
- **Response:** 
  - Status Code: `200 OK`
  - Body: JWT token for authentication.

#### Get User by ID

- **URL:** `/user/{id}`
- **Method:** `GET`
- **Description:** Retrieves a specific user by ID.
- **Parameters:**
  - `id` (string, required): ID of the user.
- **Response:** 
  - Status Code: `200 OK`
  - Body: User object.

#### Update User by ID

- **URL:** `/user/{id}`
- **Method:** `PUT`
- **Description:** Updates a specific user by ID.
- **Parameters:**
  - `id` (string, required): ID of the user.
- **Request Body:**
  - `email` (string): Updated email address of the user.
  - `username` (string): Updated username of the user.
  - `password` (string): Updated password of the user.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Updated user object.

#### Delete User by ID

- **URL:** `/user/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a specific user by ID.
- **Parameters:**
  - `id` (string, required): ID of the user.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Deleted user object.

### Book Routes

#### Create a New Book

- **URL:** `/books`
- **Method:** `POST`
- **Description:** Creates a new book record.
- **Request Body:**
  - `title` (string, required): Title of the book.
  - `author` (string, required): Author of the book.
  - `publicationYear` (integer, required): Publication year of the book.
- **Response:** 
  - Status Code: `201 Created`
  - Body: Created book object.

#### Get All Books

- **URL:** `/books`
- **Method:** `GET`
- **Description:** Retrieves a list of all books in the database.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Array of book objects.

#### Get Book by ID

- **URL:** `/books/{id}`
- **Method:** `GET`
- **Description:** Retrieves a specific book record by its ID.
- **Parameters:**
  - `id` (string, required): ID of the book.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Book object.

#### Update Book by ID

- **URL:** `/books/{id}`
- **Method:** `PUT`
- **Description:** Updates a specific book record by its ID.
- **Parameters:**
  - `id` (string, required): ID of the book.
- **Request Body:**
  - `title` (string): Updated title of the book.
  - `author` (string): Updated author of the book.
  - `publicationYear` (integer): Updated publication year of the book.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Updated book object.

#### Delete Book by ID

- **URL:** `/books/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a specific book record by its ID.
- **Parameters:**
  - `id` (string, required): ID of the book.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Deleted book object.

#### Get Books with Pagination and Filtering

- **URL:** `/books/allbook`
- **Method:** `GET`
- **Description:** Retrieves books with pagination and optional filtering.
- **Query Parameters:**
  - `page` (integer

, optional): Page number for pagination.
  - `limit` (integer, optional): Number of books per page.
  - `author` (string, optional): Filter books by author.
  - `publicationYear` (integer, optional): Filter books by publication year.
- **Response:** 
  - Status Code: `200 OK`
  - Body: Array of book objects matching the query parameters.


