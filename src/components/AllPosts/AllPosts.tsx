"use client";

import { useGetAllPostQuery } from "@/redux/features/posts/posts.api";
import { IPost } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";

const AllPosts = () => {
  const { data, isLoading } = useGetAllPostQuery(undefined);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-6 justify-center mt-5">
      {data.data.map((post: IPost) => (
        <div key={post._id} className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              src={post.images[0] || "https://via.placeholder.com/400"}
              alt={post.title}
              className="w-full h-[450px] object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>
              {stripHtmlTags(post.content).substring(0, 100)}...{" "}
              <Link
                href={`post/${post._id}`}
                className="btn btn-primary btn-sm"
              >
                Read More
              </Link>
            </p>
            <div className="flex">
              <p className="flex items-center gap-3">
                Upvotes: {post.upvotes}{" "}
                <span className="text-xl font-bold cursor-pointer">
                  <BiUpvote></BiUpvote>
                </span>
              </p>
              <p className="flex items-center gap-3">
                Downvotes: {post.downvotes}{" "}
                <span className="text-xl font-bold cursor-pointer">
                  <BiDownvote></BiDownvote>
                </span>
              </p>
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="avatar w-8 rounded">
                    <Image
                      src={post.author.avatar || "https://via.placeholder.com/50"}
                      alt={post.author.name || "Anonymous"}
                      width={500}
                      height={500}
                    />
                  </div>
                  <p>{post.author.name || "Anonymous"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
