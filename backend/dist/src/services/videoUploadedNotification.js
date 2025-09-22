"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploadedNotification = void 0;
const videoUploadedNotification = async (req, res) => {
    const hookType = req.body?.Type;
    const upload = req.body?.Event?.Upload;
    // console.log("first", req.body);
    // console.log("📨 Hook Type:", hookType);
    if (hookType !== "post-finish") {
        return res.status(200).json({ message: "Ignored non-post-finish hook" });
    }
    // console.log(upload);
    // console.log("second", req.body);
    if (!upload)
        return res.status(400).json({ error: "Missing Upload info" });
    const videoUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${upload.ID}`;
    // console.log("📹 Video URL:", videoUrl);
    // console.log("✅ Upload received:", upload.MetaData.filename);
    // console.log("✅ Upload received:", upload);
    // console.log("✅ Upload received:", upload.MetaData);
    // Simulate DB insert + job queue trigger here
    const videoRecord = {
        filename: upload.MetaData.filename,
        userId: upload.MetaData.user_id,
        token: upload.MetaData.token,
        size: upload.Size,
        uploadPath: upload.ID,
        videoUrl,
        status: "uploaded",
        createdAt: new Date(),
    };
    // TODO: Add to MongoDB and queue for Gemini processing
    // console.log("📦 Stored video upload:", upload);
    // res.status(200).json({ message: "Received and queued" });
    return videoRecord;
};
exports.videoUploadedNotification = videoUploadedNotification;
