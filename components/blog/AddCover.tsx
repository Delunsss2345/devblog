import { useEdgeStore } from "@/lib/edgestore";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AddCoverProps {
  setUploadedCover: (cover: string) => void;
  replaceUrl?: string;
}

const AddCover = ({ setUploadedCover, replaceUrl }: AddCoverProps) => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>();
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleButtonClick = () => {
    imgInputRef.current?.click();
  };
  useEffect(() => {
    let isMount = true;

    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
        });
        if (isMount) {
          setUploadedCover(res.url);
        }
      } catch (error) {
        console.log("Failed");
      } finally {
        if (isMount) setIsUploading(false);
      }
    };
    uploadImage();

    return () => {
      isMount = false;
    };
  }, [file, edgestore, replaceUrl, setUploadedCover]);

  // async () => {
  //   if (file) {
  //     const res = await edgestore.publicFiles.upload({
  //       file,
  //       onProgressChange: (progress) => {
  //         // you can use this to show a progress bar
  //         console.log(progress);
  //       },
  //     });
  //     // you can run some server action or api here
  //     // to add the necessary data to your database
  //     console.log(res);
  //   }
  // };

  return (
    <div className="flex items-center gap-2">
      <input
        className="hidden"
        ref={imgInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
        }}
      />

      <button
        className="flex items-center gap-2 border-2 p-2 rounded-xl mt-2"
        onClick={handleButtonClick}
        type="button"
      >
        <ImageIcon size={20} />
        <span>{!!replaceUrl ? "Đổi ảnh" : " Thêm ảnh  "}</span>
      </button>
      {isUploading && <p className="text-green-500">Uploading...</p>}
    </div>
  );
};

export default AddCover;
