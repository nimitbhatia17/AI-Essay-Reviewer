import Link from "next/link";

export default function EssayCard({ essay }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl hover:ring-1 hover:ring-color-c transition-shadow duration-200">
      <h2 className="text-xl font-normal text-color-c text-center">
        {essay.essay_title}
      </h2>

      {/* <p className="text-gray-600">
        <span className="font-medium">Themes:</span>{" "}
        {essay.annotations.themes.join(", ")}
      </p> */}
      <p className="text-s mt-2 line-clamp-3 font-light">{`${essay.essay_text}`}</p>
      <p className="text-color-c mt-2">
        <span className="font-bold italic text-s">Harvard</span>
      </p>
      <button className="w-full py-2 mt-5 px-6 bg-color-c text-white font-semibold rounded-xl shadow-md hover:bg-color-d transition duration-400">
        <Link
          href={`/essay/${essay.essay_id}`}
          className="inline-block text-s text-white font-bold"
        >
          View Full Essay
        </Link>
      </button>
    </div>
  );
}
