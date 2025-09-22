"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideos = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const supaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";
const uploadVideos = async (fileName, token, file) => {
    const supabase = (0, supabaseClient_1.getSupabaseClientWithToken)(token);
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from(supaBaseBucket)
        .upload(fileName, file.buffer, {
        contentType: file.mimetype,
    });
};
exports.uploadVideos = uploadVideos;
