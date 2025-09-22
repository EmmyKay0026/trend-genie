"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSrt = parseSrt;
exports.generateCandidatesFromCues = generateCandidatesFromCues;
exports.scoreCandidates = scoreCandidates;
exports.prepareTopCandidates = prepareTopCandidates;
exports.secondsToHMS = secondsToHMS;
const STRONG_WORDS = [
    "surprising",
    "must",
    "important",
    "critical",
    "significant",
    "breakthrough",
    "reveal",
    "learn",
    "avoid",
    "why",
    "how",
    "you",
    "must",
    "now",
];
function parseSrt(srt) {
    const cueRegex = /(\d+)\s*\r?\n(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\r?\n([\s\S]*?)(?=\r?\n\r?\n|\r?\n$)/gm;
    const cues = [];
    let m;
    while ((m = cueRegex.exec(srt))) {
        const start = timestampToSeconds(m[2]);
        const end = timestampToSeconds(m[3]);
        const text = m[4].replace(/\r?\n/g, " ").trim();
        cues.push({ start, end, text });
    }
    return cues;
}
function timestampToSeconds(ts) {
    // "HH:MM:SS,mmm"
    const [h, m, rest] = ts.split(":");
    const [s, ms] = rest.split(",");
    return (parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000);
}
function secondsToHMS(sec) {
    const s = Math.max(0, Math.floor(sec));
    const hh = Math.floor(s / 3600)
        .toString()
        .padStart(2, "0");
    const mm = Math.floor((s % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}
/**
 * Merge short cues into candidate clips that are more "watchable".
 * minSeconds: minimum clip duration to aim for (e.g. 8)
 * maxSeconds: maximum clip duration to cap (e.g. 30)
 */
function generateCandidatesFromCues(cues, minSeconds = 8, maxSeconds = 30) {
    const candidates = [];
    let i = 0, id = 0;
    while (i < cues.length) {
        let start = cues[i].start;
        let end = cues[i].end;
        let parts = [cues[i].text];
        i++;
        while (i < cues.length) {
            // accumulate until we reach minSeconds OR we hit punctuation AND > 3s
            const nextEnd = cues[i].end;
            const duration = nextEnd - start;
            const combinedText = parts.join(" ") + " " + cues[i].text;
            const endsWithSentence = /[.?!]["']?$/.test(cues[i].text.trim());
            if (duration >= minSeconds && endsWithSentence) {
                end = nextEnd;
                parts.push(cues[i].text);
                i++;
                break;
            }
            if (duration >= maxSeconds) {
                end = nextEnd;
                parts.push(cues[i].text);
                i++;
                break;
            }
            // otherwise add and continue
            end = nextEnd;
            parts.push(cues[i].text);
            i++;
        }
        const text = parts.join(" ").replace(/\s+/g, " ").trim();
        candidates.push({ id: id++, start, end, text });
    }
    return candidates;
}
/** Cheap scoring heuristic to reduce candidates before LLM:
 * length, punctuation, presence of "strong" words, question rate.
 */
function scoreCandidates(candidates) {
    for (const c of candidates) {
        let score = 0;
        score += Math.min(200, c.text.length); // longer => more content
        score += (c.text.match(/[.?!]/g) || []).length * 15; // sentence boundaries matter
        score += (c.text.match(/\?/g) || []).length * 12; // questions often engage
        for (const w of STRONG_WORDS)
            if (c.text.toLowerCase().includes(w))
                score += 40;
        c.score = score;
    }
    return candidates.sort((a, b) => (b.score || 0) - (a.score || 0));
}
/** Keep topK and add padding to start/end (clamped at zero) */
function prepareTopCandidates(candidates, topK = 30, padStart = 0.6, padEnd = 0.8) {
    const top = candidates.slice(0, topK).map((c) => ({
        id: c.id,
        start: Math.max(0, c.start - padStart),
        end: c.end + padEnd,
        text: c.text,
    }));
    return top;
}
