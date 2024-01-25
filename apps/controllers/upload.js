import { Router } from "express";
import multer from "multer";
import { supabase } from "../utils/supabase.js";
const buckets = `rawImage`;

const fileUploadRouter = Router();
const storageControll = multer({ storage: multer.memoryStorage() });
const multerUpload = storageControll.fields([{ name: "image", maxCount: 1 }]);

fileUploadRouter.post("/image", multerUpload, async (req, res) => {
  try {
    const file = req.files.image;
    if (!req.body.data) {
      return res.status(200).json({ message: "no sticker" });
    }
    const sticker = req.body.data;
    if (!file) {
      return res.status(400).json({ message: "file invalid" });
    }
    const name = new Date().toISOString();
    const filePath = `sticker/${name}-${file[0].size}`;
    const storageRes = await supabase.storage
      .from(buckets)
      .upload(filePath, file[0].buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file[0].mimetype,
      });
    if (storageRes.error) {
      return res.status(400).json({ message: "Cannot upload to supabase" });
    }
    const fileUrl = `https://uamabakrtljqfptzfxje.supabase.co/storage/v1/object/public/rawImage/sticker/${name}-${file[0].size}`;
    const insertFilePath = await supabase
      .from("imagePath")
      .insert({ path: fileUrl })
      .select();
    if (insertFilePath.statusText !== "Created") {
      return res.status(400).json({ message: "Can not insert to database" });
    }
    const data = await supabase
      .from("imagePath")
      .select("*")
      .eq("path", fileUrl);
    const arrangeMapData = sticker.map((value) => {
      return {
        path_id: data.data[0].id,
        sticker_name: "test",
        position_x: `${value.x}`,
        position_y: `${value.y}`,
        size: `${value.size}`,
      };
    });
    const insertSticker = await supabase
      .from("stickerPosition")
      .insert(arrangeMapData)
      .select();
    if (!insertSticker.statusText) {
      return res.status(400).json({ message: "Cannot insert sticker" });
    }
    return res.status(200).json({
      message: "Insert image and sticker successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Invalid" });
  }
});

fileUploadRouter.get("/", async (req, res) => {
  try {
    const count = await supabase
      .from("imagePath")
      .select("id", { count: "exact" });
    const allRows = count.count;
    const dataReturn = await supabase
      .from("imagePath")
      .select("*")
      .range(allRows - 10, allRows);
    if (dataReturn.statusText !== "OK") {
      return res.status(400).json({ message: "Cannot fetch imagePathData" });
    }
    return res.status(200).json({ data: dataReturn.data });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default fileUploadRouter;
