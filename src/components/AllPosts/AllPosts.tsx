"use client";

import { useAddFollowingMutation } from "@/redux/features/followers/followers.api";
import {
  useGetAllPostQuery,
  useUpvoteDownvoteMutation,
} from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { IPost, TVote } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";

const AllPosts = () => {
  const { data, isLoading, refetch } = useGetAllPostQuery(undefined);
  const [showModal, setShowModal] = useState(false);
  const [followId, setFollowId] = useState("");
  const [addFollowing] = useAddFollowingMutation()

  const token = useTypedSelector((state) => state.auth.token);

  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;
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
    if (!user) {
      return toast.error("Please login to vote");
    }
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

  const handleFollow = async(e: React.FormEvent) => {
    e.preventDefault();
    // console.log(userId, followId);
    const followData = {
      userId,
      followingId: followId
    }
    try {
      const res = await addFollowing({token, followData})
      console.log(res);
      
      if(res.data.success === true){
        toast.success("You have followed this user")
        setShowModal(false)
      }
    } catch (error) {
      toast.error("Alreaday followed this user")
      setShowModal(false)

    }

  };

  return (
    <div className="grid gap-6 justify-center mt-8">
      {data.data.map((post: IPost) => {
        const userVote = getUserVoteStatus(post.voters);

        // console.log(post.images[0]);

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
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setShowModal(true), setFollowId(post.author._id);
                    }}
                  >
                    <div className="w-12 rounded-full">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48}
                        height={48}
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
      {showModal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box w-[150px]">
            <form method="dialog">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <form action="" onSubmit={handleFollow}>
              <button type="submit" className="btn btn-outline btn-info btn-sm">
                Follow
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllPosts;
