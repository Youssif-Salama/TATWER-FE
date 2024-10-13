import { DeleteEstateFileApi } from "@/api/estateFile/DeleteEstateFileApi";
import { GetEstateFileApi } from "@/api/estateFile/GetEstateFileApi";
import { UpdateEstateFileApi } from "@/api/estateFile/UpdateEstateFileApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";
import { Input } from "@/componentsShadcn/ui/input";
import { setRefreshEstateFiles } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const EstateCurrentFiles = ({
  allFiles,
  names,
  setSelectedFileToShow,
  catchAllFiles,
  catchAllNames,
  selectedFileToShow,
}: {
  allFiles: any;
  names: any;
  setSelectedFileToShow: any;
  catchAllFiles: any;
  catchAllNames: any;
  selectedFileToShow: any;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { refreshEstateFiles } = useSelector(
    (state: RootState) => state.GlobalReducer
  );

  const estateId = Cookies.get("estateId");
  const [files, setFiles] = useState<any>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [FixedFiles, setFixedFiles] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingOnDelete, setLoadingOnDelete] = useState<boolean>(false);
  const estateFileId = Cookies.get("estateFileId");

  const [currentNames, setCurrentNames] = useState<string[]>([]);

  const GetEstateFileApiNow = async (id: any) => {
    const result = await GetEstateFileApi(id);
    setFiles(result?.data?.data[0].Files);
    result?.data?.data[0]?.Files.forEach((file: any) => {
      setCurrentNames([...currentNames, file.name]);
    });
  };

  useEffect(() => {
    if (estateId) {
      GetEstateFileApiNow(estateId);
    }
  }, [estateId, refreshEstateFiles]);

  useEffect(() => {
    setFixedFiles([...files]);
    setCurrentNames([...names]);
    setNewFiles([...allFiles]);
  }, [files, names, refreshEstateFiles, allFiles]);

  const updateContractFiles = async (data: any, id: any) => {
    const result = await UpdateEstateFileApi(setLoading, data, id);
    if (result) {
      catchAllFiles([]);
      catchAllNames([]);
      setFixedFiles([]);
      setCurrentNames([]);
      setNewFiles([]);
      setSelectedFileToShow(null);
    }
    result && dispatch(setRefreshEstateFiles(Math.random()));
  };

  return (
    <div className="w-full flex flex-col min-h-[70vh]">
      <div className="flex gap-4 flex-col">
        <div>
          <p className="text-sm opacity-75 bg-[#0077bc] text-white text-center p-1">
            الملفات القديمه
          </p>
          {FixedFiles?.length > 0 ? (
            FixedFiles.map((file: any, index: number) => (
              <div
                key={index}
                className="flex justify-between p-4 border-b-2 border-[#0077bc] w-full"
              >
                <p>
                  <p>
                    <Input
                      type="text"
                      placeholder={file?.name}
                      className="rounded-none border-2 border-[#0077bc]"
                      onChange={(e: any) => {
                        FixedFiles.forEach((fixedFile: any) => {
                          if (fixedFile.path == file.path) {
                            fixedFile.name = e.target.value;
                            setFixedFiles([...FixedFiles]);
                          }
                        });
                      }}
                    />
                  </p>
                </p>
                <div className="flex gap-2">
                  <button
                    className="p-1 px-2 text-white bg-[#0077bc]"
                    onClick={() => {
                      // window.open(`http://localhost:3000${file.path}`, "_blank");
                      setSelectedFileToShow(
                        `${import.meta.env.VITE_BE_Domain}${file.path}`
                      );
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="p-1 px-2 text-white bg-red-500"
                    onClick={() => {
                      if (
                        `${import.meta.env.VITE_BE_Domain}${file.path}` ===
                        selectedFileToShow
                      ) {
                        setSelectedFileToShow(null);
                      }
                      const updatedFiles = FixedFiles.filter(
                        (fixedFile: any) => fixedFile.path !== file.path
                      );
                      setFixedFiles(updatedFiles);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-sm opacity-75 my-6">
              لايوجد ملفات قديمه
            </p>
          )}
        </div>
        <div>
          <p className="text-sm opacity-75 bg-[#0077bc] text-white text-center p-1">
            الملفات الحاليه
          </p>
          {allFiles?.length > 0 ? (
            allFiles.map((file: any, index: number) => (
              <div
                key={index}
                className="flex justify-between p-4 border-b-2 border-[#0077bc] w-full"
              >
                <p>
                  <p className="py-2">{names[index]}</p>
                </p>
                <div className="flex gap-2">
                  <button
                    className="p-1 px-2 text-white bg-[#0077bc]"
                    onClick={() => {
                      // window.open(`http://localhost:3000${file.path}`, "_blank");
                      setSelectedFileToShow(file);
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="p-1 px-2 text-white bg-red-500"
                    onClick={() => {
                      catchAllFiles([
                        ...allFiles.slice(0, index),
                        ...allFiles.slice(index + 1),
                      ]);
                      catchAllNames([
                        ...names.slice(0, index),
                        ...names.slice(index + 1),
                      ]);
                      if (file == selectedFileToShow)
                        setSelectedFileToShow(null);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-sm opacity-75 my-6">
              لايوجد ملفات حاليه
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center ">
        <Button
          type="submit"
          className="mt-auto w-full bg-red-500 flex items-center justify-center rounded-none hover:bg-red-400 transition ease-in-out duration-300 transform flex items-center justify-center"
          onClick={async () => {
            catchAllFiles([]);
            catchAllNames([]);
            setSelectedFileToShow(null);
            const result = await DeleteEstateFileApi(
              setLoadingOnDelete,
              estateId
            );
            result && Cookies.remove("estateFileId");
            result && dispatch(setRefreshEstateFiles(Math.random()));
          }}
        >
          {loadingOnDelete ? (
            <LoadingSpinner color="text-white" />
          ) : (
            "حذف الملفات"
          )}
        </Button>
        <Button
          type="submit"
          className=" w-full bg-[#0077bc] flex items-center justify-center rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
          onClick={() => {
            let formData = new FormData();
            formData.append("Names", JSON.stringify(currentNames));
            formData.append("FixedFiles", JSON.stringify(FixedFiles));
            newFiles.forEach((file: any) => {
              formData.append("File", file);
            });
            updateContractFiles(formData, estateFileId);
          }}
        >
          {loading ? <LoadingSpinner color="text-white" /> : "تأكيد التعديلات"}
        </Button>
      </div>
    </div>
  );
};

export default EstateCurrentFiles;
