"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../middleware/multer");
const videoUploadController_1 = require("../controllers/videoUploadController");
// const upload = require("../middleware/multer");
// const { uploadVideos } = require("../controllers/uploadController");
const router = (0, express_1.Router)();
// /upload-multiple
// router.get("/:videoId");
router.post("/upload", multer_1.upload.array("videos", 5), videoUploadController_1.uploadVideos); // max 5 videos per request
router.post("/notify", videoUploadController_1.addVideoDataToDB); // Endpoint to handle notifications from tusd
exports.default = router;
