import { Router } from "express";
import { repurposeYoutubeVideoPublic } from "../controllers/youtubeVideoRepurposingController";

const router: Router = Router();

router.get("/public", repurposeYoutubeVideoPublic);

export default router;
