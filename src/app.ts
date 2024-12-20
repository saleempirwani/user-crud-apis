require("dotenv").config({ path: ".env.dev" });
require("./db");
import cors from "cors";
import express, { Express, Request, Response, json, urlencoded } from "express";
import { createServer } from "http";
import moment from "moment";

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

const server = createServer(app);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to Zella backend APIs." });
});

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `[${moment().format("llll")}] ${res.statusCode} ${req.method} ${
        req.originalUrl
      } ${req.ip}`
    );
  });

  next();
});

/********** APIs endpoints **********/
app.use("/api/v1/ping", async (_, res: Response) => {
  res.status(200).send({ message: "pong" });
});

app.use("/api/v1/user", require("./api/user/user.controller"));

app.use((_, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Sever is live on: http://localhost:${PORT}/`)
);

//
