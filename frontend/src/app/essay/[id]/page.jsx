"use client";

import { useGetEssayByIdQuery } from "@/redux/features/essayApiSlice";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const {
    data: essay,
    isLoading,
    isFetching,
    isError,
  } = useGetEssayByIdQuery(id);

  return (
    <div className="min-h-screen bg-color-e pt-20">
      <section className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-light text-color-c mb-4">
          {essay?.fields?.title}
        </h1>
        <div className="font-bold text-s text-color-d">
          <p>College Accepted: Harvard</p>
        </div>
        <div className="mt-4 text-justify text-color-d">
          {essay?.fields?.essay?.split(/\n/).map((line) => (
            <div className="pt-1 font-light" key={line}>
              {line}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
