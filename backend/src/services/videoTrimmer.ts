// import { Readable } from "stream";
// import ffmpeg from "fluent-ffmpeg";
// import { getSupabaseClientWithToken } from "../config/supabaseClient";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import path from "path";

// const supaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";

// /**
//  * Convert a Buffer into a Readable stream
//  */
// function bufferToStream(buffer: Buffer): Readable {
//   const stream = new Readable();
//   stream.push(buffer);
//   stream.push(null);
//   return stream;
// }

// /**
//  * Compute the duration between two timestamps ("HH:MM:SS")
//  */
// // function timeDiff(start: string, end: string): number {
// //   const toSec = (t: string): number => {
// //     const [h, m, s] = t.split(":").map(Number);
// //     return h * 3600 + m * 60 + s;
// //   };
// //   return toSec(end) - toSec(start);
// // }

// function timeDiff(start: string, end: string): number {
//   const toSec = (t: string): number => {
//     // Handle formats: HH:MM:SS, MM:SS, or SS
//     const parts = t.split(":").map(Number);

//     if (parts.some(isNaN)) {
//       throw new Error(`Invalid timestamp format: ${t}`);
//     }

//     if (parts.length === 3) {
//       // HH:MM:SS
//       return parts[0] * 3600 + parts[1] * 60 + parts[2];
//     } else if (parts.length === 2) {
//       // MM:SS
//       return parts[0] * 60 + parts[1];
//     } else if (parts.length === 1) {
//       // SS
//       return parts[0];
//     }

//     throw new Error(`Unsupported timestamp format: ${t}`);
//   };

//   return toSec(end) - toSec(start);
// }

// export const trimFromBuffer = async (
//   videoBuffer: Buffer,
//   token: string,
//   aiResponse: any[]
// ) => {
//   const supabase = getSupabaseClientWithToken(token);
//   const outputUrls: string[] = [];

//   for (const segment of aiResponse) {
//     const inputStream = bufferToStream(videoBuffer);
//     const outputChunks: Buffer[] = [];
//     const { start, end } = segment;
//     const duration = timeDiff(start, end);
//     let fileName = `clip_${start.replace(/:/g, "-")}_to_${end.replace(
//       /:/g,
//       "-"
//     )}.mp4`;
//     console.log(fileName);

//     const url = await new Promise<string>((resolve, reject) => {
//       const ff = ffmpeg(inputStream)
//         .inputFormat("mp4") // tell ffmpeg the input format
//         .setStartTime(start)
//         .setDuration(duration)
//         .outputOptions(["-c:v", "libx264", "-c:a", "aac"])
//         .format("mp4")
//         .output("pipe:1") // tell ffmpeg to write to stdout
//         .on("error", (err) => reject(err))
//         .on("end", async () => {
//           try {
//             const finalBuffer = Buffer.concat(outputChunks);

//             // Upload to Supabase
//             const { error } = await supabase.storage
//               .from(supaBaseBucket)
//               .upload(fileName, finalBuffer, {
//                 contentType: "video/mp4",
//                 upsert: true,
//               });

//             if (error) return reject(error);

//             // Get public URL
//             const { data: publicUrl } = supabase.storage
//               .from(supaBaseBucket)
//               .getPublicUrl(fileName);

//             resolve(publicUrl.publicUrl);
//           } catch (err) {
//             reject(err);
//           }
//         });
//       // Pipe ffmpeg output into memory
//       const stream = ff.pipe();
//       stream.on("data", (chunk: Buffer) => outputChunks.push(chunk));
//       stream.on("error", (err) => reject(err));
//     });

//     // Push to the array of output URLs
//     outputUrls.push(url);
//   }

//   return outputUrls;
// };

// /**
//  * Trim a video buffer between start and end timestamps.
//  * Returns a Buffer containing the clipped video.
//  */
// // export async function trimFromBuffer(
// //   inputStream: Readable,
// //   start: string, // "HH:MM:SS"
// //   end: string // "HH:MM:SS"
// // ): Promise<Buffer> {
// // //   const inputStream = bufferToStream(videoBuffer);
// // //   const outputChunks: Buffer[] = [];

// //   return new Promise<Buffer>((resolve, reject) => {
// //     const duration = timeDiff(start, end);

