const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
