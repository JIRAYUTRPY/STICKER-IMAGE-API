import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { protect } from "./middlewares/jwtIntercepter.js";
import { errorHandler, logErrors } from "./common/errorHandler.js";
import fileUploadRouter from "./controllers/upload.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("update", (arg) => {
    io.emit("update");
  });
});
// app.use(protect);

app.use("/upload", fileUploadRouter);

app.use(logErrors);
app.use(errorHandler);
// app.get("/", (req, res) => {
//   res.header("Content-type", "text/html");
//   return res.end("<h1>STICKER IMAGE API</h1>");
// });
app.get("*", (req, res) => {
  return res.status(404).send("API Not found.");
});

app.set("socket", io);

httpServer.listen(3000, () => {
  console.log("START SERVER STICKER IMAGE AT PORT 3000");
});
// app.listen(process.env.PORT, () => {
//   console.log("START SERVER STICKER IMAGE AT PORT 3000");
// });
// http.createServer(app).listen(process.env.PORT, () => {
//   console.log("START SERVER STICKER IMAGE AT PORT 3000");
// });
