const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  if (!process.env.API_KEY) {
    console.error("Please, add an api key to environment variable");
    throw Error("Invalid api key");
  }
  console.log(
    `Example app listening on port ${port} and key ${process.env.API_KEY}`
  );
});
