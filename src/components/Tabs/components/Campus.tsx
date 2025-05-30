/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import axios from "axios";
import { PrimaryButton } from "@/components/Buttons";

interface CampusProps {
  onSubmit: (data: any) => void;
  collegeDataRefetch: () => void;
  loading: boolean;
}
interface UploadedImage {
  url: string;
  public_id: string;
}

export default function Campus({ onSubmit, collegeDataRefetch, loading }: CampusProps) {
  const [uploading, setUploading] = useState(false);
  const [imageList, setImageList] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    setUploading(true);
    const newImages: UploadedImage[] = [];
  
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
        const res = await axios.post(import.meta.env.VITE_CLOUDINARY_API, formData);
        newImages.push({
          url: res.data.secure_url,
          public_id: res.data.public_id,
        });
      }
  
      setImageList((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  
    setUploading(false);
  };
  

  const handleImageRemove = async (publicId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/cloudinary/image/delete`,
        { public_id: publicId },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      setImageList((prev) => prev.filter((img) => img.public_id !== publicId));
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      Campus: "Campus Name",
      images: imageList.map((img) => img.url),
    });
    collegeDataRefetch();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <label className="font-medium">Upload Campus Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

        <div className="flex flex-wrap gap-4 mt-2">
          {imageList.map((img, idx) => (
            <div key={idx} className="relative w-32 h-32">
              <img
                src={img.url}
                alt={`Campus ${idx + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(img.public_id)}
                className="absolute top-1 right-1 bg-white bg-opacity-80 text-red-600 rounded-full p-1 text-xs font-bold hover:bg-red-100"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <PrimaryButton label="Submit" onClick={handleSubmit} loading={uploading || loading} />
    </div>
  );
}
