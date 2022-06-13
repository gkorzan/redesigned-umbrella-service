import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

import { router as weatherRouter } from "./controllers/weatherController.js";

var corsOptions = {
  origin: "https://redesigned-umbrella.herokuapp.com",
};

app.use(cors(corsOptions));
app.use("/api/v1", weatherRouter);

app.listen(port, () => {
  if (!process.env.API_KEY) {
    console.error("Please, add an api key to environment variable");
    throw Error("Invalid api key");
  }
  console.log(`Example app listening on port ${port}`);
});
