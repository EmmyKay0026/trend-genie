"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const youtubeVideoRepurposingController_1 = require("../controllers/youtubeVideoRepurposingController");
const router = (0, express_1.Router)();
router.get("/public", youtubeVideoRepurposingController_1.repurposeYoutubeVideoPublic);
exports.default = router;
