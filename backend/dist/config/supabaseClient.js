"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = exports.getSupabaseClientWithToken = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const getSupabaseClientWithToken = (accessToken) => {
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    });
};
exports.getSupabaseClientWithToken = getSupabaseClientWithToken;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.supabase = supabase;
// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://cxxdecxctvjbuczkizqz.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGRlY3hjdHZqYnVjemtpenF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzAwNTIsImV4cCI6MjA0NjI0NjA1Mn0.nktgNEbtFiZsuYxnZBwsmDCkQtrQOoudav5L-ZiTftE";
// export const supabase = createClient(supabaseUrl, supabaseKey);
