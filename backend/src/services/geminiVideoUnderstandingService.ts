import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import geminiAi from "../config/geminiConfig";
import * as fs from "node:fs";

// const base64VideoFile = fs.readFileSync("path/to/small-sample.mp4", {
//   encoding: "base64",
// });

const videoLinkUnderstandingService = async (
  videoLink: string,
  mimeType: string
) => {
  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash", // Using 1.5 Flash is often better for video
    contents: [
      {
        role: "user",
        parts: [
          // This is the key change: create the part from the buffer
          {
            fileData: {
              mimeType: "video/mp4",
              fileUri: videoLink,
            },
          },
          // Your prompt text follows
          {
            text: `Analyze this video and extract its most impactful, informative, or thought-provoking moments. Break it down into short, high-quality video clips (30 to 90 seconds each) that can be used individually as highlight reels for LinkedIn.

Each clip should:

Showcase a clear key insight, lesson, or moment of value.

Start and end smoothly, avoiding awkward cuts.

Be engaging and suitable for a professional audience.

Include a short title or caption idea that can accompany the clip on LinkedIn.

Return the following for each clip:
Start time & end time in the original video
Short title
1–2 sentence summarizing the why this clip is important

Ensure the response contains only the JSON array and no other text!!!

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
          ]`,
          },
        ],
      },
    ],
  });

  // console.log(response?.candidates![0].content);

  // Attempt to extract JSON from the response text
  let jsonResponse;
  try {
    // Use a regular expression to extract the JSON array from the response text
    const match = response?.text?.match(/\[[\s\S]*\]/);
    if (match) {
      jsonResponse = JSON.parse(match[0]);
      return jsonResponse;
    } else {
      throw new Error("No JSON array found in response text.");
    }
  } catch (err) {
    console.error("Failed to parse JSON from Gemini response:", err);
    return { error: "Failed to parse Gemini response." };
  }
};

const videoBufferUnderstandingService = async (
  videoLink: Buffer,
  mimeType: string
) => {
  // console.log(videoLink, mimeType);

  // "Assume you a video editor and professional social media manager, from the video, come up with multiple 30-second reels for linkedin. Include the most important parts of the video and add reasons why each part is important",
  //   const response = await geminiAi.models.generateContent({
  //     model: "gemini-2.0-flash",
  //     contents: createUserContent([
  //       createPartFromUri(videoLink, "video/mp4"),
  //       `Analyze this video and extract its most impactful, informative, or thought-provoking moments. Break it down into short, high-quality video clips (30 to 90 seconds each) that can be used individually as highlight reels for LinkedIn.

  // Each clip should:

  // Showcase a clear key insight, lesson, or moment of value.

  // Start and end smoothly, avoiding awkward cuts.

  // Be engaging and suitable for a professional audience.

  // Include a short title or caption idea that can accompany the clip on LinkedIn.

  // Return the following for each clip:
  // Start time & end time in the original video
  // Short title
  // 1–2 sentence summarizing the why this clip is important

  // Ensure the response contains only the JSON array and no other text!!!

  // For each clip, return only this JSON structure without any additional text:
  // [
  //   {
  //     "start": "HH:MM:SS",
  //     "end": "HH:MM:SS",
  //     "title": "Short, compelling title",
  //     "reason": "1–2 sentence summarizing the why this clip is important"
  //     "caption": "Give a short caption that can be used on LinkedIn"
  //     "hashtags": ["#example", "#hashtags"]

  //   }
  // ]
  // `,
  //     ]),
  //   });

  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash", // Using 1.5 Flash is often better for video
    contents: [
      {
        role: "user",
        parts: [
          // This is the key change: create the part from the buffer
          {
            inlineData: {
              data: videoLink.toString("base64"), // Convert buffer to base64 string
              mimeType: mimeType,
            },
          },
          // Your prompt text follows
          {
            text: `Analyze this video and extract its most impactful, informative, or thought-provoking moments. Break it down into short, high-quality video clips (30 to 90 seconds each) that can be used individually as highlight reels for LinkedIn.

Each clip should:

Showcase a clear key insight, lesson, or moment of value.

Start and end smoothly, avoiding awkward cuts.

Be engaging and suitable for a professional audience.

Include a short title or caption idea that can accompany the clip on LinkedIn.

Return the following for each clip:
Start time & end time in the original video
Short title
1–2 sentence summarizing the why this clip is important

Ensure the response contains only the JSON array and no other text!!!

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
          ]`,
          },
        ],
      },
    ],
  });

  // console.log(response?.candidates![0].content);

  // Attempt to extract JSON from the response text
  let jsonResponse;
  try {
    // Use a regular expression to extract the JSON array from the response text
    const match = response?.text?.match(/\[[\s\S]*\]/);
    if (match) {
      jsonResponse = JSON.parse(match[0]);
      return jsonResponse;
    } else {
      throw new Error("No JSON array found in response text.");
    }
  } catch (err) {
    console.error("Failed to parse JSON from Gemini response:", err);
    return { error: "Failed to parse Gemini response." };
  }
};

const videoUnderstandingService = async (file: any) => {
  const contents = [
    {
      inlineData: {
        mimeType: "video/mp4",
        data: file,
      },
    },
    {
      text: `Analyze this video and extract its most impactful, informative, or thought-provoking moments. Break it down into short, high-quality video clips (30 to 90 seconds each) that can be used individually as highlight reels.

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
    "reason": "1–2 sentence summarizing the why this clip is important"
  }
]
`,
    },
  ];
  try {
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    console.log(response.text);
    return JSON.parse(response.text!);
  } catch (error) {
    throw new Error(`Gemini API error: ${error}`);
  }
};

export {
  videoUnderstandingService,
  videoLinkUnderstandingService,
  videoBufferUnderstandingService,
};

//use this if you are uploading a video file directly from the local system
// const myfile = await geminiAi.files.upload({
//   file: "../video.mp4",
//   config: { mimeType: "video/mp4" },
// });

// // Ensure myfile has a valid name property
// if (!myfile.name) {
//   myfile.name = "video1.mp4";
// }

// // console.log(myfile.file);
// console.log("Upload complete. Waiting for file to become ACTIVE...");

// // Wait for file to become ACTIVE
// let status;
// let retries = 20;

// while (retries-- > 0) {
//   const fileStatus = await geminiAi.files.get({ name: myfile.name });
//   status = fileStatus.state;
//   if (status === "ACTIVE") break;

//   console.log(`Current file state: ${status}, retrying...`);
//   await new Promise((res) => setTimeout(res, 3000)); // wait 1 second
// }

// if (status !== "ACTIVE") {
//   throw new Error("File did not become ACTIVE in time.");
// }

// console.log("File is ACTIVE. Proceeding to generate content...");
