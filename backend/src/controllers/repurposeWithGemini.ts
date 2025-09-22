import { Request, Response } from "express";
import { createPartFromUri, createUserContent } from "@google/genai";
import geminiAi from "../config/geminiConfig";
import { videoLinkUnderstandingService } from "../services/geminiVideoUnderstandingService";
import { supabase } from "../config/supabaseClient";
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// userid:dada53c0-f439-4393-a935-a49a436914d4

const repurposeUploadedVideo = async (
  res: Response,
  req: Request
): Promise<any> => {
  // console.log("Uploading...");

  let { data, error } = await supabase
    .from("Content Suite Videos")
    .select("source_link");

  const videoUrl = req.body.videoLink?.uri; // Assuming videoLink is an object with uri and mimeType

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing videoUrl in request body." });
  }

  // const aiRes = videoLinkUnderstandingService(videoUrl);

  // const videoUrl =
  //   "https://cxxdecxctvjbuczkizqz.supabase.co/storage/v1/object/public/videos/mp4.1745319840611"; // Replace with your video URL
  // const localFilePath = path.resolve(__dirname, "../vido1.mp4");

  // Send to frontend
  // return res.status(200).json({ aiRes });
};

const repurposeVideoLinkWithGemini = async (
  req: Request,
  res: Response,
  videoUrl: string
): Promise<any> => {
  try {
    // const videoUrl = req.body.videoUrl;

    if (!videoUrl) {
      return res
        .status(400)
        .json({ error: "Missing videoUrl in request body." });
    }

    // Use the video URL directly with createPartFromUri
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(videoUrl, "video/mp4"),
        `Analyze this video and extract its most impactful, informative, or thought-provoking moments. Break it down into short, high-quality video clips (30 to 90 seconds each) that can be used individually as highlight reels for LinkedIn.

Each clip should:

Showcase a clear key insight, lesson, or moment of value.

Start and end smoothly, avoiding awkward cuts.

Be engaging and suitable for a professional audience.

Include a short title or caption idea that can accompany the clip on LinkedIn.

Return the following for each clip:
Start time & end time in the original video
Short title
1–2 sentence summarizing the why this clip is important

For each clip, return only this JSON structure without any additional text:
[
  {
    "start": "HH:MM:SS",
    "end": "HH:MM:SS",
    "title": "Short, compelling title",
    "reason": "1–2 sentence summarizing the why this clip is important",
    "caption": "Give a short caption that can be used on LinkedIn",
    "hashtags": ["#example", "#hashtags"]
  }
]
`,
      ]),
    });

    // Attempt to extract JSON from the response text
    let json;
    try {
      const match = response?.text?.match(/\[[\s\S]*\]/);
      if (match) {
        json = JSON.parse(match[0]);
      } else {
        throw new Error("No JSON array found in response text.");
      }
    } catch (err) {
      console.error("Failed to parse JSON from Gemini response:", err);
      return res
        .status(500)
        .json({ error: "Failed to parse Gemini response." });
    }
    return json;
    // return res.status(200).json({ json });
  } catch (error) {
    console.error("Error in repurposeVideoLinkWithGemini:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { repurposeUploadedVideo, repurposeVideoLinkWithGemini };
