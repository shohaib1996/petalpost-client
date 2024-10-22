"use client";

import { useGetFavouritesByUserIdQuery } from "@/redux/features/favourite/favourite.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { IPost } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const AllFavouritePosts = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);

  const userId = user?.id;

  const { data, isLoading } = useGetFavouritesByUserIdQuery({ token, userId });

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-6 justify-center mt-24 mb-10 p-5 lg:p-0">
      {data?.data.length === 0 || data?.data === undefined? (
        <p className="text-center text-lg font-semibold">
          You do not have any favourite posts yet.
        </p>
      ) : (
        data?.data.map((post: IPost) => {
          return (
            <div
              key={post._id}
              className="card card-compact bg-base-100 shadow-xl"
            >
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
                <div className="flex justify-between items-center">
                  <p className="flex items-center gap-3">
                    Upvotes: {post.upvotes} <BiUpvote />
                  </p>
                  <p className="flex items-center gap-3">
                    Downvotes: {post.downvotes} <BiDownvote />
                  </p>
                  {post.author && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="w-12 rounded-full">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <p>{post?.author?.name || "Anonymous"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllFavouritePosts;
