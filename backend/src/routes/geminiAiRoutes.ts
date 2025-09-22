import { Router } from "express";
import {
  repurposeVideoLinkWithGemini,
  repurposeUploadedVideo,
} from "../controllers/repurposeWithGemini";
import { uploadVideos } from "../controllers/videoUploadController";
import { upload } from "../middleware/multer";

const router: Router = Router();

router.get("/repurpose-with-gemini", repurposeUploadedVideo);
router.post("/upload", upload.array("videos", 5), repurposeUploadedVideo);
// router.post("/v2/repurpose-with-gemini", repurposeVideoLinkWithGemini);

export default router;
