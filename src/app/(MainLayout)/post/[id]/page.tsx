"use client";
import React, { useRef, useState } from "react";
import {
  useGetCommentByPostIdQuery,
  useGetSinglePostQuery,
} from "@/redux/features/posts/posts.api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { TComment } from "@/types/comment.type";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/features/comments/comments.api";
import toast from "react-hot-toast";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { jsPDF } from "jspdf";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

interface CommentErrorType {
  status?: number;
}

type TParams = {
  params: {
    id: string;
  };
};

const PostDetails = ({ params }: TParams) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentedUserId, setCommentedUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [updateCommentModal, setUpdateCommentModal] = useState(false);
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;

  const { id } = params;
  const { data, isLoading, error } = useGetSinglePostQuery({ id, token });
  const {
    data: allComments,
    refetch,
    error: commentError,
  } = useGetCommentByPostIdQuery({ id, token }, { skip: !data });

  const isCommentErrorWithStatus = (error: any): error is CommentErrorType => {
    return error && typeof error.status === "number";
  };
  const comments =
    isCommentErrorWithStatus(commentError) && commentError.status === 404
      ? []
      : allComments?.data || [];

  const [addComment] = useAddCommentMutation();
  const [upComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  if (isLoading) {
    return <div className="min-h-screen min-w-[100vw] flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>;
  }

  if (error) {
    return <p>Error loading post details.</p>;
  }

  const singlePostData = data?.data || {};
  const { title, content, images, tags, category, upvotes, downvotes, author } =
    singlePostData;

  const shareUrl = `https://petalpost-client.vercel.app/post/${id}`; // Replace with your actual post URL

  // Sharing URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
  const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    shareUrl
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    let yPosition = 10;

    if (pdfRef.current) {
      const content = pdfRef.current.innerText;
      const images = pdfRef.current.querySelectorAll("img");

      // Add text content
      doc.text(content, 10, yPosition);
      yPosition += 30;

      if (images) {
        const promises = Array.from(images).map(async (img, index) => {
          const imgSrc = img.src;

          try {
            const response = await fetch(imgSrc, { mode: "cors" });

            if (!response.ok) {
              throw new Error(`Failed to load image: ${imgSrc}`);
            }
            const blob = await response.blob();

            const reader = new FileReader();
            return new Promise<void>((resolve, reject) => {
              reader.onloadend = () => {
                const base64Image = reader.result;
                if (typeof base64Image === "string") {
                  doc.addImage(base64Image, "PNG", 10, yPosition, 120, 50);
                  yPosition += 60;
                }
                resolve();
              };

              reader.onerror = (error) => {
                console.warn(`Error reading image: ${imgSrc}`, error);
                resolve();
              };
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.warn(`Error loading image: ${imgSrc}`, error);
            return Promise.resolve();
          }
        });
        await Promise.all(promises);
      }

      doc.save("page.pdf");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 mt-24">
      <div ref={pdfRef}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <span>
            <i>
              --by <b>{author?.name}</b>
            </i>
          </span>
        </div>

        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                width={500}
                height={100}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-10" dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          <strong>Tags:</strong> {tags?.join(", ")}
        </div>
        <div>
          <strong>Category:</strong> {category}
        </div>
        <div>
          <strong>Upvotes:</strong> {upvotes} | <strong>Downvotes:</strong>{" "}
          {downvotes} | <strong>Comments:</strong> {comments.length} |
        </div>
      </div>

      <button
        className="btn btn-sm mt-4 cursor-pointer"
        onClick={handleDownload}
      >
        Download PDF
      </button>

      <div className="divider"></div>

      {/* Share Buttons */}
      <div className="mt-6">
        <p className="text-lg font-bold mb-3">Share this post:</p>
        <div className="flex space-x-4">
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <FaWhatsapp size={30} />
          </a>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>

      <div className="divider"></div>

      {/* Comments Section */}
      <div className="mb-5">
        <button
          onClick={() => setAddCommentModal(true)}
          className="btn btn-outline btn-success btn-md"
        >
          Add Comment
        </button>
      </div>
      <div>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment: TComment) => (
            <div key={comment._id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="User Avatar"
                    src={comment.userId.avatar}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="chat-bubble relative">
                <p className="p-4">{comment.userId.name}</p>
                <p>{comment.comment}</p>

                <button
                  onClick={() => {
                    setShowModal(true);
                    setCommentId(comment._id);
                    setCommentedUserId(comment.userId._id);
                  }}
                  className="ml-5 absolute top-0 end-2 text-xl font-bold btn btn-sm bg-transparent text-white border-0 hover:bg-transparent"
                >
                  ...
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals for adding/updating comments */}
      {showModal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box w-[250px] ">
            <form method="dialog">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            {commentedUserId === userId && (
              <>
                <button
                  className="btn btn-outline btn-warning btn-sm mb-3"
                  onClick={() => {
                    setUpdateCommentModal(true);
                    setShowModal(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline btn-error btn-sm mb-3"
                  onClick={async () => {
                    try {
                      await deleteComment({ commentId, token });
                      refetch();
                      setShowModal(false);
                    } catch (error: any) {
                      toast.error(error?.data?.message);
                    }
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </dialog>
      )}

      {addCommentModal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box">
            <form method="dialog">
              <button
                onClick={() => setAddCommentModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-3">Add Comment</h3>

            <input
              type="text"
              placeholder="Write your comment"
              className="input input-bordered input-info w-full mb-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={async () => {
                try {
                  await addComment({
                    token,
                    postId: id,
                    comment,
                  });
                  refetch();
                  setComment("");
                  setAddCommentModal(false);
                } catch (error: any) {
                  toast.error(error?.data?.message);
                }
              }}
              className="btn btn-outline btn-success btn-md"
            >
              Comment
            </button>
          </div>
        </dialog>
      )}

      {updateCommentModal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box">
            <form method="dialog">
              <button
                onClick={() => setUpdateCommentModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-3">Update Comment</h3>

            <input
              type="text"
              placeholder="Update your comment"
              className="input input-bordered input-info w-full mb-3"
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
            />

            <button
              onClick={async () => {
                try {
                  await upComment({
                    token,
                    commentId,
                    comment: updateComment,
                  });
                  refetch();
                  setUpdateComment("");
                  setUpdateCommentModal(false);
                } catch (error: any) {
                  toast.error(error?.data?.message);
                }
              }}
              className="btn btn-outline btn-success btn-md"
            >
              Update Comment
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PostDetails;
