import PopPreviewUniteFiles from "@/common/PopPreviewUniteFiles";
import { useRef } from "react";
import { FaRegImages } from "react-icons/fa6";

const AddFiles = ({ Files, setFiles ,Names,setNames}: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files as FileList);

    // Filter out duplicate files
    const uniqueFiles = newFiles.filter(newFile =>
      !Files.some((existingFile:any) => existingFile.name === newFile.name)
    );

    // Update the state with unique files
    setFiles((prevFiles:any) => [...prevFiles, ...uniqueFiles]);
    setNames((prevNames:any) => [...prevNames, ...Array(uniqueFiles.length).fill('')]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (index: number) => {
    // @ts-ignore
    setFiles((prevFiles:any) => prevFiles.filter((_, i) => i !== index));
     // @ts-ignore
    setNames((prevNames:any) => prevNames.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <div>
      <div className="text-[12px] mb-4 text-[#0077bc]">اضافه ملفات جديده</div>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-1 text-[#0077bc] text-[12px] rounded p-2"
      >
        <FaRegImages className="text-[25px]" />
        <div>اضافه ملف</div>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1">
        {
          Files && Files?.map((file:any,index:number)=>{
            return <div className="my-4">
              <PopPreviewUniteFiles file={file} index={index} setNames={setNames} names={Names} handleDelete={handleDelete}/>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default AddFiles;
