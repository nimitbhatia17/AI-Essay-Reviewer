"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EssaySearchForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      "/essay/search-results/" + encodeURIComponent(searchQuery.trim())
    );
  };
  return (
    <>
      <div className="flex-1 max-w-md mx-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search colleges or topics..."
            className="w-full px-5 py-4 text-gray-700 text-bold focus:outline-none focus:ring-2 focus:ring-color-black"
          />
          <button
            type="submit"
            className="absolute px-2 right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-color-black"
          >
            <svg
              className="w-6 h-6"
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
    </>
  );
}
