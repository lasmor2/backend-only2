const express = require("express");
const signUp = require("../controller/signupController");
const signIn = require("../controller/signinController");
const signOut = require("../controller/signoutController");
const { sendVerificationCode } = require("../controller/sendVerification");
const { verifyUser } = require("../controller/sendVerification");
const identifier = require("../middlewares/identification");
const changePassword = require("../controller/changePassword");
const { sendForgotPasswordCode } = require("../controller/sendForgotPassword");
const { verifyPasswordCode } = require("../controller/sendForgotPassword");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", identifier, signOut);

router.patch("/verifyCode", identifier, sendVerificationCode);
router.patch("/verifyUser", identifier, verifyUser);
router.patch("/changePassword", identifier, changePassword);
router.patch("/sendForgotPassword", sendForgotPasswordCode);
router.patch("/verifyPassword", verifyPasswordCode);

module.exports = router;
