import React, { useEffect, useState } from "react";
import PopFilePreview from "@/common/PopFilePreview";
import { FaImage, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AddLandLordUniteFilesProps {
  setLandlordFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  landlordNames1: string[];
  landlordNames: string[];
  setLandlordNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddLandLordUniteFiles: React.FC<AddLandLordUniteFilesProps> = ({
  setLandlordFiles,
  landlordNames1,
  landlordNames,
  setLandlordNames,
}) => {
  const [catchedFiles, setCatchedFiles] = useState<FileList | null>(null);
  const [openLandlord,setOpenLandlord]=useState<boolean>(false);
  const {refreshonAddNewLanlordFiles}=useSelector((state:RootState)=>state.GlobalReducer);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCatchedFiles(e.target.files);
    }
  };



  useEffect(() => {
    if (catchedFiles) {
      setLandlordFiles(catchedFiles);
      setLandlordNames([...landlordNames, ...landlordNames1]);
    }
  }, [catchedFiles]);

  useEffect(()=>{
    if(refreshonAddNewLanlordFiles){
      setOpenLandlord(prev=>!prev);
      setLandlordNames([]);
      setCatchedFiles(null);
    }
  },[refreshonAddNewLanlordFiles])

  return (
    <div className="my-2">
       <p className=" text-[1p2x] text-[#0077bc] underline  cursor-pointer mb-4"
       onClick={()=>setOpenLandlord(prev=>!prev)}
       >اضافه ملفات لهذه الوحده</p>
      {
        openLandlord &&
        <div>
        <div className="flex items-center mb-4">
        <label
          htmlFor="files"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2  text-[#0077bc]">
          <FaImage className="text-2xl mr-2 text-[#0077bc] text-[25px]" />
          <div>اضافه ملفات</div>
          </div>
          <input
            type="file"
            multiple
            id="files"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4 max-h-[60vh] overflow-y-auto">
        {catchedFiles &&
          Array.from(catchedFiles).map((file, index) => (
            <div key={index} className="col-span-1 relative">
                 <FaTrash
        className="text-red-500 cursor-pointer absolute top-4 right-4 z-[50]"
        onClick={() => {
          // @ts-ignore
          setCatchedFiles((prevFiles:any) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
          })
        }}
      />
              <PopFilePreview
                names={landlordNames1}
                file={file}
                name={landlordNames[index] || ""}
                setNames={setLandlordNames}
                index={index}
              />
            </div>
          ))}
      </div>
        </div>
      }
    </div>
  );
};

export default AddLandLordUniteFiles;
