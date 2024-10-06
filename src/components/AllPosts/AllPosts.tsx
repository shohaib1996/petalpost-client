"use client";

import {
  useGetAllPostQuery,
  useUpvoteDownvoteMutation,
} from "@/redux/features/posts/posts.api";
import { IPost, TVote } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";

const AllPosts = () => {
  const { data, isLoading, refetch } = useGetAllPostQuery(undefined);

  const userId = "66fad84283895032f5e6d182"; // current user ID
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmFkODQyODM4OTUwMzJmNWU2ZDE4MiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTcyODE2OTQ1NCwiZXhwIjoxNzI4MjU1ODU0fQ.7KnTRSgoNS-DeAVSki05j2OvA2eo7yeEyV3_HkfAGQU";
  const [addVote] = useUpvoteDownvoteMutation();

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleVote = async (id: string, vote: TVote) => {
    try {
      const res = await addVote({ id, token, vote });
      if (res.data?.success === true) {
        toast.success("Vote has been done!!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserVoteStatus = (voters: any[]) => {
    const voter = voters.find((v) => v.userId === userId);
    return voter ? voter.vote : 0; 
  };

  return (
    <div className="grid gap-6 justify-center mt-8">
      {data.data.map((post: IPost) => {
        const userVote = getUserVoteStatus(post.voters); 

        return (
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
                <Link href={`post/${post._id}`} className="btn btn-primary btn-sm">
                  Read More
                </Link>
              </p>
              <div className="flex">
                <p className="flex items-center gap-3">
                  Upvotes: {post.upvotes}{" "}
                  <span
                    onClick={() => handleVote(post._id, { vote: 1 })}
                    className={`text-xl font-bold cursor-pointer ${
                      userVote === 1 ? "text-blue-500" : ""
                    }`}
                  >
                    <BiUpvote />
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  Downvotes: {post.downvotes}{" "}
                  <span
                    onClick={() => handleVote(post._id, { vote: -1 })}
                    className={`text-xl font-bold cursor-pointer ${
                      userVote === -1 ? "text-red-500" : ""
                    }`}
                  >
                    <BiDownvote />
                  </span>
                </p>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="avatar w-8 rounded">
                      <Image
                        src={
                          post.author.avatar || "https://via.placeholder.com/50"
                        }
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
        );
      })}
    </div>
  );
};

export default AllPosts;
