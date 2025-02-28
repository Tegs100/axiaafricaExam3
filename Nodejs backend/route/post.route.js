const express = require("express"); // Import Express framework
const authorisation = require("../middleware/auth.middleware"); // Import auth middleware
const route = express.Router(); 

// Import post controller functions using destructuring
const {
  createPost, 
  getAllPost, 
  getOnePost, 
  updatePost, 
  deletePost, 
} = require("../controller/post.controller");


route.post("/posts", authorisation, createPost);

route.get("/posts", getAllPost);

route.get("/posts/:id", getOnePost);

route.put("/posts/:id", authorisation, updatePost);

route.delete("/posts/:id", authorisation, deletePost);

module.exports = route;
