import express from "express";
import { promisify } from "util";
import mysql from "mysql2";
import * as cors from "cors";
import config from "../config";
import router from "./routes/stocks";

const app = express();

const PORT = process.env.PORT || config.port;

// const db = mysql.createConnection(config.db);
// export const query = promisify(db.query).bind(db);

const pool = mysql.createPool(config.db);
export const query = promisify(pool.query).bind(pool);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors.default({ origin: "*" }));

// define a route handler for the default home page
app.use("/api", router);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

module.exports = app;
