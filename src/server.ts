import express from "express";
import cors from "cors";

import "./database/models";

import { getEarthQuakes } from "./controllers/earthQuakes/earthQuakesController";

const app = express();

// Allow CORS
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));

app.get("/earthQuakes", getEarthQuakes);

export default app;
