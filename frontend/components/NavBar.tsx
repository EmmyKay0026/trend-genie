"use client";
import useUserStore from "@/store/userUserStore";
import { Moon, Sun, Zap } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // Check if user is authenticated (replace with your actual auth check)
    const checkAuth = () => {
      // Example: check for token in localStorage or cookie
      // setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    checkAuth();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      // Redirect to dashboard
      window.location.href = "/video/upload";
    } else {
      // Redirect to login page
      window.location.href = "/auth/sign-up";
    }
  };
  return (
    <nav
      className={`border-b transition-colors duration-300 adark:border-gray-800 adark:bg-gray-900  border-gray-100 bg-white
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Image
              src={"/images/trendgenie_logo.png"}
              alt="Logo"
              width={40}
              height={40}
            />
            {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-bold adark:text-white text-gray-900
              `}
            >
              Trend Genie
            </span> */}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`font-medium adark:text-white text-gray-900
              `}
            >
              Home
            </a>
            <a
              href="/about"
              className={`font-medium adark:text-gray-300 adark:hover:text-white
                  text-gray-600 hover:text-gray-900
              } transition-colors`}
            >
              About
            </a>
            <a
              href="/contact"
              className={`font-medium adark:text-gray-300 adark:hover:text-white
                  text-gray-600 hover:text-gray-900
              transition-colors`}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:text-white"
                  : "bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
