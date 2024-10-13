import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

interface FilePreviewProps {
  file: File;
  name: string;
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  names: string[];
}

const FilePreviewContent: React.FC<{
  fileUrl: string;
  children: React.ReactNode;
}> = ({ fileUrl, children }) => (
  <div className="relative w-full h-full border-2 border-[#0077bc]">
    <div className="absolute top-2 left-2">
      <FaEye
        className="text-[#0077bc] cursor-pointer"
        onClick={() => window.open(fileUrl, "_blank")}
      />
    </div>
    <div className="w-full h-full overflow-hidden">
      {children}
    </div>
  </div>
);

const PopFilePreviewForTenantsUnite: React.FC<FilePreviewProps> = ({
  names,
  file,
  name,
  setNames,
  index,
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const isImage = (file: File) =>
    /\.(png|jpg|jpeg|jif|jfif|gif|svg|webp)$/i.test(file.name);

  const isPdf = (file: File) => /\.pdf$/i.test(file.name);

  const isDocument = (file: File) =>
    /\.(doc|docx)$/i.test(file.name);

  const isVideo = (file: File) =>
    /\.(mp4|mkv|mov|avi|mp3)$/i.test(file.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    });
  };

  if (!fileUrl) return null;

  return (
    <div className="file-preview w-[200px] h-[200px] p-2 border border-[#0077bc] bg-white mb-2">
      {isImage(file) && (
        <FilePreviewContent fileUrl={fileUrl}>
          <img
            src={fileUrl}
            alt="Preview"
            title="Image preview"
            className="object-cover w-full h-full"
          />
        </FilePreviewContent>
      )}
      {isPdf(file) && (
        <FilePreviewContent fileUrl={fileUrl}>
          <iframe
            src={fileUrl}
            title="PDF preview"
            className="w-full h-full border-none"
          />
        </FilePreviewContent>
      )}
      {isDocument(file) && (
        <FilePreviewContent fileUrl={fileUrl}>
          <iframe
            src={fileUrl}
            title="Document preview"
            className="w-full h-full border-none"
          />
        </FilePreviewContent>
      )}
      {isVideo(file) && (
        <FilePreviewContent fileUrl={fileUrl}>
          <video
            src={fileUrl}
            controls
            title="Video preview"
            className="w-full h-full"
          />
        </FilePreviewContent>
      )}
      {!isImage(file) && !isPdf(file) && !isDocument(file) && !isVideo(file) && (
        <p className="bg-white p-2 text-red-500">نوع الملف غير مدعوم</p>
      )}
      <div>
        <input
          type="text"
          placeholder={name || "اكتب اسم الملف"}
          className="w-full border border-[#0077bc] outline-none p-1"
          dir="rtl"
          onChange={handleNameChange}
          value={names[index] || ""}
        />
      </div>
    </div>
  );
};

export default PopFilePreviewForTenantsUnite;
