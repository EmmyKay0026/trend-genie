import { Router } from "express";
import { upload } from "../middleware/multer";
import {
  addVideoDataToDB,
  uploadVideos,
} from "../controllers/videoUploadController";
import { videoUploadedNotification } from "../services/videoUploadedNotification";
// const upload = require("../middleware/multer");
// const { uploadVideos } = require("../controllers/uploadController");

const router: Router = Router();
// /upload-multiple

// router.get("/:videoId");

router.post("/upload", upload.array("videos", 5), uploadVideos); // max 5 videos per request

router.post("/notify", addVideoDataToDB); // Endpoint to handle notifications from tusd

export default router;
