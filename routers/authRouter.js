const express = require("express");
const signUp = require("../controller/signupController");
const signIn = require("../controller/signinController");
const signOut = require("../controller/signoutController");
const { sendVerificationCode } = require("../controller/sendVerification");
const { verifyUser } = require("../controller/sendVerification");
const identifier = require("../middlewares/identification");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", identifier, signOut);

router.patch("/verify", identifier, sendVerificationCode);
router.patch("/verifyCode", identifier, verifyUser);

module.exports = router;
