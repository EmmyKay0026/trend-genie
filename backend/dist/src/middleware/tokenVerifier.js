"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = exports.userTokenVerifier = void 0;
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const supabaseClient_1 = require("../config/supabaseClient");
dotenv_1.default.config();
const userTokenVerifier = (_req, res, next) => {
    const token = _req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "No token" });
    try {
        const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        _req.user = payload;
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};
exports.userTokenVerifier = userTokenVerifier;
const getUserFromToken = async (token) => {
    const { data, error } = await supabaseClient_1.supabase.auth.getUser(token);
    if (error || !data?.user)
        throw new Error("Invalid token");
    return data.user;
};
exports.getUserFromToken = getUserFromToken;
