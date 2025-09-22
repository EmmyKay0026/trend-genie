import { Request, Response } from "express";
import { extractSrtFromYouTubeVideo } from "../services/extractSrtFromYouTubeVideo";
import { videoUnderstandingService } from "../services/geminiTextUnderstandingService";
// import { youtubeSubtitleService } from "../services/extract-srt";
import fs from "fs";
import { YoutubeSubtitleService } from "../services/extract-srt";

const repurposeYoutubeVideoPublic = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "YouTube URL is required" });

    try {
      const srt = await YoutubeSubtitleService.getSrt(url as string);
      const geminiResponse = await videoUnderstandingService(srt);
      // console.log(geminiResponse);
      res.status(200).json({
        message: "Video repurposing successful",
        data: geminiResponse,
      });
      // res.header("Content-Type", "text/plain").send(geminiResponse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    // const { videoUrl } = req.body;

    // if (!videoUrl) {
    //   return res.status(400).json({ error: "Video URL is required" });
    // }
    // console.log(`Received video URL: ${videoUrl}`);

    // const srtContent = await extractSrtFromYouTubeVideo(videoUrl);
    // const srtContent = await youtubeSubtitleService.getSrt(videoUrl);

    // console.log(`Extracted SRT content: ${srtContent.substring(0, 100)}...`); // Log first 100 chars for brevity

    // fs.writeFileSync("captions.srt", srtContent, "utf8");

    // if (!srtContent) {
    //   return res.status(500).json({ error: "Failed to extract SRT content" });
    // }

    // Here you would typically call your Gemini AI service to process the SRT content
    // const geminiResponse = await videoUnderstandingService(srtContent);

    // console.log(geminiResponse);
    // fs.writeFileSync("response.txt", geminiResponse, "utf8");

    // Simulate processing and response
    // res.status(200).json({
    //   message: "Video repurposing initiated successfully",
    //   // videoUrl,
    // });
  } catch (error) {
    console.error("Error in repurposeYoutubeVideoPublic:", error);
  }
};

export { repurposeYoutubeVideoPublic };
