import { GoogleGenAI } from "@google/genai";
import geminiAi from "../config/geminiConfig";
import * as fs from "node:fs";
import {
  parseSrt,
  generateCandidatesFromCues,
  scoreCandidates,
  prepareTopCandidates,
  secondsToHMS,
} from "../lib/set-processor";

// const base64VideoFile = fs.readFileSync("path/to/small-sample.mp4", {
//   encoding: "base64",
// });

// import {
//   parseSrt,
//   generateCandidatesFromCues,
//   scoreCandidates,
//   prepareTopCandidates,
//   secondsToHMS,
// } from "../lib/srt-processor";

async function videoUnderstandingService(srtText: string) {
  // 1. parse
  const cues = parseSrt(srtText);

  // 2. generate merged candidates
  const candidates = generateCandidatesFromCues(cues, 8, 25);

  // 3. score & reduce
  const scored = scoreCandidates(candidates);
  const top = prepareTopCandidates(scored, 30, 0.6, 0.8); // 30 best candidates

  // 4. prepare structured prompt payload (pass only candidates, not raw SRT)
  const payload = {
    instructions: `You will be given candidate clips extracted from a transcript. 
    For each candidate, you must decide which ones are the best clips to turn into short highlight reels for LinkedIn.
    Use only the provided start/end timestamps. Do NOT invent or change timestamps.
    Return a JSON array of up to 10 clips with fields: start ("HH:MM:SS"), end ("HH:MM:SS"), title (short), reason (1-2 sentences). 
    Titles <= 7 words. Reasons <= 2 sentences. Only return JSON array, nothing else.`,
    candidates: top.map((c: any) => ({
      id: c.id,
      start: secondsToHMS(c.start),
      end: secondsToHMS(c.end),
      text: c.text,
    })),
    constraints: {
      max_clips: 10,
      min_clip_sec: 6,
      max_clip_sec: 30,
    },
  };

  // 5. call your LLM (Gemini) with a compact representation
  const contents = [{ text: JSON.stringify(payload) }];

  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });
  console.log(response.text);

  // Parse the result - may need robust JSON extraction
  const jsonText = response.text!;
  // attempt to parse directly
  try {
    return JSON.parse(jsonText);
  } catch (e) {
    // fallback: extract JSON block with regex
    // Remove the 's' (dotAll) flag for compatibility with older targets
    const m = jsonText.match(/(\[.*\])/);
    if (!m) throw new Error("Could not parse JSON from model response");
    return JSON.parse(m[1]);
  }
}

const videoUnderstandingServices = async (srt: any) => {
  console.log(srt);

  const contents = [
    {
      text: `The srt file below is from a video. Analyze the whole file and extract its most impactful, informative, or thought-provoking moments that will go viral. Break it down into short each that can be used individually as highlight reels.

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

Here is the srt file content:${srt}
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

export { videoUnderstandingService };
