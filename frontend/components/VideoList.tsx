"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/Cards";
// import { Button } from "@/components/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { Download, HelpCircle } from "lucide-react";
import Button from "./Button";

type VideoMeta = {
  title: string;
  reason: string;
  hashtags: string[];
  url: string;
};

interface VideoListProps {
  videos: VideoMeta[];
  mainVideoUrl: string;
}

export default function VideoList({ videos, mainVideoUrl }: VideoListProps) {
  const [openReason, setOpenReason] = useState<string | null>(null);

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.mp4`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Main Video Section */}
      <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-white rounded-2xl shadow">
        <video
          className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200"
          controls
          src={mainVideoUrl}
        />
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Main Video</h1>
      </div>

      {/* Video Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {videos.map((video, idx) => (
          <Card
            key={idx}
            className="relative rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white hover:shadow-2xl transition-shadow"
          >
            {/* Video preview */}
            <div className="relative w-full h-56 bg-black group">
              <video
                src={video.url}
                controls
                className="w-full h-full object-cover rounded-t-2xl"
                // poster="/video-placeholder.png"
              />
              {/* Question mark overlay */}
              <button
                onClick={() => setOpenReason(video.reason)}
                className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-indigo-100 transition"
                title="Why is this clip relevant?"
              >
                <HelpCircle className="w-5 h-5 text-indigo-600" />
              </button>
            </div>

            {/* Content */}
            <CardContent className="p-5 flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {video.title}
              </h2>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 items-center">
                {video.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <Button
                  type="button"
                  onClick={async () => {
                    const tags = video.hashtags.join(" ");
                    await navigator.clipboard.writeText(tags);
                    // Indicate copied
                    const btn = document.activeElement as HTMLElement;
                    if (btn) {
                      const original = btn.innerHTML;
                      btn.innerHTML = "Copied!";
                      setTimeout(() => {
                        btn.innerHTML = original;
                      }, 1200);
                    }
                  }}
                  className="ml-2 text-xs px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full font-medium"
                  title="Copy all hashtags"
                >
                  Copy Hashtags
                </Button>
              </div>
              <p className="text-[14px]">{video.reason}</p>
              {/* Download button */}
              <Button
                onClick={async () => {
                  const response = await fetch(video.url);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `${video.title}.mp4`;
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  window.URL.revokeObjectURL(url);
                }}
                className="mt-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 transition"
              >
                <Download className="w-4 h-4" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reason modal */}
      <Dialog open={!!openReason} onOpenChange={() => setOpenReason(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Why this clip is relevant</DialogTitle>
          </DialogHeader>
          <p className="text-base text-gray-700">{openReason}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
