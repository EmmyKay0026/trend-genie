"use client";
import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import TranscriptPanel from "@/components/TranscriptPanel";
import SnipControls from "@/components/SnipControls";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClientConfig";
import VideoList from "@/components/VideoList";
import { authorizationChecker, getUserDetails } from "@/utils/user";
import useUserStore from "@/store/userUserStore";
import DashboardNav from "@/components/DashboardNav";
// import TranscriptPanel from "@/components/TranscriptPanel";
// import SnipControls from "@/components/SnipControls";

interface VideoPageProps {
  params: Promise<{ videoId: string }>;
}

const EditorPage = ({ params }: VideoPageProps) => {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getMe);

  const { videoId } = React.use(params);
  const [caption, setCaption] = useState([]);
  const [mainVideoUrl, setMainVideoUrl] = useState("");

  useEffect(() => {
    authorizationChecker(window.location.pathname);
    // const authChecker = async () => {
    //   const isAuthenticated = await getUserDetails();
    //   if (!isAuthenticated || user == null) {
    //     await getUser();
    //   }
    //   console.log(user, isAuthenticated);
    //   console.log("Hi I ran");
    // };
    // authChecker();
  }, []);

  useEffect(() => {
    const getRepurposedVideoDetails = async () => {
      const { data: repurposedData, error: repurposeError } = await supabase
        .from("Content Suite repurposed_assets")
        .select("*")
        .eq("id", videoId)
        .single();
      // const captions=
      setCaption(JSON.parse(repurposedData?.caption));
      // console.log(repurposedData?.asset_url);

      setMainVideoUrl(repurposedData?.asset_url);
      // console.log(await repurposedData?.captions);
      // console.log(repurposeError);
      // console.log(await JSON.parse(repurposedData?.captions));
    };

    getRepurposedVideoDetails();
  }, []);
  useEffect(() => {
    const getVideoDetails = async () => {
      const { data: repurposedData, error: repurposeError } = await supabase
        .from("Content Suite Videos")
        .select("*")
        .eq("id", videoId)
        .single();
      // const captions=
      if (repurposedData) {
        setCaption(JSON.parse(repurposedData?.caption));
      }

      // console.log(await repurposedData?.captions);
      // console.log(repurposeError);
      // console.log(await JSON.parse(repurposedData?.captions));
    };

    getVideoDetails();
  }, []);

  return (
    <>
      <section className="">
        <VideoList videos={caption} mainVideoUrl={mainVideoUrl} />
      </section>
    </>
  );
};

export default EditorPage;

// const [currentTime, setCurrentTime] = useState<number>(0);
// const [snip, setSnip] = useState<{ start: number; end: number } | null>(null);

// const transcript = [
//   { start: 5, end: 10, text: "Introduction to the topic" },
//   { start: 12, end: 18, text: "Key point: Why this matters" },
//   { start: 20, end: 30, text: "Summary and call to action" },
// ];

// return (
//   <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//     <div className="lg:col-span-2 space-y-4">
//       <VideoPlayer
//         url="https://cxxdecxctvjbuczkizqz.supabase.co/storage/v1/object/public/videos/mp4.1745178164319"
//         onTimeUpdate={setCurrentTime}
//       />
//       <SnipControls currentTime={currentTime} snip={snip} setSnip={setSnip} />
//     </div>

//     <TranscriptPanel
//       transcript={transcript}
//       onTimestampClick={(time) => setCurrentTime(time)}
//     />
//   </div>
// );
