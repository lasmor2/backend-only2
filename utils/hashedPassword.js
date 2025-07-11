const { hash } = require("bcryptjs");

const Hashed = (value, setSaltValue) => {
  const result = hash(value, setSaltValue);
  return result;
};

module.exports = Hashed;
