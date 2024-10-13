import {  setRefreshFileUploaderInSendMessage } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import Message from "./Message";
import {  useState } from "react";
import AdminMessage from "./AdminMessage";

const MessagesBody = ({
  carryFiles,
  setCarryFiles,
  allMessages,
}: {
  carryFiles: any;
  setCarryFiles: any;
  allMessages: any;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentImageToDisplay, setCurrentImageToDisplay] = useState<any>(null);

  const handleFileRemove = (fileToRemove: File) => {
    if (carryFiles) {
      const updatedFiles = Object.values(carryFiles).filter(
        (file) => file !== fileToRemove
      );
      setCarryFiles(updatedFiles.length > 0 ? updatedFiles : null);
    }
  };


  return (
    <div className="bg-[#0077bc] h-[65vh] shadow-lg border relative w-full">
      {carryFiles && (
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1 bg-[#1f1f1f78] p-2 w-full h-full absolute top-0 z-[50] overflow-y-scroll">
          <div
            className="absolute top-2 left-2 text-white bg-red-500 rounded-full cursor-pointer"
            onClick={() => {
              setCarryFiles(null);
              dispatch(setRefreshFileUploaderInSendMessage(Math.random()));
              setCurrentImageToDisplay(null);
              document.querySelectorAll("input").forEach((input) => {
                input.value = "";
              })
            }}
          >
            <IoIosCloseCircle />
          </div>
          {carryFiles &&
            Object.values(carryFiles).length > 0 &&
            Object.values(carryFiles).map((file: any) => (
              <div className="relative w-[150px] h-[150px]">
                <div
                  className="absolute top-2 left-2 text-white bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleFileRemove(file)}
                >
                  <IoIosCloseCircle />
                </div>
                {file.type.includes("image") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                )}
                {file.type.includes("pdf") && (
                  <iframe
                    src={URL.createObjectURL(file)}
                    className="w-full h-full"
                  ></iframe>
                )}
                <button
                  className="bg-[#0077bc] text-white text-[12px] p-1 w-full absolute bottom-0 left-0"
                  onClick={() => {
                    const blobUrl = URL.createObjectURL(file);
                    window.open(blobUrl);
                  }}
                >
                  مشاهده
                </button>
              </div>
            ))}
        </div>
      )}
      {currentImageToDisplay && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#1f1f1f78] z-[50] overflow-y-scroll">
          <div
            className="absolute top-2 left-2 text-white bg-red-500 rounded-full cursor-pointer"
            onClick={() => {setCurrentImageToDisplay(null)
              setCarryFiles(null);
              dispatch(setRefreshFileUploaderInSendMessage(Math.random()));
              document.querySelectorAll("input").forEach((input) => {
                input.value = "";
              })
            }}
          >
            <IoIosCloseCircle />
          </div>

          <div className="w-full h-full flex items-center justify-center">
            {/* Render Image if not a PDF */}
            {!currentImageToDisplay.includes(".pdf") && (
              <img
                src={`${import.meta.env.VITE_BE_Domain}${currentImageToDisplay}`}
                alt="Displayed file"
                className="max-w-full max-h-full object-contain" // Adjust image to fit within the container
              />
            )}

            {/* Render PDF if the file type is PDF */}
            {currentImageToDisplay.includes(".pdf") && (
              <iframe
                src={`${import.meta.env.VITE_BE_Domain}${currentImageToDisplay}`}
                className="w-full h-full"
                title="PDF Viewer"
              ></iframe>
            )}
          </div>

          {/* Button to view the file in a new tab */}
          <button
            className="bg-[#0077bc] text-white text-[12px] p-2 absolute bottom-2 left-2 rounded"
            onClick={() => {
              window.open(`${import.meta.env.VITE_BE_Domain}${currentImageToDisplay}`, "_blank");
            }}
          >
            مشاهده
          </button>
        </div>
      )}
      <div className="bg-white border p-4 w-full h-full overflow-y-scroll">
        {allMessages?.map((item: any) => (
          <>
          {
            item.EmpId !==null ?
            <Message
            message={item}
            key={item.id}
            setCurrentImageToDisplay={setCurrentImageToDisplay}
            />:<AdminMessage message={item} key={item.id}  setCurrentImageToDisplay={setCurrentImageToDisplay}/>
          }
          </>
        ))}
      </div>
    </div>
  );
};

export default MessagesBody;
