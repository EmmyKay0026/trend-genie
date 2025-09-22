"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadSrt = downloadSrt;
exports.getSubtitles = getSubtitles;
exports.extractSrtFromYouTubeVideo = downloadSRT;
const youtube_transcript_1 = require("youtube-transcript");
// import * as fs from "fs";
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = require("xml2js");
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
// Replace with the public YouTube video URL
// const videoUrl = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";
function formatTime(seconds) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8) + ",000";
}
async function downloadSrt(videoUrl) {
    try {
        // Get transcript (auto or uploaded captions)
        const transcript = await youtube_transcript_1.YoutubeTranscript.fetchTranscript(videoUrl);
        // Convert to .srt format
        let srtContent = "";
        transcript.forEach((item, index) => {
            const startTime = formatTime(item.offset);
            const endTime = formatTime(item.offset + item.duration);
            srtContent += `${index + 1}\n${startTime} --> ${endTime}\n${item.text}\n\n`;
        });
        // Save as .srt file
        console.log("✅ SRT file saved as captions.srt");
        fs_1.default.writeFileSync("captions.srt", srtContent, "utf8");
        return srtContent; // Return the SRT content for further processing
    }
    catch (err) {
        console.error("❌ Failed to fetch transcript:", err);
    }
    return "";
}
async function getSubtitles(videoId, lang = "en") {
    const url = `https://www.youtube.com/api/timedtext?lang=${lang}&v=${videoId}`;
    const res = await (0, node_fetch_1.default)(url);
    console.log(res);
    if (!res.ok) {
        throw new Error(`Failed to fetch captions: ${res.statusText}`);
    }
    const xml = await res.text();
    if (!xml.trim()) {
        throw new Error("No captions found (maybe no subtitles in this language).");
    }
    // Parse XML to JS object
    const result = await (0, xml2js_1.parseStringPromise)(xml);
    const captions = result.transcript.text;
    // Convert to SRT
    let srt = "";
    captions.forEach((caption, index) => {
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
function downloadSRT(videoUrl) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`yt-dlp --write-auto-sub --sub-lang en --convert-subs srt -o "%(title)s.%(ext)s" "${videoUrl}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            console.log(stdout);
            resolve();
            return stdout;
        });
    });
}
