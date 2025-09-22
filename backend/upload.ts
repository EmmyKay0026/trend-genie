import { supabase } from "./src/config/supabaseClient";
import dotenv from "dotenv";
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const supaaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";
dotenv.config();
// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (
    req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: string) => void
  ) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.single("video"),
  async (
    req: { file: any; headers: { [x: string]: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error?: any; insertError?: any }): any; new (): any };
      };
      json: (arg0: { message: string; path: any }) => void;
    }
  ) => {
    const file = req.file;
    const userId = req.headers["x-user-id"]; // or use auth token for real auth

    if (!file || !userId) {
      return res.status(400).json({ error: "Missing file or user ID" });
    }

    const filePath = path.join(__dirname, file.path);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(supaaBaseBucket)
      .upload(`user-${userId}/${file.filename}`, fs.readFileSync(filePath), {
        contentType: file.mimetype,
      });

    if (error) return res.status(500).json({ error });

    // Optional: Save to database
    const { error: insertError } = await supabase
      .from("Content Suite Videos")
      .insert([
        {
          title: file.originalname,
          upload_path: data.path,
          user_id: userId,
          status: "uploaded",
        },
      ]);

    if (insertError) return res.status(500).json({ insertError });

    // Clean up temp file
    fs.unlinkSync(filePath);

    res.json({ message: "Upload successful", path: data.path });
  }
);

module.exports = router;
