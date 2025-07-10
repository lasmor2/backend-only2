const express = require("express");
require("dotenv").config();
const connectDb = require("./config/config");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const router = require("./routers/router");

connectDb();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
