const signUpSchema = require("../middlewares/signinValidation");
const hashedPassword = require("../utils/hashedPassword");
const User = require("../models/userModel");

const signUp = async (req, res) => {
  const { password, email } = req.body;

  try {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: details[0].message,
      });
    }

    const isExist = await User.findOne({
      email,
    });
    if (isExist) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const Hashed = await hashedPassword(password, 10);

    const newUser = await User.create({
      email,
      password: Hashed,
    });
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signUp;
