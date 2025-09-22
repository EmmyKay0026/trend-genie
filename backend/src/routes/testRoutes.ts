import { Router } from "express";
import { getVideos } from "../controllers/testController";

const router: Router = Router();

router.get("/videos", getVideos);

export default router;
