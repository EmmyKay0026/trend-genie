"use client";
import {
  repurposingVideo,
  uploadVideo,
  uploadVideoHandler,
} from "@/utils/videoUploadHandler";
import { useState, useRef } from "react";

export default function VideoUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadStatus("");
    } else if (file) {
      setUploadStatus("Please select a valid video file.");
      setSelectedFile(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Please select a video to upload.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    // This is where you would handle the actual upload logic
    // For example:
    try {
      // Simulate upload delay
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      // const res = await uploadVideo(selectedFile);
      const res = await uploadVideoHandler(selectedFile);

      if (res?.status !== 200) {
        setUploadStatus("Upload failed. Please try again.");
        throw new Error(res?.error);
      }

      // Mock successful upload
      setUploadStatus("Video uploaded successfully!");

      // Reset form after successful upload
      setSelectedFile(null);
      setPreviewUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Upload Video
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="video-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Select video file
          </label>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  MP4, WebM, AVI, MOV (MAX. 100MB)
                </p>
              </div>
              <input
                id="video-upload"
                type="file"
                className="hidden"
                // accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
          </div>
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <video className="w-full rounded-lg" controls src={previewUrl}>
              Your browser does not support the video tag.
            </video>
            <p className="mt-1 text-sm text-gray-500">
              {selectedFile?.name} (
              {((selectedFile?.size ?? 0) / (1024 * 1024)).toFixed(2)} MB)
            </p>
          </div>
        )}

        {uploadStatus && (
          <div
            className={`text-sm ${
              uploadStatus.includes("successfully")
                ? "text-green-600"
                : uploadStatus === "Uploading..."
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {uploadStatus}
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading || !selectedFile}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isUploading || !selectedFile
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
