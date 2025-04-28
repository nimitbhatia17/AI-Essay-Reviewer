import EssayCard from "../_components/essaycard";
import Navbar from "../_components/navbar";

const Page = async ({ searchParams }) => {
  const { query } = await searchParams;
  const fetchResults = async () => {
    const response = await fetch("http://localhost:8000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    return await response.json();
  };

  const essays = await fetchResults();

  return (
    <div className="min-h-screen bg-color-e px-40">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-40">
        <h1 className="text-4xl font-light mb-10 text-color-c">
          Search Results
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {essays.map((essay) => (
            <EssayCard key={essay.essay_id} essay={essay} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
