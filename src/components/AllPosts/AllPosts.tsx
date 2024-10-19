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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useInView } from "react-intersection-observer";

import { MdFavoriteBorder } from "react-icons/md";
import { useAddFavouriteMutation } from "@/redux/features/favourite/favourite.api";

const AllPosts = ({ searchQuery }: { searchQuery: string }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, isLoading, refetch } = useGetAllPostQuery({
    searchQuery,
    page,
  });
  const [addFavourite] = useAddFavouriteMutation();
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [followId, setFollowId] = useState("");
  const [addFollowing] = useAddFollowingMutation();
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;
  const [addVote] = useUpvoteDownvoteMutation();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  useEffect(() => {
    setPosts([]);
    setPage(1);
    refetch();
  }, [searchQuery]);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    if (data?.data) {
      setPosts((prevPosts) => [...prevPosts, ...data.data]);
      if (data.data.length === 0) {
        setHasMore(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

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

  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault();
    const followData = {
      userId,
      followingId: followId,
    };
    try {
      const res = await addFollowing({ token, followData });
      if (res.data.success === true) {
        toast.success("You have followed this user");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Already followed this user");
      setShowModal(false);
    }
  };

  if (isLoading && page === 1) {
    return <div>Loading...</div>;
  }

  const handleAddFavorite = async (post: IPost) => {
    const favouriteData = {
      postId: post._id,
    };

    try {
      const res = await addFavourite({ token, favouriteData });
      if (res.data.success === true) {
        toast.success("Added to your favourite list");
      }
    } catch (error) {
      console.log(error);
      toast.error("You have already added it on favourite list")
    }
  };

  return (
    <div className="grid gap-6 justify-center mt-8">
      {posts.map((post: IPost) => {
        const userVote = getUserVoteStatus(post.voters);

        return (
          <div
            key={post._id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure className="relative">
              <Image
                src={post.images[0] || "https://via.placeholder.com/400"}
                alt={post.title}
                className="w-full h-[450px] object-cover"
                width={500}
                height={500}
              />
              <div className="absolute top-[3%] left-[93%]">
                <button
                  onClick={() => handleAddFavorite(post)}
                  className="btn btn-sm bg-slate-300 border-none"
                >
                  {" "}
                  <MdFavoriteBorder className="text-3xl text-purple-700" />
                </button>
              </div>
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

      {/* Loader for infinite scroll */}
      <div ref={loadMoreRef} className="w-full text-center py-8">
        {hasMore && <div>Loading more posts...</div>}
        {!hasMore && <div>No more posts to load.</div>}
      </div>

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