// //     const ff = ffmpeg(inputStream)
// //       .inputFormat("mp4") // tell ffmpeg the input format
// //       .setStartTime(start)
// //       .setDuration(duration)
// //       .outputOptions("-c:v libx264 -c:a aac") // re-encode for accuracy
// //       .format("mp4") // ensure mp4 output
// //       .on("error", (err) => reject(err))
// //       .on("end", () => {
// //         const finalBuffer = Buffer.concat(outputChunks);
// //         resolve(finalBuffer);
// //       });

// //     // Pipe ffmpeg output into memory
// //     const stream = ff.pipe();
// //     stream.on("data", (chunk: Buffer) => outputChunks.push(chunk));
// //     stream.on("error", (err) => reject(err));
// //   });
// // }

// // Alternative: trim and upload in one step

// // const __dirname = path.dirname(fileURLToPath(require(meta.url)));

// // async function trimFromVideoPath(
// //   videoBuffer: Buffer,
// //   start: string,
// //   end: string
// // ) {
// //   const inputPath = path.join("/tmp", `input_${Date.now()}.mp4`);
// //   const outputPath = path.join("/tmp", `clip_${Date.now()}.mp4`);

// //   // Write buffer to a temp file
// //   fs.writeFileSync(inputPath, videoBuffer);

// //   await new Promise((resolve, reject) => {
// //     ffmpeg(inputPath)
// //       .setStartTime(start) // e.g. "00:00:05"
// //       .setDuration(timeDiff(start, end)) // seconds
// //       .outputOptions("-c:v libx264 -c:a aac")
// //       .save(outputPath)
// //       .on("end", resolve)
// //       .on("error", reject);
// //   });

// //   const clipBuffer = fs.readFileSync(outputPath);

// //   // cleanup
// //   fs.unlinkSync(inputPath);
// //   fs.unlinkSync(outputPath);

// //   return clipBuffer; // returns buffer of clipped video
// // }

// // function timeDiff(start, end) {
// //   const toSec = (t) => {
// //     const [h, m, s] = t.split(":").map(Number);
// //     return h * 3600 + m * 60 + s;
// //   };
// //   return toSec(end) - toSec(start);
// // }

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const unlinkAsync = promisify(fs.unlink);
const supaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";

interface Segment {
  start: string; // "HH:MM:SS" or "MM:SS"
  end: string;
  title: string;
  reason: string;
}

function timeDiff(start: string, end: string): number {
  const toSec = (t: string): number => {
    const parts = t.split(":").map(Number);
    if (parts.length === 2) {
      const [m, s] = parts;
      return m * 60 + s;
    }
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  };
  return toSec(end) - toSec(start);
}
function sanitizeFileName(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]+/g, "") // remove illegal chars
    .replace(/\s+/g, "_") // replace spaces with underscores
    .toLowerCase();
}

/**
 * Trim video by writing to temp files, upload to Supabase, and return metadata + URLs
 */
export async function trimAndUploadSegments(
  supabase: SupabaseClient,
  videoBuffer: Buffer,
  segments: Segment[]
) {
  const output: Array<Segment & { url: string }> = [];

  // Save the original file to temp
  const inputPath = path.join(__dirname, `input_${Date.now()}.mp4`);
  fs.writeFileSync(inputPath, videoBuffer);

  try {
    for (const seg of segments) {
      const duration = timeDiff(seg.start, seg.end);
      let fileName = `clip_${seg.title.toLowerCase().replace(/:/g, "-")}.mp4`;
      const clipName = sanitizeFileName(fileName);
      const outputPath = path.join(__dirname, clipName);

      // Run ffmpeg trim command
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .setStartTime(seg.start)
          .setDuration(duration)
          .outputOptions([
            "-c:v",
            "libx264",
            "-c:a",
            "aac",
            "-vf",
            "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2",
          ])
          .output(outputPath)
          .on("end", () => resolve())
          .on("error", (err) => reject(err))
          .run();
      });

      // Upload to Supabase
      const fileBuffer = fs.readFileSync(outputPath);
      const { error } = await supabase.storage
        .from(supaBaseBucket)
        .upload(clipName, fileBuffer, {
          contentType: "video/mp4",
          upsert: true,
        });

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from(supaBaseBucket)
        .getPublicUrl(clipName);

      output.push({
        ...seg,
        url: publicUrl.publicUrl,
      });

      // cleanup temp clip
      await unlinkAsync(outputPath);
    }
  } finally {
    // cleanup input file
    await unlinkAsync(inputPath);
  }

  return output;
}
