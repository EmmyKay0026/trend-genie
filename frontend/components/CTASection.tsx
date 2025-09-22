"use client";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

const CTASection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic
  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // Redirect to login page
      window.location.href = "/auth/sign-up";
    }
  };
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 
        adark:bg-gray-900  bg-white
      `}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-6 
        adark:text-white text-gray-900
          `}
        >
          Ready to Create Viral Content?
        </h2>
        <p
          className={`text-xl mb-8 
            adark:text-gray-300 text-gray-600
          `}
        >
          Join thousands of creators who are already using Trend Genie to
          amplify their reach and engagement.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-200 inline-flex items-center space-x-2"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
