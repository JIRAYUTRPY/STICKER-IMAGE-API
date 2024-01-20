import { Router } from "express";
import multer from "multer";

const fileUploadRouter = Router();
const storageControll = multer({ storage: multer.memoryStorage() });
const multerUpload = storageControll.fields([
  { name: "image", maxCount: 1 },
  //   { name: "courseCoverImgFile", maxCount: 1 },
  //   { name: "subLessonVideoFile", maxCount: 100 },
  //   { name: "singleSubLessonVideo", maxCount: 1 },
]);

fileUploadRouter.post("/image", multerUpload, async (req, res) => {
  try {
    const file = req.files.image;
    console.log(file);
  } catch (err) {
    throw new Error(err);
  }
});

fileUploadRouter.get("/", async (req, res) => {
  try {
  } catch (err) {
    throw new Error(err);
  }
});

export default fileUploadRouter;
