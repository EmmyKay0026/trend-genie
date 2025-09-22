import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;

const geminiAi = new GoogleGenAI({ apiKey: googleApiKey });

export default geminiAi;
