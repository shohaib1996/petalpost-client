"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const AddPost = () => {
  const [content, setContent] = useState("");
  const handleAddPost = () => {
    console.log(content);
    
  }


  const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],       
        ['blockquote', 'code-block'],
        
      
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         
        ['link', 'image', 'video', 'formula'],
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],         
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']  
    ],
  };
  const formats = [
    "bold", "italic", "underline", "strike", 
    "blockquote", "code-block", 
    "header", "list", "bullet", "link", 
    "image", "video", "formula", "align", 
    "color", "background"
  ];

 
  return (
    <div className="max-w-7xl mx-auto mt-24">
         <label>Title</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-full mb-5 mt-2" />
            <label>Content</label>
            <QuillEditor
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              
            />
          <button onClick={handleAddPost} className="btn btn-outline btn-success mt-5">Create Post</button>

          <img src=""/>
    </div>
  );
};

export default AddPost;
