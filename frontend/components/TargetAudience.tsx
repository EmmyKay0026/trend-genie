import React from "react";

const TargetAudience = () => {
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-800 bg-gray-50 `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900 `}
          >
            Perfect For Every Creator
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Content Creators",
              desc: "YouTubers, podcasters, and influencers",
            },
            { title: "Marketers", desc: "Digital marketing professionals" },
            { title: "Businesses", desc: "Brands looking to expand reach" },
            { title: "Entrepreneurs", desc: "Building personal brands online" },
            {
              title: "Video Editors",
              desc: "Professional editors saving time",
            },
          ].map((audience, i) => (
            <div
              key={i}
              className={`p-6 rounded-lg text-center transition-all duration-200 hover:scale-105
                dark:bg-gray-700  bg-white shadow-md
              `}
            >
              <h3 className={`font-bold mb-2 dark:text-white text-gray-900 `}>
                {audience.title}
              </h3>
              <p className={`text-sm dark:text-gray-300 text-gray-600 `}>
                {audience.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
