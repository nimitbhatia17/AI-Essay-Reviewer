"use client";

import Navbar from "./_components/navbar";
import PromptForm from "./_components/promptform";

async function hitTestEndPoint() {
  const response = await fetch("http://localhost:8000/test");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <PromptForm />
    </>
  );
}
