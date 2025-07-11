const changePasswordSchema = require("../middlewares/changePassword");
const User = require("../models/userModel");
const { isMatch } = require("../utils/hashedPassword");
const { hashedPassword } = require("../utils/hashedPassword");


const changePassword = async (req, res) => {
  const { userId, verified } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "User not verified",
      });
    }
    const existUser = await User.findOne({ _id: userId }).select("+password");
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isMatchPassword = await isMatch(oldPassword, existUser.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const newHashedPassword = await hashedPassword(newPassword, 12);
    existUser.password = newHashedPassword;
    await existUser.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = changePassword;
