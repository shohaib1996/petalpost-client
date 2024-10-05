"use client";
import { useGetSinglePostQuery } from "@/redux/features/posts/posts.api";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Image from "next/image";

type TParams = {
  params: {
    id: string;
  };
};

const PostDetails = ({ params }: TParams) => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmFlMTliMmJjZTAzNzU3MzA0M2NmMyIsImVtYWlsIjoiam9obmF0aG9uLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwibmFtZSI6IkpvbmF0aG9uIHVwZGF0ZTIiLCJpYXQiOjE3MjgxNTk4NDcsImV4cCI6MTcyODI0NjI0N30.CBeaCBGF9afZijZp_FMYqnanC8EZAfb_iCIbofe0PW4`;

  const { id } = params;
  const { data, isLoading, error } = useGetSinglePostQuery({ id, token });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading post details.</p>;
  }

  const singlePostData = data?.data || {};
  const { title, content, images, tags, category, upvotes, downvotes, author } =
    singlePostData;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-3">{title} </h1>
        <span>
          <i>
            --by <b>{author.name}</b>
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

      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <strong>Tags:</strong> {tags?.join(", ")}
      </div>
      <div>
        <strong>Category:</strong> {category}
      </div>
      <div>
        <strong>Upvotes:</strong> {upvotes} | <strong>Downvotes:</strong>{" "}
        {downvotes}
      </div>
    </div>
  );
};

export default PostDetails;
