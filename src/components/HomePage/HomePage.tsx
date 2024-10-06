import React from "react";
import AllPosts from "../AllPosts/AllPosts";
import AddPost from "../AddPost/AddPost";



const HomePage = () => {
  return (
    <div>
      <AddPost></AddPost>
      <AllPosts></AllPosts>
    </div>
  );
};

export default HomePage;
