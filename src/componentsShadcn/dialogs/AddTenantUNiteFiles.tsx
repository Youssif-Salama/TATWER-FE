import React, { useEffect, useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PopFilePreviewForTenantsUnite from "@/common/PopFilePreviewForTenantsUnite";

interface AddLandLordUniteFilesProps {
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  names: string[];
  tenantNames: string[];
  setTenantNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTenantUNiteFiles: React.FC<AddLandLordUniteFilesProps> = ({
  setFiles,
  names,
  tenantNames,
  setTenantNames,
}) => {
  const [catchedFiles, setCatchedFiles] = useState<FileList | null>(null);
  const [open,setOpen]=useState<boolean>(false);
  const {refreshonAddNewTenantFiles}=useSelector((state:RootState)=>state.GlobalReducer);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCatchedFiles(e.target.files);
    }
  };



  useEffect(() => {
    if (catchedFiles) {
      setFiles(catchedFiles);
      setTenantNames([...tenantNames, ...names]);
    }
  }, [catchedFiles]);

  useEffect(()=>{
    if(refreshonAddNewTenantFiles){
      setOpen(prev=>!prev);
      setTenantNames([]);
      setCatchedFiles(null);
    }
  },[refreshonAddNewTenantFiles])

  return (
    <div className="my-2">
       <p className=" text-[1p2x] text-[#0077bc] underline  cursor-pointer mb-4"
       onClick={()=>setOpen(prev=>!prev)}
       >اضافه ملفات لهذه الوحده</p>
      {
        open &&
        <div>
        <div className="flex items-center mb-4">
        <label
          htmlFor="tenantFiles"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2  text-[#0077bc]">
          <FaImage className="text-2xl mr-2 text-[#0077bc] text-[25px]" />
          <div>اضافه ملفات</div>
          </div>
          <input
            type="file"
            multiple
            id="tenantFiles"
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
              <PopFilePreviewForTenantsUnite
                names={names}
                file={file}
                name={tenantNames[index] || ""}
                setNames={setTenantNames}
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

export default AddTenantUNiteFiles;
