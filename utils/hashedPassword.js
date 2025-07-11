const { hash, compare } = require("bcryptjs");
const { createHmac } = require("crypto");

const hashedPassword = async (value, setSaltValue) => {
  const result = await hash(value, setSaltValue);
  return result;
};

const isMatch = async (value, hashedValue) => {
  if (!value || !hashedValue || typeof hashedValue !== "string") {
    throw new Error("Invalid values for comparison");
  }
  const result = await compare(value, hashedValue); // ✅ Use await
  return result;
};

const hmacProcess = (value, key) => {
  const hmac = createHmac("sha256", key).update(value).digest("hex");
  return hmac;
};

module.exports = {
  hashedPassword,
  isMatch,
  hmacProcess,
};
