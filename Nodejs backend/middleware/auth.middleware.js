// Import JSON Web Token library for handling authentication tokens
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model")

// Middleware function to verify user authentication
const auth =  (req, res, next) => {
  const {token} = req.cookies;
  if(!token) {
    return res.status(401).json({message: "Unauthorized"})
  }
  //verify if token is valid
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      return res.status(401).json({message: "Unauthorized token"})
    }
    req.user = payload.id;
    next();
  })
}

module.exports = auth;