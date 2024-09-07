import { useEffect, useState } from "react";
import CatchFile from "./CatchFile";
import AddedFileList from "./AddedFileList";
import ShowFile from "./ShowFile";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ContractCurrentFiles from "./EstateCurrentFiles";
import { useSelector } from "react-redux";

export const  CreateEstateFiles= ()=> {

  const {refreshContractFiles}=useSelector((state:RootState)=>state.GlobalReducer);

  const [allFiles, setAllFiles] = useState<object[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [selectedFileToShow, setSelectedFileToShow] = useState<any>(null);

  const estateId = Cookies.get("estateId");
  const fileId = Cookies.get("fileId");
  const [loading, setLoading] = useState<boolean>(false);
  const addContractFile = async () => {
    let formData: any = new FormData();
    formData.append("estateId", estateId);
    formData.append("Names", JSON.stringify(names));
    allFiles.forEach((file: any) => {
      formData.append("File", file);
    });

    const result = await AddContractFileApi(setLoading, formData);
    result && setAllFiles([]);
    result && setNames([]);
  };



  useEffect(() => {
  }, [refreshContractFiles]);

  return (
    <>
      {
        <>
          <div
            className={`flex items-center justify-center min-h-screen ${
              estateId ? "hidden" : ""
            } border-2 border-gray-300`}
          >
            <div className="font-bold">
              <p className="text-[#0077bc]">
                لا يمكنك اضافه ملفات قبل اضافه العقد
              </p>
              <Link
                to="/contracts/create"
                className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center p-2 text-white"
              >
                الرجوع لاضافه عقد
              </Link>
            </div>
          </div>
          <div className={`${estateId ? "" : "hidden"}`}>
            <CatchFile
              catchAllFiles={setAllFiles}
              catchAllNames={setNames}
              allFiles={allFiles}
              allNames={names}
            />
            <div className="flex items-start gap-4 mt-6 max-md:flex-col w-full">
              <div className="flex justify-center p-4 border-2 border-[#0077bc] w-[50%] max-md:w-full shadow-md">
                {estateId && fileId ? (
                  <ContractCurrentFiles
                    allFiles={allFiles}
                    names={names}
                    setSelectedFileToShow={setSelectedFileToShow}
                    catchAllFiles={setAllFiles}
                    catchAllNames={setNames}
                    selectedFileToShow={selectedFileToShow}
                  />
                ) : allFiles.length == 0 ? (
                  <p className="opacity-75 text-sm">لا يوجد ملفات</p>
                ) : (
                  <AddedFileList
                    allFiles={allFiles}
                    names={names}
                    setSelectedFileToShow={setSelectedFileToShow}
                    catchAllFiles={setAllFiles}
                    catchAllNames={setNames}
                    selectedFileToShow={selectedFileToShow}
                  />
                )}
              </div>
              <div className="flex justify-center p-4 border-2 border-[#0077bc] w-[50%] max-md:w-full shadow-md">
                {(allFiles.length == 0 && !fileId) ? (
                  <p className="opacity-75 text-sm">لا يوجد ملفات لعرضها</p>
                ) : (
                  <ShowFile file={selectedFileToShow} />
                )}
              </div>
            </div>
          </div>
          {!fileId && (
            <Button
              disabled={!(allFiles.length > 0)}
              type="button"
              onClick={() => {
                addContractFile();
              }}
              className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner color="text-[#fff]" />
              ) : (
                "تسجيل ملغات العقد"
              )}
            </Button>
          )}
        </>
      }
    </>
  );
}
