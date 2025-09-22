"use strict";
// import { parseStringPromise } from "xml2js";
// import fs from "fs";
// import { exec } from "child_process";
// import { promisify } from "util";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSubtitleService = void 0;
// const execAsync = promisify(exec);
// class YoutubeSubtitleService {
//   private pad(n: number, width = 2) {
//     return n.toString().padStart(width, "0");
//   }
//   private formatTime(seconds: number) {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60);
//     const ms = Math.round((seconds - Math.floor(seconds)) * 1000);
//     return `${this.pad(h)}:${this.pad(m)}:${this.pad(s)},${ms
//       .toString()
//       .padStart(3, "0")}`;
//   }
//   private decodeHtmlEntities(str = "") {
//     return str
//       .replace(/&amp;/g, "&")
//       .replace(/&lt;/g, "<")
//       .replace(/&gt;/g, ">")
//       .replace(/&quot;/g, '"')
//       .replace(/&#39;/g, "'");
//   }
//   private async fetchPlayerResponse(videoId: string) {
//     // Fetch watch page
//     const watchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
//       headers: { "Accept-Language": "en-US,en;q=0.9" },
//     });
//     const html = await watchRes.text();
//     const match = html.match(
//       /ytInitialPlayerResponse\s*=\s*(\{[\s\S]+?\})\s*;/
//     );
//     if (match) {
//       try {
//         return JSON.parse(match[1]);
//       } catch {}
//     }
//     throw new Error("Could not extract player response from YouTube HTML.");
//   }
//   private async vttToSrt(vtt: string) {
//     vtt = vtt.replace(/^\uFEFF/, "").trim();
//     vtt = vtt.replace(/^WEBVTT.*(\r?\n){1,2}/i, "");
//     const blocks = vtt
//       .split(/\r?\n\r?\n/)
//       .map((b) => b.trim())
//       .filter(Boolean);
//     let srt = "";
//     let idx = 1;
//     for (const block of blocks) {
//       const lines = block.split(/\r?\n/).filter(Boolean);
//       const tLineIndex = lines.findIndex((l) => /-->/i.test(l));
//       if (tLineIndex === -1) continue;
//       const timeLine = lines[tLineIndex];
//       const text = lines.slice(tLineIndex + 1).join("\n");
//       const times = timeLine.split("-->").map((s) => s.trim().split(/\s+/)[0]);
//       if (times.length < 2) continue;
//       srt += `${idx}\n${times[0].replace(".", ",")} --> ${times[1].replace(
//         ".",
//         ","
//       )}\n${this.decodeHtmlEntities(text)}\n\n`;
//       idx++;
//     }
//     return srt.trim();
//   }
//   private async timedtextXmlToSrt(xml: string) {
//     const parsed = await parseStringPromise(xml);
//     const texts = parsed?.transcript?.text;
//     if (!texts) return "";
//     const items = Array.isArray(texts) ? texts : [texts];
//     let srt = "";
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       const attrs = item?.$ || {};
//       const start = parseFloat(attrs.start || "0");
//       const dur = parseFloat(attrs.dur || "0");
//       const end = start + dur;
//       const raw = item._ ?? "";
//       const text = this.decodeHtmlEntities(String(raw))
//         .replace(/\s*\n\s*/g, " ")
//         .trim();
//       srt += `${i + 1}\n${this.formatTime(start)} --> ${this.formatTime(
//         end
//       )}\n${text}\n\n`;
//     }
//     return srt.trim();
//   }
//   private async downloadTrack(track: any) {
//     const baseUrl: string = track?.baseUrl;
//     if (!baseUrl) throw new Error("No baseUrl for subtitle track");
//     const tryUrls = [baseUrl + "&fmt=vtt", baseUrl];
//     for (const url of tryUrls) {
//       const res = await fetch(url, { headers: { "Accept-Language": "en-US" } });
//       if (!res.ok) continue;
//       const text = await res.text();
//       if (text.startsWith("WEBVTT")) {
//         return this.vttToSrt(text);
//       }
//       if (text.startsWith("<")) {
//         return this.timedtextXmlToSrt(text);
//       }
//     }
//     throw new Error("Could not fetch or convert subtitle track");
//   }
//   private async ytDlpFallback(videoId: string, lang?: string) {
//     const cmd = `yt-dlp.exe --skip-download --write-auto-sub --sub-lang en --convert-subs srt -o "%(id)s.%(ext)s" "https://www.youtube.com/watch?v=${videoId}"
// `;
//     console.log(`Running command: ${cmd}`);
//     const { stdout, stderr } = await execAsync(cmd);
//     if (stderr && !stdout) throw new Error(stderr);
//     // this.saveSrtToFile(videoId, lang);
//     console.log(`SRT downloaded successfully for video ${videoId}`);
//     return stdout;
//   }
//   public async getSrt(videoId: string, lang = "en") {
//     const cmd = `yt-dlp.exe --skip-download --write-auto-sub --sub-lang ${lang} --convert-subs srt -o "${videoId}.%(ext)s" "https://www.youtube.com/watch?v=${videoId}"`;
//     await execAsync(cmd, { maxBuffer: 1024 * 1024 * 10 }); // 10MB buffer
//     return fs.readFileSync(`${videoId}.srt`, "utf-8");
//   }
//   //   public async getSrt(videoId: string, lang?: string) {
//   //     const player = await this.fetchPlayerResponse(videoId);
//   //     const tracks =
//   //       player?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
//   //     if (!tracks?.length) {
//   //       throw new Error("No captions found for this video");
//   //     }
//   //     let chosen = tracks[0];
//   //     if (lang) {
//   //       chosen =
//   //         tracks.find((t: any) => t.languageCode === lang) ||
//   //         tracks.find((t: any) => String(t.vssId || "").includes(lang)) ||
//   //         chosen;
//   //     }
//   //     try {
//   //       return await this.downloadTrack(chosen);
//   //     } catch (err) {
//   //       console.warn("Direct fetch failed, trying yt-dlp fallback...");
//   //       return await this.ytDlpFallback(videoId, lang);
//   //     }
//   //   }
//   //   public async saveSrtToFile(videoId: string, lang?: string) {
//   //     const srt = await this.getSrt(videoId, lang);
//   //     const fileName = `${videoId}.${lang || "subtitles"}.srt`;
//   //     await fs.writeFile(fileName, srt, "utf-8");
//   //     return fileName;
//   //   }
// }
// export const youtubeSubtitleService = new YoutubeSubtitleService();
// src/services/youtubeSubtitle.service.ts
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class YoutubeSubtitleService {
    static async getSrt(youtubeUrl) {
        const tempDir = path_1.default.join(__dirname, "../../temp");
        if (!fs_1.default.existsSync(tempDir))
            fs_1.default.mkdirSync(tempDir);
        const outputTemplate = path_1.default.join(tempDir, "subtitle");
        const command = `yt-dlp --write-auto-sub --sub-lang en --convert-subs srt --skip-download -o "${outputTemplate}" "${youtubeUrl}"`;
        try {
            await execAsync(command, { maxBuffer: 1024 * 1024 * 10 }); // 10MB buffer
        }
        catch (error) {
            console.error("yt-dlp error:", error);
            throw new Error("Failed to fetch subtitles");
        }
        const srtFilePath = `${outputTemplate}.en.srt`;
        if (!fs_1.default.existsSync(srtFilePath)) {
            throw new Error("Subtitle file not found");
        }
        const srtContent = fs_1.default.readFileSync(srtFilePath, "utf8");
        // Cleanup temp file
        // fs.unlinkSync(srtFilePath);
        return srtContent;
    }
}
exports.YoutubeSubtitleService = YoutubeSubtitleService;
