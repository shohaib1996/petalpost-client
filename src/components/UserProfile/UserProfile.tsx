"use client";

import {
  useDeletePostMutation,
  useGetPostByUserIdQuery,
} from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { IPost } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import ProfileUpdateModal from "../ProfileUpdateModal/ProfileUpdateModal";
import PostUpdateModal from "../PostUpdateModal/PostUpdateModal";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPostUpdateModal, setShowPostUpdateModal] = useState(false);
  const [post, setPost] = useState<IPost>();
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data, isLoading, refetch } = useGetPostByUserIdQuery({
    userId,
    token,
  });
  const [deletePost] = useDeletePostMutation();

  if (isLoading) {
    return <div className="min-h-screen min-w-[100vw] flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>;
  }

  console.log(data?.data);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleUpdatePost = (post: IPost) => {
    setPost(post);
    setShowPostUpdateModal(true);
  };

  const handleDeletePost = async (id: string) => {
    try {
      await toast.promise(deletePost({ token, postId: id }), {
        loading: "Deleting post...",
        success: "Post deleted successfully!",
        error: "Failed to delete post. Please try again.",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="grid lg:grid-cols-[3fr_5fr] grid-cols-1 justify-center mt-24 max-w-7xl mx-auto p-5 lg:gap-20 gap-5">
      <div>
        <Link href="favourite">
          <button className="btn w-full bg-[#2DA64D] hover:bg-green-500 text-white font-bold">
            Favourite Post
          </button>
        </Link>
        <Link href="/followers">
          <button className="btn w-full mt-5 bg-[#2DA64D] hover:bg-green-500 text-white font-bold">
            Followers and Following
          </button>
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="btn w-full mt-5 bg-[#2DA64D] hover:bg-green-500 text-white font-bold"
        >
          Update Profile
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {data?.data.length === 0 || data?.data == undefined? (
          <p className="text-center text-lg font-semibold">
            You do not have any posts yet.
          </p>
        ) : (
          data?.data.map((post: IPost) => (
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
                <div className="flex justify-between items-center lg:flex-row flex-col gap-5 lg:gap-0">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-3">
                      Upvotes: {post.upvotes} <BiUpvote />
                    </p>
                    <p className="flex items-center gap-3">
                      Downvotes: {post.downvotes} <BiDownvote />
                    </p>
                    <div className="lg:ml-10 ml-0">
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
                          <p>{post.author.name || "Anonymous"}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-5 flex gap-3">
                    <button
                      onClick={() => handleUpdatePost(post)}
                      className="btn btn-sm bg-[#2DA64D] hover:bg-green-500 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeletePost(post?._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-400 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ProfileUpdateModal showModal={showModal} setShowModal={setShowModal} />
      <PostUpdateModal
        showPostUpdateModal={showPostUpdateModal}
        setShowPostUpdateModal={setShowPostUpdateModal}
        post={post}
        refetch={refetch}
      ></PostUpdateModal>
    </div>
  );
};

export default UserProfile;
