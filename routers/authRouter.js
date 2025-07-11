const express = require("express");
const signUp = require("../controller/signupController");
const signIn = require("../controller/signinController");
const signOut = require("../controller/signoutController");
const { sendVerificationCode } = require("../controller/sendVerification");
const { verifyUser } = require("../controller/sendVerification");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

router.patch("/verify", sendVerificationCode);
router.patch("/verifyCode", verifyUser);

module.exports = router;
