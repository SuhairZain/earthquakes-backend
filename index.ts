import { getEarthQuakes } from "./src/controllers/earthQuakes/earthQuakesController";
import { initialize as initializeDb } from "./src/database";
import "./src/database/models";

const express = require("express");

const PORT = 1234;
const app = express();

// Allow CORS
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/earthQuakes", getEarthQuakes);

app.listen(PORT, async () => {
  await initializeDb();

  console.log(`Server is listening on port: ${PORT}`);
});
