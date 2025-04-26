"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      // Add search logic here (e.g., query backend for colleges)
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-color-a shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16">
          {/* Logo and Company Name  */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png" // Replace with your logo in public/logo.png
                alt="AI Essay Reviewer Logo"
                width={25}
                height={25}
                className="object-contain"
                onError={(e) =>
                  (e.currentTarget.src = "https://via.placeholder.com/40")
                }
              />
              <span className="text-xl font-medium font-arial text-gray-800">
                AI Essay Reviewer
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges or topics..."
                className="w-full px-4 py-2 text-gray-700 bg-color-e rounded-lg text-medium focus:outline-none focus:ring-1 focus:ring-color-c"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-color-c"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Additional Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/upload"
              className="text-gray-600 hover:text-blue-500 hidden"
            >
              Upload Essay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
