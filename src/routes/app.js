const express = require("express");
const AppController = require("../controllers/app");

const router = express.Router();

// GET REQUESTS
router.get("/", AppController.homeRoute);

module.exports = router;