require("dotenv").config({ path: ".env.dev" });
require("./db");
import cors from "cors";
import express, { Express, Request, Response, json, urlencoded } from "express";
import { createServer } from "http";
import moment from "moment";
import { initSocketIO } from "./socket";

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

const server = createServer(app);

// Initialize Socket.IO
initSocketIO(server);

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

app.use("/api/v1/auth", require("./api/auth/auth.controller"));
app.use("/api/v1/user", require("./api/user/user.controller"));
app.use("/api/v1/agent", require("./api/agent/agent.controller"));
app.use("/api/v1/property", require("./api/property/property.controller"));
app.use("/api/v1/favorite", require("./api/favorite/favorite.controller"));
app.use("/api/v1/lead", require("./api/lead/lead.controller"));
app.use("/api/v1/offer", require("./api/offer/offer.controller"));
app.use("/api/v1/review", require("./api/review/review.controller"));
app.use("/api/v1/room", require("./api/room/room.controller"));
app.use("/api/v1/chat", require("./api/chat/chat.controller"));
app.use(
  "/api/v1/notification",
  require("./api/notification/notification.controller")
);
app.use("/api/v1/admin", require("./api/admin/admin.controller"));
app.use(
  "/api/v1/app-config",
  require("./api/app-config/app-config.controller")
);
app.use(
  "/api/v1/contact-us",
  require("./api/contact-us/contact-us.controller")
);
app.use(
  "/api/v1/news-letter",
  require("./api/news-letter/news-letter.controller")
);
app.use("/api/v1/cms", require("./api/cms/cms.controller"));

app.use((_, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Sever is live on: http://localhost:${PORT}/`)
);

//
