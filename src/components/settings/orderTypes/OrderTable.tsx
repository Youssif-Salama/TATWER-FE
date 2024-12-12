 // @ts-ignore
 import { DeleteOrderType } from "@/api/orderTypes/DeleteOrderType";
import { GetAllOrderTypes } from "@/api/orderTypes/GetAllOrderTypes";
 import LoadingSpinner from "@/common/LoadingSpinner";
import AddOrderTypeDialog from "@/componentsShadcn/dialogs/AddOrderTypeDialog";
 import { decodeToken } from "@/methods/GlobalMethods";
 import { checkAuth } from "@/methods/PageConditions";
 import { RootState } from "@/store/store";
 import Cookies from "js-cookie";
 import { useEffect, useRef, useState } from "react";
 import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";

 const OrderTable = () => {
   const [allOrderTypes, setAllOrderTypes] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const { orderType } = useSelector((state: RootState) => state.GlobalReducer);

   const getAllOrderTypes = async () => {
     const result: any = await GetAllOrderTypes(setLoading);
     result && setAllOrderTypes(result?.data?.data);
   };

   useEffect(() => {
     getAllOrderTypes();
   }, [orderType]);

   const handleDeleteOrderType = async (id: any) => {
     const result = await DeleteOrderType(id);
     result && getAllOrderTypes();
   };

   const token = Cookies.get("token");
   const [decodedToken, setDecodedToken] = useState<any>(null);

   useEffect(() => {
     if (token) {
       const tokenData = decodeToken(token);
       setDecodedToken(tokenData);
     }
   }, [token]);
  //  @ts-ignore
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
       <h2 className="text-md font-bold mb-4 text-center text-white bg-[#0077bc] p-2 w-full">انواع الطلبات</h2>
       <div className={`my-2 ${checkAuth(decodedToken,"post",["settings","objects"]) ? "" : "hidden"}`}>
         <AddOrderTypeDialog />
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
             {allOrderTypes.map((payment: any) => (
               <div
                 key={payment.id}
                 className={`

                   w-full flex justify-between border items-center p-2 bg-[#fff] rounded-md shadow-md`}
               >
                 <div className={`
                   ${checkAuth(decodedToken,"delete",["settings","objects"]) && "justify-between w-full"}
                   flex items-center gap-2`}>
                   <p className="text-[#0077bc]">الاسم : {payment.Name}</p>

                 </div>
                 <div className={`${checkAuth(decodedToken,"get",["settings","objects"]) ? "" : "hidden"}}`}>
                   <FaTrash
                     className="text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-300 mx-1"
                     onClick={() => handleDeleteOrderType(payment._id)}
                   />
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}
                 <div>
             {(allOrderTypes.length === 0 || allOrderTypes === undefined) && (
               <div className="w-full flex items-center justify-center py-4 border bg-gray-100">لا يوجد انواع طلبات</div>
             )}
           </div>
     </div>
   );
 };

 export default OrderTable;
