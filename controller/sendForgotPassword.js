const User = require("../models/userModel");
const crypto = require("crypto");
const transport = require("../middlewares/mailer");
const { hmacProcess } = require("../utils/hashedPassword");
const acceptFPSchema = require("../middlewares/forgotPassword");
const { hashedPassword } = require("../utils/hashedPassword");

const sendForgotPasswordCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const buffer = crypto.randomBytes(6);
    const randomNumber = (buffer.readUIntBE(0, 6) % 900000) + 100000;
    const codeValue = randomNumber.toString();

    let info = await transport.sendMail({
      from: process.env.THE_SENDER,
      to: existUser.email,
      subject: "Forgot Password Code",
      html: `
      <h1> From: ${process.env.THE_SENDER}</h1>
      <h2>this is Your verification forgot code is ${codeValue}</h2>`,
    });
    if (info.accepted[0] === existUser.email) {
      const hashValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_KEY
      );
      existUser.forgotPasswordCode = hashValue;
      existUser.forgotPasswordCodeValidation = Date.now();
      await existUser.save();
      return res.status(200).json({
        success: true,
        message: "Verification code sent successfully",
      });
    }
    res.status(400).json({
      success: false,
      message: "Verification code not sent",
    });
  } catch (error) {
    console.log;
  }
};

const verifyPasswordCode = async (req, res) => {
  const { email, providedCode, newPassword } = req.body;
  try {
    const { error} = acceptFPSchema.validate({
      email,
      providedCode,
      newPassword,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const codeValue = providedCode.toString();
    const existUser = await User.findOne({ email }).select(
      "+forgotPasswordCode +forgotPasswordCodeValidation"
    );
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (
      !existUser.forgotPasswordCode === !existUser.forgotPasswordCodeValidation
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid verification code",
      });
    }
    if (Date.now() - existUser.forgotPasswordCodeValidation > 5 * 60 * 1000) {
      return res.status(401).json({
        success: false,
        message: "Verification code has expired",
      });
    }
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_KEY
    );
    if (hashedCodeValue !== existUser.forgotPasswordCode) {
      const newHashedPassword = await hashedPassword(newPassword, 12);
      existUser.password = newHashedPassword;
      existUser.forgotPasswordCode = undefined;
      existUser.forgotPasswordCodeValidation = undefined;
      await existUser.save();
      return res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
    }
    return res.status(404).json({
      success: false,
      message: "unexpected occured!!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendForgotPasswordCode, verifyPasswordCode };
