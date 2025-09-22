"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import GradientText from "./GradientText";
import { ArrowRight, Play, UploadIcon } from "lucide-react";
import CircularGallery from "./CircularGallery";
import Galaxy from "./Galaxy";
import Particles from "./Particles";
import useUserStore from "@/store/userUserStore";
import { useRouter } from "next/navigation";
import { useUploadedVideoStore } from "@/store/useVideoStore";

const HeroSection = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUploadedVideoFile = useUploadedVideoStore((state) => state.setFile);
  const router = useRouter();
  useEffect(() => {
    // Check if user is authenticated (replace with your actual auth check)
    const checkAuth = () => {
      // Example: check for token in localStorage or cookie
      // setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    checkAuth();
  }, []);
  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // Redirect to login page
      window.location.href = "/auth/sign-up";
    }
  };
  const handleProcessVideofiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setUploadedVideoFile(files[0]);
      if (!isAuthenticated) {
        router.push("/auth/sign-up");
        return;
      }
      router.push("/video/upload");
      // const file = files[0];
      // console.log("Selected file:", file);
      // You can now process the selected file as needed
    }
  };
  return (
    <>
      {/* <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div> */}

      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 adark:bg-gray-900 bg-white`}
      >
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6  adark:text-white text-gray-900 `}
            >
              Turn Long Videos Into
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Viral Clips
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 adark:text-gray-300 "text-gray-600       `}
            >
              AI-powered video editing that transforms your content into
              trending short-form videos for TikTok, Instagram, and YouTube
              Shorts in minutes.
            </p>

            <form className="flex flex-col sm:flex-row shadow-2xl justify-start items-baseline rounded-2xl px-3  w-[60%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <input
                onChange={handleProcessVideofiles}
                type="file"
                accept="video/*"
                className="hidden"
                id="video-upload"
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
                  onClick={handleGetStarted}
                >
                  Generate
                </Button>
              </div>
            </form>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-primary to-primfrom-primary hover:from-primary hover:to-primfrom-primary text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 " />
              </button>
              <button
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 flex items-center justify-center space-x-2 adark:border-gray-700 adark:text-gray-300 dark-hover:border-gray-600
                  border-gray-300 text-gray-700 hover:border-gray-400 backdrop-blur-[3px]
              `}
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* <div 
        style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div> */}
      </section>
    </>
  );
};

export default HeroSection;
