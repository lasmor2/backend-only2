const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const signInSchema = require("../middlewares/signinValidation");
const { isMatch } = require("../utils/hashedPassword");
require("dotenv").config();

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = signInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: details[0].message,
      });
    }
    const existUser = await User.findOne({
      email,
    }).select("+password");
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist found",
      });
    }
    const isMatchPassword = await isMatch(password, existUser.password);

    if (!isMatchPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        userId: existUser._id,
        email: existUser.email,
        verified: existUser.verified,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signIn;
