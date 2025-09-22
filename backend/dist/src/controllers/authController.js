"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.signUpUser = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const signUpUser = async (_req, res) => {
    const { email, password } = _req.body;
    const { data, error } = await supabaseClient_1.supabase.auth.signUp({ email, password });
    if (error)
        return res.status(400).json({ error: error.message });
    res.json({ data });
};
exports.signUpUser = signUpUser;
const signInUser = async (_req, res) => {
    const { email, password } = _req.body;
    const { data, error } = await supabaseClient_1.supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error)
        return res.status(401).json({ error: error.message });
    // console.log(data);
    res.json({ session: data.session });
};
exports.signInUser = signInUser;
