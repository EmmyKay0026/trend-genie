"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Zap, Brain, Rocket, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth/sign-up";
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 dark:bg-gray-900  bg-white
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-900  bg-white
        `}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 dark:text-white text-gray-900
            `}
          >
            About
            <span className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Trend Genie
            </span>
          </h1>
          <p
            className={`text-xl mb-8 dark:text-gray-300 text-gray-600
             leading-relaxed`}
          >
            We're revolutionizing content creation by making viral video editing
            accessible to everyone. Our AI-powered platform transforms your
            long-form content into engaging short clips that capture attention
            and drive engagement across social media platforms.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800 bg-gray-50
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 
                  dark:text-white text-gray-900
                `}
              >
                Our Mission
              </h2>
              <p
                className={`text-lg mb-6 dark:text-gray-300  text-gray-600
                 leading-relaxed`}
              >
                We believe every creator deserves the opportunity to reach their
                audience effectively. That's why we built Trend Genie - to
                democratize viral content creation and help creators, marketers,
                and businesses amplify their message without the complexity of
                traditional video editing.
              </p>
              <p
                className={`text-lg dark:text-gray-300 text-gray-600
                 leading-relaxed`}
              >
                Our advanced AI technology identifies the most impactful moments
                in your content, creating perfectly timed clips optimized for
                today's social media landscape.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-lg dark:bg-gray-700 bg-white shadow-md
                `}
              >
                <Brain className="w-8 h-8 text-purple-600 mb-4" />
                <h3
                  className={`font-bold mb-2 
                    dark:text-white text-gray-900
                  `}
                >
                  AI-Powered
                </h3>
                <p
                  className={`text-sm dark:text-gray-300 text-gray-600
                 `}
                >
                  Cutting-edge machine learning algorithms
                </p>
              </div>
              <div
                className={`p-6 rounded-lg dark:bg-gray-700 bg-white shadow-md
                `}
              >
                <Rocket className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className={`font-bold mb-2 dark:text-white text-gray-900`}>
                  Lightning Fast
                </h3>
                <p
                  className={`text-sm dark:text-gray-300  text-gray-600
                 }`}
                >
                  Results in minutes, not hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-900  bg-white
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              How Trend Genie Works
            </h2>
            <p
              className={`text-lg dark:text-gray-300text-gray-600
               max-w-2xl mx-auto`}
            >
              Our streamlined process makes creating viral content effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700`}
              >
                1
              </div>
              <h3
                className={`text-xl font-bold mb-4 dark:text-white text-gray-900
            `}
              >
                Upload Your Video
              </h3>
              <p className={"dark:text-gray-300 text-gray-600"}>
                Simply upload your MP4 file - whether it's a podcast, webinar,
                tutorial, or any long-form content up to hours in length.
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-400`}
              >
                2
              </div>
              <h3
                className={`text-xl font-bold mb-4 dark:text-white text-gray-900`}
              >
                AI Analysis
              </h3>
              <p className={"dark:text-gray-300  text-gray-600"}>
                Our AI analyzes your content, identifying key moments, emotional
                peaks, and engaging segments that have viral potential.
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-cyan-500`}
              >
                3
              </div>
              <h3
                className={`text-xl font-bold mb-4 
                  dark:text-whitetext-gray-900
                }`}
              >
                Get Your Clips
              </h3>
              <p className={"dark:text-gray-300 text-gray-600"}>
                Download perfectly formatted clips optimized for TikTok,
                Instagram Reels, and YouTube Shorts - ready to upload and share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Optimization */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8
          dark:bg-gray-800 bg-gray-50
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              Optimized for Every Platform
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                platform: "TikTok",
                specs: "9:16 ratio, 15-60s",
                color: "from-pink-500 to-red-500",
              },
              {
                platform: "Instagram Reels",
                specs: "9:16 ratio, 15-90s",
                color: "from-purple-500 to-pink-500",
              },
              {
                platform: "Instagram Stories",
                specs: "9:16 ratio, 15s max",
                color: "from-orange-500 to-purple-500",
              },
              {
                platform: "YouTube Shorts",
                specs: "9:16 ratio, up to 60s",
                color: "from-red-500 to-red-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg text-center dark:bg-gray-700  bg-white shadow-md
                `}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`font-bold mb-2 dark:text-white text-gray-900
                  `}
                >
                  {item.platform}
                </h3>
                <p
                  className={`text-sm dark:text-gray-300 text-gray-600
                  `}
                >
                  {item.specs}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-white
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className={`p-8 rounded-xl dark:bg-gray-800 dark:border dark:border-gray-700  bg-white border border-gray-200 shadow-lg
              `}
            >
              <h3
                className={`text-xl font-bold mb-4 dark:text-white text-gray-900
                `}
              >
                Innovation
              </h3>
              <p className={"dark:text-gray-300  text-gray-600"}>
                We're constantly pushing the boundaries of what's possible with
                AI-powered content creation, staying ahead of social media
                trends and platform requirements.
              </p>
            </div>

            <div
              className={`p-8 rounded-xl dark:bg-gray-800 dark:border dark:border-gray-700
                  bg-white border border-gray-200 shadow-lg
              `}
            >
              <h3
                className={`text-xl font-bold mb-4 
                  dark:text-white text-gray-900
                `}
              >
                Accessibility
              </h3>
              <p className={"dark:text-gray-300 text-gray-600"}>
                Professional-quality video editing shouldn't require years of
                training. We make powerful tools accessible to creators at every
                level.
              </p>
            </div>

            <div
              className={`p-8 rounded-xl 
                  dark:bg-gray-800 dark:border dark:border-gray-700
                  bg-white border border-gray-200 shadow-lg
              `}
            >
              <h3
                className={`text-xl font-bold mb-4 
                  dark:text-white text-gray-900
                `}
              >
                Results-Driven
              </h3>
              <p className={"dark:text-gray-300  text-gray-600"}>
                Every feature we build is focused on one goal: helping you
                create content that performs better and reaches more people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800 bg-gray-50
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              What Our Users Say
            </h2>
            <p
              className={`text-lg 
                dark:text-gray-300 text-gray-600
              }`}
            >
              Testimonials coming soon
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border-2 border-dashed dark:border-gray-600 dark:bg-gray-700 border-gray-300 bg-white
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full dark:bg-gray-600 bg-gray-300`}
                  ></div>
                  <p className={`text-sm dark:text-gray-400 text-gray-500`}>
                    Testimonial placeholder {i}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-white
        `}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 dark:text-white text-gray-900
            `}
          >
            Ready to Transform Your Content?
          </h2>
          <p
            className={`text-xl mb-8 dark:text-gray-300 text-gray-600
            `}
          >
            Join the revolution in AI-powered content creation. Start turning
            your long-form videos into viral clips today.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
