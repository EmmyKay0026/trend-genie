import { Clock, Target, Zap } from "lucide-react";
import React from "react";

const FeaturesSection = () => {
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 adark:bg-gray-900 bg-white
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 
              adark:text-white text-gray-900
            `}
          >
            Why Choose Trend Genie?
          </h2>
          <p
            className={`text-lg adark:text-gray-300 text-gray-600
             max-w-2xl mx-auto`}
          >
            Leverage cutting-edge AI technology to create content that resonates
            with your audience across all major social platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`p-8 rounded-xl transition-all duration-200 hover:scale-105 
adark:bg-gray-800 adark:border adark:border-gray-700
                bg-white border border-gray-200 shadow-lg
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 adark:text-white text-gray-900
            `}
            >
              AI-Powered Editing
            </h3>
            <p className={"adark:text-gray-300  text-gray-600"}>
              Our advanced AI analyzes your content to identify the most
              engaging moments and creates viral-ready clips automatically.
            </p>
          </div>

          <div
            className={`p-8 rounded-xl transition-all duration-200 hover:scale-105 
            adark:bg-gray-800 adark:border adark:border-gray-700
                bg-white border border-gray-200 shadow-lg
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 
                adark:text-white text-gray-900
              }`}
            >
              Lightning Fast
            </h3>
            <p className={"adark:text-gray-300  text-gray-600"}>
              Transform hours of footage into multiple trending clips in just
              minutes. Upload your MP4 and let our AI do the heavy lifting.
            </p>
          </div>

          <div
            className={`p-8 rounded-xl transition-all duration-200 hover:scale-105 
              
              adark:bg-gray-800 adark:border adark:border-gray-700
                bg-white border border-gray-200 shadow-lg
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 adark:text-white text-gray-900
              `}
            >
              Multi-Platform Ready
            </h3>
            <p className={"adark:text-gray-300 text-gray-600"}>
              Optimized for TikTok, Instagram Reels, Instagram Stories, and
              YouTube Shorts with perfect aspect ratios and timing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
