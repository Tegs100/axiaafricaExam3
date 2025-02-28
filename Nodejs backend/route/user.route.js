// Import Express framework and create a Router instance
const express = require("express");
const route = express.Router();
const authorization = require("../middleware/auth.middleware");

const {
  createUser, 
  loginUser, 
  getOneUser,
  deleteUser, 
} = require("../controller/user.controller");


// POST /user - Create new user account
route.post("/register", createUser);

// POST /login - Authenticate user and create session
route.post("/login",authorization,loginUser)

// GET /user/:id - Retrieve specific user by their ID
route.get("/user/one", authorization, getOneUser);

// DELETE /user/:id - Remove specific user by their ID
route.delete("/user/:id", authorization, deleteUser);

module.exports = route;