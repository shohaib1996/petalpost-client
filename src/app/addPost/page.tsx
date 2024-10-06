"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAddPostMutation } from "@/redux/features/posts/posts.api";
import toast from "react-hot-toast";
import UploadImageComponent from "@/components/UploadImage/UploadImageComponent";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const AddPost = () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmFlMTliMmJjZTAzNzU3MzA0M2NmMyIsImVtYWlsIjoiam9obmF0aG9uLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwibmFtZSI6IkpvbmF0aG9uIHVwZGF0ZTIiLCJpYXQiOjE3MjgxNTk4NDcsImV4cCI6MTcyODI0NjI0N30.CBeaCBGF9afZijZp_FMYqnanC8EZAfb_iCIbofe0PW4`;
  const userId = `66fae19b2bce037573043cf3`;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addPost] = useAddPostMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };
  console.log(selectedFile);

  const handleAddPost = async () => {
    if (!selectedFile) {
      toast.error("Please upload a file");
      return;
    }

    // Create FormData and append file
    const formData = new FormData();
    formData.append("image", selectedFile);

    // Debugging FormData
    console.log("FormData before sending:", formData);

    // Log all formData values for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Client-ID c8855cbec28058a",
        },
      });

      if (!response.ok) {
        return toast.error("File upload failed");
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // console.log(content);
    // const data = {
    //   title,
    //   content,
    //   author: userId,
    //   images: [
    //     "https://media.istockphoto.com/id/1134719594/photo/gardening-tools-and-flowers-on-soil.jpg?s=612x612&w=0&k=20&c=63VLWD2WXDI2-aGt3Txb6MR-B0q1twdo5LiAFRfovgQ=",
    //   ],
    //   tags: ["Gardening", "Tips", "Plants", "Horticulture"],
    //   category: "Gardening",
    //   upvotes: 0,
    //   downvotes: 0,
    //   isPremium: false,
    //   voters: [],
    // };
    // try {
    //   const res = await addPost({ data, token });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["link", "image", "video", "formula"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "formula",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="max-w-7xl mx-auto mt-24 p-5">
      <label>
        Title <span className="text-red-400">*</span>
      </label>
      <input
        required
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type here"
        className="input input-bordered w-full max-w-full mb-5 mt-2"
      />
      {/* <div className="mb-5">
        <label className="">
          Uploead Thumbnail <span className="text-red-400">*</span>
        </label>
        <br />
        <input
          required
          type="file"
          className="file-input w-full max-w-xs mt-4"
          onChange={handleFileChange}
        />
      </div> */}
      <UploadImageComponent/>
      <label>
        Content <span className="text-red-400">*</span>
      </label>

      <div className="mb-20">
        <QuillEditor
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: "350px" }}
        />
      </div>

      <div className="lg:pt-0 pt-16">
        <label className="">
          Tags:<span className="text-red-400">*</span>{" "}
        </label>
        <input
          required
          type="text"
          placeholder="Ex - Gardening,
            Tips,
            Plants,
            Horticulture"
          className="input input-bordered w-full max-w-xl"
        />
      </div>

      <button
        onClick={handleAddPost}
        className="btn btn-outline btn-success mt-5"
      >
        Create Post
      </button>
    </div>
  );
};

export default AddPost;
