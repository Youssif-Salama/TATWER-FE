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

const AdminMessage = ({
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

  const formattedDate = message?.createdAt?.split("T").join(" ").slice(0, 19);

  // Determine the alignment and styles based on role
  const isAdmin = currentEmpData?.Role === "super_admin";
  const alignment = isAdmin ? "items-start" : "items-end";
  const flexDirection = isAdmin ? "flex-row-reverse" : "flex-row";
  const messageBoxStyles = isAdmin
    ? "rounded-br-none justify-start bg-[#8EACCD]"
    : "rounded-bl-none justify-end bg-[#8EACCD] text-[#fff]";
  const menuVisibility = isAdmin && !openMessageEdit ? "block" : "hidden";
   // @ts-ignore
  const userName = isAdmin ? "الادارة" : "انت"; // For non-admin, assuming "انت" (You)
  const filePreviewPosition = isAdmin ? "top-2 left-2" : "top-2 right-2";

  return (
    <div
      className={`w-full flex flex-col mb-4 ${alignment}`}
      key={key}
      ref={lastMessage}
    >
      <div
        className={`flex gap-1 max-md:w-[60%] w-[30%] relative ${flexDirection}`}
      >
        <div
          className={`flex p-2 rounded-xl break-words w-full text-white text-[12px] ${messageBoxStyles}`}
        >
          {message?.Message}
          {message?.FileId && (
            <div
              className={`grid w-full gap-2 ${
                message?.FileId?.File?.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {message?.FileId?.File?.map((file: any) => (
                <div key={file._id} className="relative">
                  <div className="w-full rounded-xl overflow-hidden">
                    <FilePreview path={`${import.meta.env.VITE_BE_Domain}${file?.path}`} />
                  </div>
                  <div className="text-[12px] break-words w-full">
                    {message?.FileId?.FileMessage}
                  </div>
                  <div
                    className={`bg-white p-1 absolute rounded-full cursor-pointer ${filePreviewPosition}`}
                    onClick={() => {
                      const imageFormats = ["pdf", "jpg", "png", "jpeg", "webp", "svg"];
                      if (imageFormats.some(format => file.path.includes(format))) {
                        setCurrentImageToDisplay(file.path);
                      }
                    }}
                  >
                    <FaEye className={`${isAdmin ? "text-[#8EACCD]" : ""}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`p-1 cursor-pointer absolute top-0 h-[150px] ${isAdmin ? "-left-7" : "hidden"}`}
        >
          <BsThreeDotsVertical
            className="text-[#8EACCD]"
            onClick={() => setOpenMessageEdit(!openMessageEdit)}
          />
          <div
            className={`text-[12px] bg-[#8EACCD] absolute top-[15%] right-0 p-1 px-3 mt-1 rounded-xl text-white ${menuVisibility}`}
          >
            <p
              onClick={async () => {
                if (message?.EmpId?._id === currentEmpData?._id || isAdmin) {
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

      <div className={`text-[#fff] py-1 flex items-center gap-2 ${currentEmpData?.Role!=="super_admin" ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`border rounded-full px-3 py-1 bg-[#8EACCD]`}>
          <div className="text-[10px]">الادارة</div>
        </div>
        <div className="text-gray-700 text-[10px]">{formattedDate}</div>
      </div>
    </div>
  );
};

export default AdminMessage;
