import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "elsexperiences",
  description:
    "World class homestays.",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
    </main>
  );
}
