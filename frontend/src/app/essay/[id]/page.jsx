"use client";

import Navbar from "@/app/components/common/navbar";
import { useState, useEffect, use } from "react";

export default function EssayDetail({ params }) {
  const { id } = use(params);
  const [essay, setEssay] = useState({});

  useEffect(() => {
    const fetchEssay = async () => {
      const response = await fetch(`http://localhost:8000/api/essay?id=${id}`, {
        signal: AbortSignal.timeout(300000),
      });
      const essay = await response.json();
      console.log(essay);
      setEssay(essay);
    };

    fetchEssay();
  }, [id]);

  return (
    <div className="min-h-screen bg-color-e pt-20">
      <section className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-light text-color-c mb-4">
          {essay[0]?.essay_title}
        </h1>
        <div className="font-bold text-s text-color-d">
          <p>College Accepted: Harvard</p>
        </div>
        <div className="mt-4 text-justify text-color-d">
          {essay[0]?.essay_text?.split(/\n/).map((line) => (
            <div className="pt-1 font-light" key={line}>
              {line}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
