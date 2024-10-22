"use client"

import AddPost from "@/components/AddPost/AddPost";
import AllPosts from "@/components/AllPosts/AllPosts";
import Quotes from "@/components/Quotes/Quotes";

import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || ""; 

  return (
    <div>
      <AddPost />
      <Quotes/>
      <AllPosts searchQuery={searchQuery} />
    </div>
  );
};

export default Home;

