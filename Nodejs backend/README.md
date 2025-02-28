# Creating a User's APIs

## Description
 Writing  the codes and the logics for creating a User's APIs 

### Registration of a user 
 The model is be linked to two more models called KYC and Post. Using one-to-one relationship and one-to-many-relationship. It also has an end point that create them and links to the user.
  
### Login (Authentication) using JWT so you can send token to the user's browser and have access to it through a middleware for protected routes.

### Deleting a user
This includes authorising the deleting of any KYC or Post that particular user has made, concurrently.

## Project Structure
│── /config
│   ├── db.js          # Database connection
│── /controllers
│   ├── user.controller.js  # Business logic for users
│   ├── post.controller.js  # Business logic for users
│   ├── kyc.controller.js  # Business logic for users

│── /middlewares
│   ├── auth.js        # Authentication middleware
│── /models
│   ├── userlmodel.js        # User model
│   ├── post.model.js        # Post model
│   ├── user.controller.js   # Kyc model
│── /routes
│   ├── user.route.js  # Route for user management
│   ├── post.route.js  # Route for user management
│── server.js         # Main server entry file
│── app.js            # Express App
│── package.json      # Dependencies
│── .env              # Environment variables

## Technologies
- Node.js
- Express.js 
- MongoDB
- JWT (JSON Web Token)
- bcrypt.js

## Installation
 ### Clone the repository
 git clone <repository-url>

 ### Install dependencies
 npm install

 ### Create .env file

### User Routes
```
POST   /api/users/register   # Register new user
POST   /api/users/login      # User login
GET    /api/users/:id        # Get user by ID
DELETE /api/users/:id        # Delete user and related data (Post & KYC).
```

### KYC Routes
```
POST   /api/kyc             # Submit KYC details
GET    /api/kyc/:id         # Get KYC details
```

### Post Routes
```
POST   /api/posts           # Create new post
GET    /api/posts           # Get all posts
GET    /api/posts/:id       # Get post by ID
DELETE /api/posts/:id       # Delete post
```

## Running the Application
 npm start 


## Authentication
- JWT-based authentication
- Tokens are sent via HTTP-only cookies
- Protected routes require valid JWT token
  
## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## License
MIT

## Author
Oghenetega Godwin






   