import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { protect } from "./middlewares/jwtIntercepter.js";
import { errorHandler, logErrors } from "./common/errorHandler.js";
import fileUploadRouter from "./controllers/upload.js";
import http from "http";

dotenv.config();
const app = express();

function apps() {
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  // app.use(protect);

  app.use("/upload", fileUploadRouter);

  app.use(logErrors);
  app.use(errorHandler);
  app.get("/", (req, res) => {
    res.header("Content-type", "text/html");
    return res.end("<h1>STICKER IMAGE API</h1>");
  });
  app.get("*", (req, res) => {
    return res.status(404).send("API Not found.");
  });
  http.createServer(app).listen(process.env.PORT, () => {
    console.log("START SERVER STICKER IMAGE AT PORT 3000");
  });
}

apps();
