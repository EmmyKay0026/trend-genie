"use strict";
// import { Request, Response } from "express";
// import { getSupabaseClientWithToken } from "../config/supabaseClient";
// import { getUserFromToken } from "../middleware/tokenVerifier";
// const fs = require("fs");
// const path = require("path");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploadedNotification = exports.addVideoDataToDB = exports.uploadVideos = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const tokenVerifier_1 = require("../middleware/tokenVerifier");
const fs = require("fs");
const path = require("path");
const geminiVideoUnderstandingService_1 = require("../services/geminiVideoUnderstandingService");
const videoUploadedNotification_1 = require("../services/videoUploadedNotification");
Object.defineProperty(exports, "videoUploadedNotification", { enumerable: true, get: function () { return videoUploadedNotification_1.videoUploadedNotification; } });
const signS3URL_1 = __importDefault(require("../lib/signS3URL"));
const videoTrimmer_1 = require("../services/videoTrimmer");
// import { trimFromBuffer } from "../services/videoTrimmer";
const supaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";
const uploadVideos = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Missing token" });
    const token = authHeader.split(" ")[1];
    const supabase = (0, supabaseClient_1.getSupabaseClientWithToken)(token);
    const user = await (0, tokenVerifier_1.getUserFromToken)(token);
    const userId = user.id;
    const files = req.files;
    let aiResponse;
    let videoMetadata;
    if (!files || !userId) {
        return res.status(400).json({ error: "Missing files or user ID" });
    }
    // ai start
    // const form = new FormData();
    // form.append("file", file.buffer, file.originalname);
    // const aiRes = await axios.post("http://localhost:8000/extract", form, {
    //   headers: form.getHeaders(),
    // });
    const responses = [];
    for (const file of files) {
        const fileName = `${Date.now()}_${file.originalname}`;
        // console.log("Sending to AI service...");
        // const aiRes = await videoUnderstandingService(req.files[0].buffer);
        // const aiText = aiRes;
        // console.log("AI Response:", aiText);
        // // ai end
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(supaBaseBucket)
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });
        // Get public URL if upload succeeded
        let publicUrl = undefined;
        if (data && data.path && !error) {
            const { data: publicData } = supabase.storage
                .from(supaBaseBucket)
                .getPublicUrl(data.path);
            publicUrl = publicData?.publicUrl;
        }
        if (error) {
            responses.push({ file: file.originalname, error });
            // continue;
        }
        // Insert metadata into DB
        const { data: metadata, error: insertError } = await supabase
            .from("Content Suite Videos")
            .insert([
            {
                title: file.originalname,
                upload_path: data?.path,
                user_id: userId,
                status: "uploaded",
                source_link: publicUrl,
            },
        ])
            .select();
        if (insertError) {
            responses.push({ file: file.originalname, error: insertError });
        }
        else {
            responses.push({
                id: metadata && metadata.length > 0 ? metadata[0].id : undefined,
                fileType: file.mimeType,
                file: file.originalname,
                path: data?.path,
            });
        }
        // console.log(file);
        if (metadata && metadata.length > 0) {
            // console.log("MetaData:", metadata);
            // console.log(metadata[0].source_link);
            aiResponse = await (0, geminiVideoUnderstandingService_1.videoBufferUnderstandingService)(file.buffer, // Use the buffer
            file.mimetype // Use the correct property 'mimetype'
            );
            // console.log(JSON.stringify(aiResponse));
            //       {
            //   "start": "00:40",
            //   "end": "01:02",
            //   "title": "What is the black box effect?",
            //   "reason": "This clip clearly defines the Black Box Effect using a simple diagram, which is crucial for viewers to understand the rest of the video. Understanding this concept is key for unlocking faster skill development."
            // }
            // const outputResponses = await trimFromBuffer(
            //   file.buffer,
            //   token,
            //   aiResponse
            // );
            const outputResponses = await (0, videoTrimmer_1.trimAndUploadSegments)(supabase, file.buffer, aiResponse);
            aiResponse = outputResponses;
            // Add new properties dynamically to videoMetadata
            videoMetadata =
                metadata && metadata.length > 0 ? metadata[0].id : undefined;
            // videoMetadata = {
            //   ...videoMetadata,
            //   [file.originalname]: {
            //     aiResponse,
            //     publicUrl,
            //     segments: outputResponses,
            //   },
            // };
            const { data: repurposedData, error: repurposeError } = await supabase
                .from("Content Suite repurposed_assets")
                .insert([
                {
                    caption: JSON.stringify(aiResponse),
                    asset_url: publicUrl,
                    type: "type",
                    user_id: userId,
                    video_id: metadata && metadata.length > 0 ? metadata[0].id : undefined,
                },
            ])
                .select();
            videoMetadata =
                repurposedData && repurposedData.length > 0
                    ? repurposedData[0].id
                    : undefined;
            if (repurposeError) {
                console.error("Error inserting repurposed metadata:", repurposeError);
            }
            else {
                console.log("Repurposed Metadata inserted successfully:", repurposedData);
            }
            // console.log(outputResponses);
            // for (const resp of aiResponse) {
            //   const outputResponse = trimFromBuffer(
            //     file.buffer,
            //     resp.start,
            //     resp.end
            //   );
            // }
        }
    }
    // metadata && metadata.length > 0 ? metadata[0].id : undefined,
    res.status(201).json({ aiResponse: aiResponse, videoDetails: videoMetadata });
};
exports.uploadVideos = uploadVideos;
const addVideoDataToDB = async (req, res) => {
    // console.log("Here");
    const videoS3Data = await (0, videoUploadedNotification_1.videoUploadedNotification)(req, res);
    if (!videoS3Data) {
        return res.status(400).json({ error: "Missing video data" });
    }
    // const authHeader = videoS3Data.token;
    // console.log(req.headers);
    // if (!authHeader) return res.status(401).json({ error: "Missing token" });
    // const token = authHeader.split(" ")[1];
    const supabase = (0, supabaseClient_1.getSupabaseClientWithToken)(videoS3Data.token);
    const user = await (0, tokenVerifier_1.getUserFromToken)(videoS3Data.token);
    const userId = user.id;
    console.log("Video data", videoS3Data);
    const responses = [];
    // Insert metadata into DB
    const { data, error: insertError } = await supabase
        .from("Content Suite Videos")
        .insert([
        {
            title: videoS3Data?.filename,
            source_link: videoS3Data?.videoUrl,
            upload_path: videoS3Data?.uploadPath,
            user_id: userId,
            status: "uploaded",
        },
    ])
        .select(); // This will return the inserted row(s)
    if (insertError) {
        responses.push({ file: videoS3Data?.filename, error: insertError });
    }
    else {
        console.log(videoS3Data);
        responses.push({ file: videoS3Data?.filename });
    }
    console.log(responses);
    const videoKey = videoS3Data?.uploadPath.split("+")[0];
    console.log(videoKey);
    const signedUrl = await (0, signS3URL_1.default)(`uploads/${videoKey}`);
    const aiResponse = await (0, geminiVideoUnderstandingService_1.videoLinkUnderstandingService)(signedUrl, "video/mp4");
    console.log("AI response:", aiResponse);
    // const videoRes = await repurposeVideoLinkWithGemini(
    //   req,
    //   res,
    //   signedUrl
    //   // videoS3Data?.videoUrl
    // );
    res.status(200).json({
        id: data && data.length > 0 ? data[0].id : undefined,
        sourcelink: videoS3Data?.videoUrl,
        title: videoS3Data?.filename,
        status: "uploaded",
        user_id: userId,
        // AIVideoRes: videoRes,
    });
};
exports.addVideoDataToDB = addVideoDataToDB;
