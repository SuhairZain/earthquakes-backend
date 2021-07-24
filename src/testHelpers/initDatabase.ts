import supertest from "supertest";

import "../database/models";
import app from "../server";

export const request = supertest(app);
