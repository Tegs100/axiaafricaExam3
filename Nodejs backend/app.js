// Import required packages/modules
const express = require("express"); // Import Express.js framework for building web applications
const cookieParser = require("cookie-parser"); // Import middleware to parse cookies in requests
const connectDB = require("../config/db"); // Import database connection from db.config.js
// Import custom route modules
const postRoute = require("./route/post.route"); // Import post-related routes
const userRoute = require("./route/user.route"); // Import user-related routes
const kycRoute = require("./route/kyc.route"); // Import kyc-related routes

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON payloads in incoming requests
app.use(cookieParser()); // Parse Cookie header and populate req.cookies

// Database connection
connectDB(); // Connect to MongoDB database

// Route middleware
app.use(userRoute); //  user routes for handling user-related endpoints
app.use(postRoute); // post routes for handling post-related endpoints
app.use(kycRoute); //  kyc routes for handling kyc -related endpoints

module.exports = app; 