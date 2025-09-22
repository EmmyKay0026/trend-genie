"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const videoUploadRoutes_1 = __importDefault(require("./src/routes/videoUploadRoutes"));
// const videoUploadRoutes = require("./src/routes/videoUploadRoutes");
const authRoute_1 = __importDefault(require("./src/routes/authRoute"));
const youtubeVideoRepurposingRoute_1 = __importDefault(require("./src/routes/youtubeVideoRepurposingRoute"));
// const uploadRoute = require("./upload");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Example route
// app.use("/upload", uploadRoute);
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/video", videoUploadRoutes_1.default);
// app.use("/api/v1/video", geminiAiRoutes);
// app.use("/api/v1/video-repurpose", geminiAiRoutes);
app.use("/api/v1/repurpose-youtube", youtubeVideoRepurposingRoute_1.default);
app.get("/", (_req, res) => {
    res.send("Backend is working!");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
