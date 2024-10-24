import { decodeToken } from "@/methods/GlobalMethods";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteMessageApi } from "@/api/messages/DeleteMessageApi";
import { setRefreshOnDeleteMessage } from "@/store/slices/GlobalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { socket } from "@/utils/Sokect.io";
import FilePreview from "@/common/FilePreview";

const Message = ({
  message,
  key,
  setCurrentImageToDisplay,
}: {
  message: any;
  key: any;
  setCurrentImageToDisplay: any;
}) => {
  const [currentEmpData, setCurrentEmpData] = useState<any>(null);
  const [openMessageEdit, setOpenMessageEdit] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const token = Cookies.get("token");
  const lastMessage = useRef<any>(null);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setCurrentEmpData(decodedToken);
      }
    }
  }, [token]);

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className={`w-full flex flex-col mb-4 ${
        message?.EmpId?._id == currentEmpData?._id
          ? "items-start"
          : " items-end"
      }
    `}
      key={key}
      ref={lastMessage}
    >
      <div
        className={`flex gap-1 relative  max-md:w-[60%] w-[30%] ${
          message?.EmpId?._id == currentEmpData?._id
            ? "flex-row"
            : "flex-row-reverse"
        } `}
      >
        <div
          className={` flex p-2 rounded-xl  break-words w-full  text-[12px] overflow-hidden
            ${
              message?.EmpId?._id == currentEmpData?._id
                ? "rounded-br-none justify-start text-white bg-[#0077bc]"
                : "rounded-bl-none  justify-end bg-slate-200 text-[#1f1f1f]"
            }
            `}
        >
          <p className="max-w-[100%] whitespace-wrap break-words">
            {message?.Message && message.Message.length > 100 ? (
              <span>
                {!openMessage
                  ? `${message.Message.substring(0, 100)}...`
                  : message.Message}
              </span>
            ) : (
              message?.Message
            )}
            {message?.Message && message.Message.length > 100 && (
              <span
                className="text-[10px] text-[#1f1f1f] hover:underline cursor-pointer mx-1"
                onClick={() => setOpenMessage(!openMessage)}
              >
                {!openMessage ? "عرض المزيد" : "عرض اقل"}
              </span>
            )}
          </p>
          <div className="w-full">
          {message?.FileId && (
            <div
              className={`grid w-full gap-2 ${
                message?.FileId?.File?.length > 1
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {message?.FileId?.File?.map((file: any) => (
                <div key={file._id} className="relative">
                  <div className="w-full rounded-xl overflow-hidden">
                    <FilePreview
                      path={`${import.meta.env.VITE_BE_Domain}${file?.path}`}
                    />
                  </div>
                  <div
                    className={`bg-white p-1 absolute  rounded-full cursor-pointer
              ${
                message?.EmpId?._id == currentEmpData?._id
                  ? "top-2 left-2"
                  : "top-2 right-2"
              }
              `}
                    onClick={() => {
                      if (
                        file.path.includes("pdf") ||
                        file.path.includes("jpg") ||
                        file.path.includes("png") ||
                        file.path.includes("jpeg") ||
                        file.path.includes("webp") ||
                        file.path.includes("svg")
                      ) {
                        setCurrentImageToDisplay(file.path);
                      }
                    }}
                  >
                    <FaEye
                      className={`
                 ${
                   message?.EmpId?._id == currentEmpData?._id
                     ? " text-[#0077bc]"
                     : ""
                 }
                `}
                    />
                  </div>
                </div>
              ))}

            </div>
          )}
            <div className="text-[12px] break-words w-full">
                    <p className="max-w-[100%] whitespace-wrap break-words">
                      {message?.FileId?.FileMessage &&
                      message?.FileId?.FileMessage.length > 100 ? (
                        <span>
                          {!openMessage
                            ? `${message?.FileId?.FileMessage.substring(
                                0,
                                100
                              )}...`
                            : message?.FileId?.FileMessage}
                        </span>
                      ) : (
                        message?.FileId?.FileMessage
                      )}
                      {message?.FileId?.FileMessage &&
                        message?.FileId?.FileMessage.length > 100 && (
                          <span
                            className="text-[10px] text-[#1f1f1f] hover:underline cursor-pointer mx-1"
                            onClick={() => setOpenMessage(!openMessage)}
                          >
                            {!openMessage ? "عرض المزيد" : "عرض اقل"}
                          </span>
                        )}
                    </p>
                  </div>
          </div>
        </div>

        <div
          className={`p-1 cursor-pointer absolute top-0 -left-8 h-[150px] ${
            message?.EmpId?._id == currentEmpData?._id &&
            currentEmpData?.Role !== "super_admin"
              ? ""
              : "hidden"
          }`}
        >
          <BsThreeDotsVertical
            className="text-[#0077bc]"
            onClick={() => {
              setOpenMessageEdit(!openMessageEdit);
            }}
          />
          <div
            className={`text-[12px]
            bg-[#0077bc] absolute top-[15%] right-0 p-1 px-3 mt-1 rounded-xl text-white ${
              openMessageEdit && "hidden"
            }`}
          >
            <p
              onClick={async () => {
                if (
                  message?.EmpId?._id == currentEmpData?._id &&
                  currentEmpData?.Role == "employee"
                ) {
                  await DeleteMessageApi(message._id);
                  setOpenMessageEdit(!openMessageEdit);
                  dispatch(setRefreshOnDeleteMessage(Math.random()));
                  socket.emit("messageSent", "refresh now");
                } else if (currentEmpData?.Role == "super_admin") {
                  await DeleteMessageApi(message._id);
                  setOpenMessageEdit(!openMessageEdit);
                  dispatch(setRefreshOnDeleteMessage(Math.random()));
                  socket.emit("messageSent", "refresh now");
                }
              }}
            >
              حذف
            </p>
          </div>
        </div>
      </div>

      <div
        className={`text-[#fff] py-1 flex  items-center gap-2
        ${
          message?.EmpId?._id == currentEmpData?._id
            ? "flex-row"
            : " flex-row-reverse"
        }
        `}
      >
        <div
          className={`border rounded-full px-3 py-1
         ${
           message?.EmpId?._id == currentEmpData?._id
             ? " bg-[#0077bc]"
             : " bg-slate-200 text-[#1f1f1f]"
         }
         `}
        >
          <div className="text-[10px]">
            {message?.EmpId?._id == currentEmpData?._id
              ? "انت"
              : message?.EmpId?.Fname + " " + message?.EmpId?.Lname}
          </div>
        </div>
        <div className="text-gray-700 text-[10px]">
          {message?.createdAt?.split("T").join(" ").slice(0, 19)}
        </div>
      </div>
    </div>
  );
};

export default Message;
