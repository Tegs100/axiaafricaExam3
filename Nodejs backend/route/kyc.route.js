const express = require("express");
const route = express.Router();
const { createKyc, getOneKyc } = require("../controller/kyc.controller");
const authorization = require("../middleware/auth.middleware");

// Protected KYC routes
route.post("/kyc", authorization, createKyc);
route.get("/kyc/:id", authorization, getOneKyc);


module.exports = route;
