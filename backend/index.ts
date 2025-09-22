import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import videoUploadRoutes from "./src/routes/videoUploadRoutes";
// const videoUploadRoutes = require("./src/routes/videoUploadRoutes");
import authRoutes from "./src/routes/authRoute";
import geminiAiRoutes from "./src/routes/geminiAiRoutes";
import youtubeVideoRepurposingRoute from "./src/routes/youtubeVideoRepurposingRoute";
const uploadRoute = require("./upload");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example route
// app.use("/upload", uploadRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/video", videoUploadRoutes);
// app.use("/api/v1/video", geminiAiRoutes);
// app.use("/api/v1/video-repurpose", geminiAiRoutes);
app.use("/api/v1/repurpose-youtube", youtubeVideoRepurposingRoute);

app.get("/", (_req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
