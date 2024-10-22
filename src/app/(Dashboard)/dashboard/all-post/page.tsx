"use client";

import { useDeletePostMutation, useGetAllPostsWithoutPaginationQuery } from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const AllPost = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const { data, isLoading, refetch } = useGetAllPostsWithoutPaginationQuery({ token });

  const [deletePost] = useDeletePostMutation();

  const allPost = data?.data || [];

  if (isLoading) {
    return <div className="min-h-screen min-w-[60vw] flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>;
  }

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

  console.log(data);
  return (
    <div className="overflow-x-auto">
      <h1 className="text-center mt-8 font-bold text-3xl">All Posts</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author Email</th>
            <th>Post Premium</th>
            <th>Upvotes</th>
            <th>Downvotes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allPost.map((post: any, index: number) => (
            <tr key={post._id}>
              <th>{index + 1}</th>
              <td>{post.title}</td>
              <td>{post?.author?.email}</td>
              <td>{post?.isPremium ? "Yes" : "No"}</td>
              <td>{post.upvotes}</td>
              <td>{post.downvotes}</td>
              <td>
                <Link href={`/post/${post._id}`}>
                  <button className="btn btn-sm btn-info mr-2">Details</button>
                </Link>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPost;
