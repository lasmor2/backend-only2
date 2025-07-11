const express = require("express");
const signUp = require("../controller/signupController");

const router = express.Router();

router.post("/signup", signUp);

module.exports = router;
