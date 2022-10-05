import express from "express";
import { promisify } from "util";
import mysql from "mysql2";

const app = express();
import config from "../config";
import router from "./routes/stocks";

const PORT = process.env.PORT || config.port;

const db = mysql.createConnection(config.db);
export const query = promisify(db.query).bind(db);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route handler for the default home page
app.use("/api", router);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
