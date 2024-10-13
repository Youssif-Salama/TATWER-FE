import { DeleteObjectApi } from "@/api/objects/DeleteObjectApi";
import { GetAllObjectApi } from "@/api/objects/GetAllObjectApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import AddObjectDialog from "@/componentsShadcn/dialogs/AddObjectDialog";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaCircleExclamation, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ObjectTable = () => {
  const [allObjects, setAllObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { resfreshObjects } = useSelector((state: RootState) => state.GlobalReducer);

  const getAllObjects = async () => {
    const result: any = await GetAllObjectApi(setLoading);
    result && setAllObjects(result?.data?.data);
  };

  useEffect(() => {
    getAllObjects();
  }, [resfreshObjects]);

  const handleDeleteObject = async (id: any) => {
    const result = await DeleteObjectApi(id);
    result && getAllObjects();
  };

  const token = Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const tokenData = decodeToken(token);
      setDecodedToken(tokenData);
    }
  }, [token]);

  const [openDescriptionId, setOpenDescriptionId] = useState<string | null>(null);
  const exclamationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClickOutside = (e: MouseEvent) => {
    const clickedInsideAnyDescription = Object.values(exclamationRefs.current).some(ref => ref && ref.contains(e.target as Node));
    if (!clickedInsideAnyDescription) {
      setOpenDescriptionId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div dir="rtl" className="w-full mt-6 p-4 text-[12px]">
      <h2 className="text-md font-bold mb-4 text-center text-white bg-[#0077bc] p-2 w-full">الكيانات</h2>
      <div className={`my-2 ${(checkAuth(decodedToken,"post",["settings","objects"]) ? "" : "hidden")}`}>
        <AddObjectDialog />
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={`${checkAuth(decodedToken,"get",["settings","objects"]) ? "" : "hidden"}`}>
          <div className={`
            ${checkAuth(decodedToken,"delete",["settings","objects"]) && "grid grid-cols-3 gap-2"}
            w-full flex flex-col gap-2`}>
            {allObjects.map((object: any) => (
              <div
                key={object._id}
                className={`

                  w-full flex justify-between border items-center p-2 bg-[#fff] rounded-md shadow-md`}
              >
                <div className={`
                  ${checkAuth(decodedToken,"delete",["settings","objects"]) && "justify-between w-full"}
                  flex items-center gap-2`}>
                  <p className="text-[#0077bc]">الاسم : {object.Name}</p>
                  <p className="text-[#8eaccd]"> الرمز : {object.Symbol}</p>
                  <p className="relative" ref={(el) => exclamationRefs.current[object._id] = el}>
                    <FaCircleExclamation
                      className="text-[#0077bc] opacity-65 cursor-pointer"
                      onClick={() => {
                        setOpenDescriptionId(openDescriptionId === object._id ? null : object._id);
                      }}
                    />
                    <div className={`absolute top-[115%] z-50 rounded-md shadow-md -left-full bg-white border px-2 ${openDescriptionId === object._id ? "block" : "hidden"}`}>
                      <p className="text-[#8eaccd] break-words max-w-[100px]">{object.Identity}</p>
                    </div>
                  </p>
                </div>
                <div className={`${checkAuth(decodedToken,"delete",["settings","objects"]) ? "" : "hidden"}`}>
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-300 mx-1"
                    onClick={() => handleDeleteObject(object._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            {allObjects.length === 0 && (
              <div className="py-4 h-[60vh] flex items-center justify-center">لا يوجد  كيانات</div>
            )}
          </div>
        </div>
      )}
            {(allObjects.length === 0 || allObjects === undefined) && (
              <div className="w-full flex items-center justify-center py-4 border bg-gray-100">لا يوجد كيانات</div>
            )}
    </div>
  );
};

export default ObjectTable;
