import Link from "next/link";

export default function EssayCard({ essay }) {
  return (
    <div className="bg-white shadow-lg p-4 hover:shadow-xl hover:ring-1 hover:ring-color-c transition-shadow duration-200 justify-center">
      <h2 className="text-xl font-semibold text-center">
        {essay.fields.title}
      </h2>
      <p className="text-s mt-2 line-clamp-3 font-light">{`${essay.fields.essay}`}</p>
      <p className="text-gray-500 mt-2">
        <span className="font-bold italic text-s">{`${essay.fields.authors}`}</span>
      </p>
      <button className="w-full py-2 mt-5 px-6 bg-gray-900 text-white font-semibold hover:bg-gray-200 hover:border-1 hover:text-gray-900 hover:border-gray-900 transition duration-400">
        <Link
          href={`/essay/${essay.pk}`}
          className="inline-block text-s text-white font-bold hover:text-gray-900"
        >
          View Full Essay
        </Link>
      </button>
    </div>
  );
}
