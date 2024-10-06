import { useUploadImageMutation } from "@/redux/features/uploadImage/uploadImage.api";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadImageComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { isLoading, isSuccess, isError, error }] = useUploadImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("No file");

    const formData = new FormData();
    formData.append("image", file); // Append the file to the FormData instance

    try {
      const res = await uploadImage({ data: formData }).unwrap(); // Pass the FormData object
      console.log(res);
      
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload Image"}
      </button>
      {isSuccess && <p>Upload successful!</p>}
      {isError && <p>Error uploading: {error?.message}</p>}
    </div>
  );
};

export default UploadImageComponent;


