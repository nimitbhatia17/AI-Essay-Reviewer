"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function PromptForm() {
  const colleges = ["Harvard", "Stanford", "MIT", "Yale", "Princeton"];

  const [file, setFile] = useState(null);
  const [college, setCollege] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFeedback(null);

    if (!file || !college) {
      setError("Please select a file and enter a college.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("college", college);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setFeedback(data.feedback);
      } else {
        setError(data.error || "Error processing essay.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error("Submission error:", err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-color-e pt-20">
      {/* Hero Section */}
      <section className="pt-16 pb-10 px-4 text-center">
        <h1 className="text-6xl font-light text-color-c mb-4 tracking-tight">
          Elevate Your College Essay
        </h1>
        <p className="text-xl font-light max-w-2xl mx-auto">
          Upload your essay and get AI-powered feedback tailored to your target
          college, crafted by our Essay Coach.
        </p>
      </section>

      {/* Upload Form */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border-1 border-color-a p-8 transform transition-all hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="essay"
                className="block text-lg font-light text-color-d mb-2"
              >
                Upload Your Essay
              </label>
              <input
                type="file"
                id="essay"
                accept=".txt,.pdf,.docx"
                onChange={handleFileChange}
                className="w-full text-color-d file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-color-b file:text-color-d hover:file:text-color-c"
              />
            </div>
            <div>
              <label
                htmlFor="college"
                className="block text-lg font-light text-color-d mb-2"
              >
                Target College
              </label>
              <select
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-6 py-4 bg-white border-1 border-gray-200 rounded-xl text-gray-700 shadow-md focus:outline-none focus:ring-1 focus:ring-color-c focus:border-transparent transition duration-200 text-lg appearance-none cursor-pointer pr-12"
              >
                {colleges.map((option) => (
                  <option key={option} value={option} disabled={option === ""}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-color-c text-white font-semibold rounded-xl shadow-md hover:bg-color-d transition duration-400"
            >
              Get Feedback
            </button>
          </form>

          {/* Feedback Display */}
          {feedback && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Essay Feedback
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Object.entries(feedback).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium capitalize">
                      {key.replace("_", " ")}:
                    </span>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 mb-6">
          Need inspiration?{" "}
          <Link
            href="/examples"
            className="text-color-d hover:underline font-bold"
          >
            View sample essays
          </Link>{" "}
          accepted by top colleges.
        </p>
      </section>
    </div>
  );
}
