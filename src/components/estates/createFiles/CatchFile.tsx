import { Input } from "@/componentsShadcn/ui/input";
import {
  handleOneFileChange,
  handleOneFileNameChange,
} from "@/methods/GlobalMethods";
import { useEffect, useRef, useState } from "react";
import { LuFiles } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button } from "@/componentsShadcn/ui/button";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
const CatchFile = ({
  catchAllFiles,
  catchAllNames,
  allFiles,
  allNames,
}: {
  catchAllFiles: any;
  catchAllNames: any;
  allFiles: any;
  allNames: any;
}) => {
  const [oneFile, catchOneFile] = useState<File | null>(null);
  const [oneFileName, catchONeFileName] = useState<string>("");
  const { refreshContractFiles } = useSelector(
    (state: RootState) => state.GlobalReducer
  );

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOneFileChange(e, catchOneFile);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOneFileNameChange(e, catchONeFileName);
  };

  const inputFileRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if(inputFileRef.current){
      inputFileRef.current.value=""
    }
  }, [refreshContractFiles]);

  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden break-words">
      <label
        htmlFor="file"
        className="w-full cursor-pointer flex items-center justify-center flex-col border-2 border-[#0077bc] shadow-lg p-4"
      >
        <LuFiles className="text-[#0077bc] text-[70px]" />
        <input
          accept=".png,.jpg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,mp3"
          // @ts-ignore
          ref={inputFileRef}
          type="file"
          id="file"
          className="hidden"
          onChange={handleInputFileChange}
        />
        <div className="text-[12px] mt-2 break-words">
          <span>يمكنك تحميل ملف واحد فقط لكل مره</span>
          <span>
            (.png,.jpg,.pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.mp4,.mp3)
          </span>
        </div>

        <div className="text-[12px] mt-2">
          <span className="text-red-500">*</span>
          <span className="opacity-75">لا تنس ادخال اسم الملف ثم التأكيد</span>
        </div>
      </label>
      {oneFile && (
        <div className="w-full shadow-lg border-2 border-[#0077bc] flex items-center p-4 gap-4 max-sm:flex-col">
          <div className="flex-1">
            <label
              htmlFor="fileName"
              className="text-[#0077bc] text-[12px] text-sm"
            >
              اسم الملف
            </label>
            <Input
              type="text"
              id="fileName"
              className="rounded-none w-full mx-auto placeholder:text-gray-400 text-[14px]"
              placeholder="اسم الملف"
              onChange={handleInputTextChange}
            />
          </div>
          <div className="flex-1 flex items-center justify-end ">
            <div className="flex items-center gap-2 relative  max-sm:flex-col-reverse">
              <div className="absolute top-0 right-0 flex items-center ">
                <div>
                  <MdDelete
                    className="text-white p-1 bg-red-500 cursor-pointer"
                    onClick={() => {
                      catchOneFile(null);
                    }}
                  />
                </div>
                <div>
                  <FaEye
                    className="text-white p-1 bg-[#0077bc] cursor-pointer"
                    onClick={() => {
                      const fileUrl = URL.createObjectURL(oneFile);
                      window.open(fileUrl, "_blank");
                    }}
                  />
                </div>
              </div>
              <div className="text-[#0077bc] text-[12px]">
                {oneFile.type ? oneFile.type : `${oneFile.size} kb`}
              </div>
              <LuFiles className="text-[#0077bc] text-[70px] max-sm:text-[50px]" />
            </div>
          </div>
        </div>
      )}
      {oneFile && (
        <Button
          className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
          onClick={() => {
            catchAllFiles([...allFiles, oneFile]);
            catchAllNames([...allNames, oneFileName]);
            catchOneFile(null);
            catchONeFileName("");
          }}
          disabled={oneFileName === ""}
        >
          التاكيد
        </Button>
      )}
    </div>
  );
};

export default CatchFile;
