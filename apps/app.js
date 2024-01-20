import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { protect } from "./middlewares/jwtIntercepter.js";
import { errorHandler, logErrors } from "./common/errorHandler.js";
import fileUploadRouter from "./controllers/upload.js";

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
    res.send("STICKER-IMAGE-API");
  });
  app.get("*", (req, res) => {
    return res.status(404).send("API Not found.");
  });
  app.listen(process.env.PORT, () => {
    console.log("START SERVER STICKER IMAGE AT PORT 3000");
  });
}

apps();
