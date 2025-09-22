"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const getVideos = async (_req, res) => {
    const { data, error } = await supabaseClient_1.supabase
        .from("Content Suite Users")
        .select("id");
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json(data);
};
exports.getVideos = getVideos;
