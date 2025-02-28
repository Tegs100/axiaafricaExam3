// Start server
const app = require("./app"); // Import Express app from app.js
const dotenv = require("dotenv");
dotenv.config();
app.listen(5000, () => {
    // Start Express server on port 5000
    console.log("app is running on port: 5000 "); // Log server startup message
  });
  