import Link from "next/link";

const AddPost = () => {
  
  return (
    <div className="max-w-[810px] mx-auto mt-24 p-5 lg:p-0">
      <Link href="/addPost"><button className="btn  w-full">
        Whats on you mind?
      </button> </Link>
    </div>
  );
};

export default AddPost;
