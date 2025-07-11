const User = require("../models/userModel");
const crypto = require("crypto");
const transport = require("../middlewares/mailer");
const { hmacProcess } = require("../utils/hashedPassword");
const acceptSchema = require("../middlewares/verified");

const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (existUser.verified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    const buffer = crypto.randomBytes(6);
    const randomNumber = (buffer.readUIntBE(0, 6) % 900000) + 100000;
    const codeValue = randomNumber.toString();

    let info = await transport.sendMail({
      from: process.env.THE_SENDER,
      to: existUser.email,
      subject: "Verification Code",
      html: `
      <h1> From: ${process.env.THE_SENDER}</h1>
      <h2>this is Your verification code is ${codeValue}</h2>`,
    });
    if (info.accepted[0] === existUser.email) {
      const hashValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_KEY
      );
      existUser.verificationCode = hashValue;
      existUser.verificationCode = Date.now();
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

const verifyUser = async (req, res) => {
  const { email, providedCode } = req.body;
  try {
    const { error, value } = acceptSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const codeValue = providedCode.toString();
    const existUser = await User.findOne({ email }).select(
      "+verificationCode +verificationCodeVAlidation"
    );
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (existUser.verified) {
      return res.status(404).json({
        success: false,
        message: "User already verified",
      });
    }
    if (!existUser.verificationCode === !existUser.verificationCodeValidation) {
      return res.status(401).json({
        success: false,
        message: "Invalid verification code",
      });
    }
    if (Date.now() - existUser.verificationCodeValidation > 5 * 60 * 1000) {
      return res.status(401).json({
        success: false,
        message: "Verification code has expired",
      });
    }
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_KEY
    );
    if (hashedCodeValue !== existUser.verificationCode) {
      existUser.verified = true;
      existUser.verificationCode = undefined;
      existUser.verificationCodeValidation = undefined;
      await existUser.save();
      return res.status(200).json({
        success: true,
        message: "User verified successfully",
      });
    }
    return res.status.json({
      success: false,
      message: "unexpected occurence",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendVerificationCode, verifyUser };
