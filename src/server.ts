import { getEarthQuakes } from "./controllers/earthQuakes/earthQuakesController";
import "./database/models";

const express = require("express");

const app = express();

// Allow CORS
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/earthQuakes", getEarthQuakes);

export default app;
