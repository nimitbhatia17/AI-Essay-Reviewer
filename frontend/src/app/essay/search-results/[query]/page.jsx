"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useEssaySearchMutation } from "@/redux/features/essayApiSlice";
import { EssayCard } from "@/app/components/common";

export default function Page({ params }) {
  const [essaySearch] = useEssaySearchMutation();
  const { query } = useParams();
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    const decodedQuery = decodeURIComponent(query);
    if (decodedQuery) {
      essaySearch(decodedQuery)
        .unwrap()
        .then((result) => {
          setEssays(result);
        })
        .catch((error) => {
          console.error("Search failed:", error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen px-40">
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-bold mb-10 text-color-gray-900">
          Search Results
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {essays.map((essay) => {
            console.log(essay);
            return <EssayCard key={essay.pk} essay={essay} />;
          })}
        </div>
      </div>
    </div>
  );
}
