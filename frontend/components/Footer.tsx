import { Zap } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`border-t py-8 px-4 sm:px-6 lg:px-8 adark:border-gray-800 adark:bg-gray-900  border-gray-200 bg-gray-50`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold adark:text-white text-gray-900`}>
            Trend Genie
          </span>
        </div>
        <p className={`text-sm adark:text-gray-400 text-gray-600`}>
          © 2024 Trend Genie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
