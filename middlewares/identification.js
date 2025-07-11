const jwt = require("jsonwebtoken");
require("dotenv").config();

const identifier = (req, res, next) => {
  let token;

  if (req.headers.client === "not-browser") {
    token = req.headers.authorization;
  } else {
    token = req.cookies["Authorization"];
  }
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "unauthorized",
    });
  }
  try {
    const userToken = token.split(" ")[1];
    const jwtVerified = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if (jwtVerified) {
      req.user = jwtVerified;
      next();
    } else {
      throw new Error("invalid token");
    }
  } catch (error) {
    console.log(error);
  }
};
