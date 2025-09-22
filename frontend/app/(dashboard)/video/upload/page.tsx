"use client";
import Button from "@/components/Button";
import DashboardNav from "@/components/DashboardNav";
import VideoUploader from "@/components/VIdeoUploader";
import { useIsLoadingStore } from "@/store/useAppStore";
import useUserStore from "@/store/userUserStore";
import { useUploadedVideoStore } from "@/store/useVideoStore";
import { supabase } from "@/utils/supabaseClientConfig";
import { authorizationChecker, getUserDetails } from "@/utils/user";
import {
  repurposingVideo,
  uploadVideo,
  uploadVideoHandler,
} from "@/utils/videoUploadHandler";
import { UploadIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function VideoUploadForm() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  // const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getMe);
  const isLoading = useIsLoadingStore((state) => state.videoLoad);

  const setUploadedVideoFile = useUploadedVideoStore((state) => state.setFile);
  const videoFile = useUploadedVideoStore((state) => state.file);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  useEffect(() => {
    // getUser();
    authorizationChecker(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!user) getUser();

    // const getRepurposedVideoDetailss = async () => {
    // const { data: repurposedVideos, error: repurposeError } = await supabase
    //   .from("Content Suite repurposed_assets")
    //   .select("*")
    //   .eq("user_id", getUser.id)
    //   .order("created_at", { ascending: false });
    // };
  }, [user]);

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
    // try {
    // Simulate upload delay
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await uploadVideo(selectedFile);
    // const res = await uploadVideoHandler(selectedFile);

    // if (res?.status !== 200) {
    //   setUploadStatus("Upload failed. Please try again.");
    //   throw new Error(res?.data.error);
    // }

    // console.log(res?.data.videoDetails);

    router.push(`/editor/video/${res?.data.videoDetails}`);

    // Mock successful upload
    setUploadStatus("Video uploaded successfully!");

    // Reset form after successful upload
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // } catch (error) {
    //   setUploadStatus("Upload failed. Please try again.");
    // } finally {
    //   setIsUploading(false);
    // }
  };

  // useEffect(() => {
  //   const authChecker = async () => {
  //     const isAuthenticatedReal = await getUserDetails();
  //     if (!isAuthenticatedReal || user == null) {
  //       // console.log("Getting user");
  //       await getUser();
  //     }
  //     console.log(user, isAuthenticatedReal);
  //     // console.log("Hi I ran");
  //   };
  //   authChecker();
  // }, [user]);
  const handleCutVideo = async (videoFile: File) => {
    if (!isAuthenticated) return;
    // if (!selectedFile) return;

    const res = await uploadVideo(videoFile);
    // console.log(res);

    router.push(`/editor/video/${res?.data.videoDetails}`);
  };

  useEffect(() => {
    if (videoFile) {
      // isAuthenticated
      const sendVideoForCut = async () => {
        const videoCut = await handleCutVideo(videoFile);

        console.log(videoCut);
      };

      sendVideoForCut();
    }
  }, []);
  const handleProcessVideofiles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setUploadedVideoFile(files[0]);
      if (!isAuthenticated) {
        router.push("/auth/sign-up");
        return;
      }
      const videoRes = await handleCutVideo(files[0]);

      // console.log(videoRes);

      // router.push("/video/upload");
      // const file = files[0];
      // console.log("Selected file:", file);
      // You can now process the selected file as needed
    }
  };
  return (
    <>
      <div className="my-10 p-6 bg-white">
        {/* <VideoUploader /> */}
        <form className="flex flex-col sm:flex-row shadow-2xl justify-start items-baseline rounded-2xl px-3  w-[60%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <input
            onChange={handleProcessVideofiles}
            type="file"
            accept="video/*"
            className="hidden"
            id="video-upload"
            // value={}
          />
          <label htmlFor="video-upload">
            <UploadIcon className="inline-block w-5 h-5 mr-2 cursor-pointer text-gray-600 adark:text-gray-300" />
          </label>
          <input
            type="text"
            placeholder="Enter video URL"
            className="px-4 py-4 rounded-lg border-0  w-full outline-0"
          />
          <div className="w-[40%]">
            <Button
              className="py-3 px-5 rounded-[8px] bg-bg-dark"
              // onClick={handleGetStarted}
            >
              Generate
            </Button>
          </div>
        </form>
        <div className="my-25" />

        <h2 className="text-3xl font-bold mb-10">Your videos</h2>
        <section className="flex flex-wrap gap-6 max-w-screen">
          {user?.repurposedVideos && user?.repurposedVideos?.length > 0 ? (
            user?.repurposedVideos?.map((repurposingVideo, index) => {
              const parsedCaption = JSON.parse(repurposingVideo.caption);
              return (
                <Link
                  href={`/editor/video/${repurposingVideo.id}`}
                  className="w-[30%] relative rounded-2xl cursor-pointer"
                  key={index}
                >
                  <video src={repurposingVideo.asset_url} className="rounded" />
                  <div className="absolute bottom-0 w-full h-full bg-black/40 rounded">
                    <div className="absolute bottom-2 left-2 text-white">
                      {" "}
                      <p className="">{parsedCaption[0].title}</p>
                      <div className="flex flex-wrap">
                        {parsedCaption[0].hashtags.map(
                          (item: string, idx: number) => (
                            <span className="mr-1" key={idx}>
                              {item}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : isLoading ? (
            <section className="flex  w-[90vw] gap-6 max-w-screen">
              <div className="w-[100%] h-[250px] bg-gray-400 animate-pulse rounded" />
              <div className="w-[100%] h-[250px] bg-gray-400 animate-pulse rounded" />
              <div className="w-[100%] h-[250px] bg-gray-400 animate-pulse rounded" />
            </section>
          ) : (
            <div className="w-full py-10 px-3 bg-[#ebebeb92] rounded-xl">
              <p className="">
                You don't have any projects yet. Add a video above to begin
              </p>
            </div>
          )}
        </section>

        {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
      </form> */}
      </div>
    </>
  );
}
