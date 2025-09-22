import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://trend-genie.onrender.com";
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const contentRepurposeToken = localStorage.getItem("contentRepurposeToken");
  const token = JSON.parse(contentRepurposeToken ?? "").token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
