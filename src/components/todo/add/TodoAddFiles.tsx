import { useState, useRef, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const TodoAddFiles = ({ formik, currentTaskFiles }: { formik: any, currentTaskFiles: any }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fixedFiles, setFixedFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle new file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [
        ...prevFiles,
        ...newFiles.filter(file => !prevFiles.some(prevFile => prevFile.name === file.name))
      ]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle file deletion
  const handleDeleteFile = (fileToDelete: File | any) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
  };


   // Handle fixed file deletion
   const handleDeleteFixedFile = (fileToDelete: File | any) => {
    setFixedFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
  };

  // Clear all files
  const handleClearAllFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (currentTaskFiles) {
      setFixedFiles(currentTaskFiles.File);
    }
  }, [currentTaskFiles]);

  useEffect(() => {
    formik.setFieldValue("File", files);
  }, [files]);

  useEffect(() => {
    formik.setFieldValue("FixedFiles",  JSON.stringify(fixedFiles) );
  }, [fixedFiles]);

  return (
    <div className="text-sm">
      <label htmlFor="file-upload" className="cursor-pointer">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="flex items-center gap-2">
          <FaImage className="w-10 h-10 text-[#0077bc]" />
          <span className="text-[#0077bc]">اضافه ملف</span>
        </div>
      </label>
      <div className="mt-4">
        {files.length > 0 && (
          <>
            <button
              type="button"
              onClick={handleClearAllFiles}
              className="mb-2 p-2 text-red-500 rounded"
            >
              حذف الكل
            </button>
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  <div className="border border-[#0077bc]">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover"
                    />
                    <button
                      className="bg-[#0077bc] text-white w-full p-1"
                      onClick={() => {
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL, '_blank');
                      }}
                    >
                      مشاهده
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFile(file)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full border border-gray-300"
                  >
                    <FaTrash className="text-red-600 text-[10px]" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-4">
        {fixedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fixedFiles.map((file, index) => (
              <div key={index} className="relative flex items-center gap-2">
                <div className="border border-[#0077bc]">
                  <img
                    src={`${import.meta.env.VITE_BE_Domain}${file.path}`}
                    alt={file.path}
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    className="bg-[#0077bc] text-white w-full p-1"
                    onClick={() => {
                      const fileURL = `${import.meta.env.VITE_BE_Domain}${file.path}`;
                      window.open(fileURL, '_blank');
                    }}
                  >
                    مشاهده
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFixedFile(file)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full border border-gray-300"
                >
                  <FaTrash className="text-red-600 text-[10px]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center mt-6">
        <label
          htmlFor="FileMessage"
          className="text-[#0077bc] text-[12px] text-sm"
        >
          الوصف
        </label>
        <textarea
          name="FileMessage"
          id="FileMessage"
          placeholder="ادخل الوصف هنا"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FileMessage}
          rows={3}
          className="rounded-none w-full px-2 py-2 mx-auto placeholder:text-gray-400 text-[14px] border-2"
        />
      </div>
    </div>
  );
};

export default TodoAddFiles;
