import { YoutubeTranscript } from "youtube-transcript";
// import * as fs from "fs";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import { exec } from "child_process";

// Replace with the public YouTube video URL
// const videoUrl = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";

function formatTime(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8) + ",000";
}

async function downloadSrt(videoUrl: string): Promise<string> {
  try {
    // Get transcript (auto or uploaded captions)
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

    // Convert to .srt format
    let srtContent = "";
    transcript.forEach((item, index) => {
      const startTime = formatTime(item.offset);
      const endTime = formatTime(item.offset + item.duration);
      srtContent += `${index + 1}\n${startTime} --> ${endTime}\n${
        item.text
      }\n\n`;
    });

    // Save as .srt file
    console.log("✅ SRT file saved as captions.srt");
    fs.writeFileSync("captions.srt", srtContent, "utf8");
    return srtContent; // Return the SRT content for further processing
  } catch (err) {
    console.error("❌ Failed to fetch transcript:", err);
  }
  return "";
}

async function getSubtitles(videoId: string, lang: string = "en") {
  const url = `https://www.youtube.com/api/timedtext?lang=${lang}&v=${videoId}`;
  const res = await fetch(url);

  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to fetch captions: ${res.statusText}`);
  }

  const xml = await res.text();
  if (!xml.trim()) {
    throw new Error("No captions found (maybe no subtitles in this language).");
  }

  // Parse XML to JS object
  const result = await parseStringPromise(xml);
  const captions = result.transcript.text;

  // Convert to SRT
  let srt = "";
  captions.forEach((caption: any, index: number) => {
    const start = parseFloat(caption.$.start);
    const dur = parseFloat(caption.$.dur);
    const end = start + dur;

    srt += `${index + 1}\n`;
    srt += `${formatTime(start)} --> ${formatTime(end)}\n`;
    srt += `${caption._.replace(/\n/g, " ")}\n\n`;
  });

  return srt;
}

// const VIDEO_URL = "https://www.youtube.com/watch?v=hVlAOIUA71Y";
// https://m.youtube.com/watch?v=hVlAOIUA71Y
function downloadSRT(videoUrl: string) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `yt-dlp --write-auto-sub --sub-lang en --convert-subs srt -o "%(title)s.%(ext)s" "${videoUrl}"`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(stdout);
        resolve();
        return stdout;
      }
    );
  });
}

// downloadSRT(VIDEO_URL)
//   .then(() => console.log("Subtitle downloaded!"))
//   .catch(console.error);

// Format seconds to SRT timestamp
// function formatTime(seconds: number) {
//   const date = new Date(0);
//   date.setSeconds(seconds);
//   return date.toISOString().substr(11, 12).replace(".", ",");
// }

// Helper: Convert seconds to SRT timestamp format

// downloadSrt();

export { downloadSrt, getSubtitles, downloadSRT as extractSrtFromYouTubeVideo };
