import { NextResponse } from "next/server";
import axios from "axios";
import { api } from "./axiosConfig";
import { getSupabaseClientWithToken, supabase } from "./supabaseClientConfig";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://trend-genie.onrender.com";

// console.log(user?.id);
export const uploadVideo = async (file: File) => {
  const formData = new FormData();
  formData.append("videos", file);
  const token =
    JSON.parse(localStorage.getItem("contentRepurpose")!).token ?? null; // Retrieve token from local storage

  try {
    const response = await axios.post(
      `${baseURL}/api/v1/video/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      // console.log("Video uploaded successfully:", response.data);
      return { data: response.data, status: 200 };
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadVideoHandler = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${fileExt}.${Date.now()}`;
  const token = localStorage.getItem("contentRepurposeToken"); // Retrieve token from local storage
  const {
    data: { user },
  } = await getSupabaseClientWithToken(token!).auth.getUser();

  const { data, error } = await getSupabaseClientWithToken(token!)
    .storage.from("videos")
    .upload(fileName, file);
  // console.log(data?.fullPath);

  if (error) {
    console.error("Upload error:", error.message);
  } else {
    const url = getSupabaseClientWithToken(token!)
      .storage.from("videos")
      .getPublicUrl(fileName).data.publicUrl;
    // console.log("Uploaded file URL:", url);

    // ✅ Send metadata to backend if needed

    const { data, error } = await getSupabaseClientWithToken(token!)
      .from("Content Suite Videos")
      .insert([
        {
          user_id: user?.id,
          upload_path: "videos/" + fileName,
          source_link: url,
          title: fileName,
          status: "uploaded",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting metadata:", error.message);
    } else {
      console.log("Metadata inserted successfully:", data);
    }
  }

  return { status: 200, error: "null" };
};

export const repurposingVideo = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/video-repurpose/repurpose-with-gemini`,
      "",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "contentRepurposeToken"
          )}`,
        },
      }
    );

    console.log(response);
    return response;
  } catch {}
};

export const exportVideoRender = () => {
  // Example Next.js API route in your app (e.g., app/api/render/route.ts)

  async function POST(req: Request) {
    const body = await req.json();

    // Send request to Remotion Render Server (on port 3005 or whatever it’s running on)
    const renderResponse = await fetch("http://localhost:3005/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await renderResponse.json();

    return NextResponse.json(data);
  }
};
