import { Video } from "lucide-react";
import React from "react";

const DemoVideoSection = () => {
  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8  adark:bg-gray-800 bg-gray-50`}
    >
      <div className="max-w-6xl mx-auto">
        <article className="flex flex-col md:flex-row items-center gap-10 mb-12">
          <div className="">
            <h3 className="text-4xl font-bold adark:text-white text-black leading-16 ">
              Save time cutting videos
            </h3>
            <p className="text-lg adark:text-gray-400 text-gray-500">
              You no longer need to sit through hours of your content to get the
              viral content for your socials
            </p>
          </div>
          {/* <div className=""> */}
          <p className=" adark:text-gray-400 text-gray-500">
            As a plus, you get hashtags, already resized videos for reels and
            shorts. All by the click of a button.
          </p>
          {/* </div> */}
        </article>
        <div
          className={`aspect-video rounded-xl border-2 border-dashed flex items-center justify-center adark:border-gray-600 adark:bg-gray-700  border-gray-300 bg-white`}
        >
          <div className="text-center">
            <Video
              className={`w-16 h-16 mx-auto mb-4 adark:text-gray-500 text-gray-400`}
            />
            <p
              className={`text-lg font-medium adark:text-gray-400 text-gray-500`}
            >
              Demo Video Placeholder
            </p>
            <p className={`text-sm adark:text-gray-500 text-gray-400`}>
              Replace this with your actual demo video
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
