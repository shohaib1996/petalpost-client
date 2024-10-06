import AddPost from "@/app/addPost/page";
import { useUploadImageMutation } from "@/redux/features/uploadImage/uploadImage.api";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadImageComponent = () => {
  const [imgLink, setImageLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { isLoading, isSuccess, isError, error }] =
    useUploadImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("No file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage({ data: formData }).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success("Image uploaded successfully");
        setImageLink(res.data.link);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <div>
        <label className="">
          Uploead Thumbnail <span className="text-red-400">*</span>
        </label>
      </div>

      <input
        className="file-input file-input-bordered w-full max-w-xs mr-5"
        type="file"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-sm btn-outline btn-success"
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? (
          <button className="btn">
            <span className="loading loading-spinner"></span>
            Uploading
          </button>
        ) : (
          "Upload Image"
        )}
      </button>
      {isSuccess && <p>Upload successful!</p>}
      {isError && <p>Error uploading:</p>}

   
    </div>
  );
};

export default UploadImageComponent;
