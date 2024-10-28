import { DeleteRemindingsApi } from "@/api/remindings/DeleteRemindingsApi";
import { GetAllRemindingsApi } from "@/api/remindings/GetAllRemindingsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import AddRemindingsDialog from "@/componentsShadcn/dialogs/AddRemindingsDialog";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";

const RemindingsTable = () => {
  const [allRemindings, setAllRemindings] = useState<any[]>([]);
   // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const { refreshRemindings } = useSelector((state: RootState) => state.GlobalReducer);

  const getAllRemindings = async () => {
    const result: any = await GetAllRemindingsApi();
    result && setAllRemindings(result?.data?.data);
  };

  useEffect(() => {
    getAllRemindings();
  }, [refreshRemindings]);

  const handleDeleteObject = async (id: any) => {
    const result = await DeleteRemindingsApi(id);
    result && getAllRemindings();
  };

  const token = Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const tokenData = decodeToken(token);
      setDecodedToken(tokenData);
    }
  }, [token]);



  return (
    <div dir="rtl" className="w-full mt-6 p-4 text-[12px]">
      <h2 className="text-md font-bold mb-4 text-center text-white bg-[#0077bc] p-2 w-full">التذكيرات</h2>
      <div className={`my-2 ${checkAuth(decodedToken,"post",["settings","objects"]) ? "" : "hidden"}}`}>
        <AddRemindingsDialog />
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">

          {
            allRemindings && allRemindings?.map((item:any,index:number)=>{
              return <div className="rounded-md border shadow-md p-1 relative" key={index}>
                <div className="absolute px-2 -top-1 -right-1 rounded-full border bg-[#0077bc] text-white">
              {index+1}
                </div>
                <div className="bg-[#0077bc] rounded-md p-2 text-white flex items-center justify-between">
                <p>
                  {item?.RemindingTimeLine} ايام
                </p>
                <p className={`${checkAuth(decodedToken,"delete",["settings","objects"]) ? "" : "hidden"}}`}>
                  <FaTrash className="text-red-500 text-[10px] cursor-pointer"
                  onClick={()=>{
                    handleDeleteObject(item?._id)
                  }}
                  />
                </p>
                </div>
                <div className="text-gray-400 break-words p-1">
                  <p>
                    <span>المقدمه: </span>
                    <span>{item?.RemindingHead}</span>
                  </p>
                  <p>
                    <span>الرساله: </span>
                    <span>{item?.RemindingMessage}</span>
                  </p>
                  <p>
                    <span>الخاتمه: </span>
                    <span>{item?.RemindingTail}</span>
                  </p>
                </div>
              </div>
            })
          }
          </div>
          <div>
            {allRemindings.length === 0 && (
              <div className="py-4 h-[60vh] flex items-center justify-center">لا يوجد  تذكيرات</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindingsTable;
