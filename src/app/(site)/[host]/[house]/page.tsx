"use client";

import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";

interface PageProps {
  params: {
    host: string;
    house: string;
  };
}

export default function Hero2({ params }: PageProps) {
console.log(params);
  return (
    <main>
      <ScrollUp />
      <Hero host = {params.host} house= {params.house}/>
    </main>
  );
}
