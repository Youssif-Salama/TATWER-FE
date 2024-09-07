import { DeletePaymentWayApi } from "@/api/paymentWay/DeletePaymentWayApi";
import { GetAllPaymentWaysApi } from "@/api/paymentWay/GetAllPaymentWaysApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";

const PaymentTable = () => {
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { paymentWay } = useSelector((state: RootState) => state.GlobalReducer);

  const getAllPayments = async () => {
    const result: any = await GetAllPaymentWaysApi(setLoading);
    result && setAllPayments(result?.data?.data);
  };

  useEffect(() => {
    getAllPayments();
  }, [paymentWay]);

  const handleDeletePaymentWay = async (id: any) => {
    const result = await DeletePaymentWayApi(id);
    result && getAllPayments();
  };

  return (
    <div dir="rtl" className="w-full mt-6 p-4 text-[12px]">
      <h2 className="text-md font-bold mb-4 text-[#0077bc]">طرق الدفع</h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPayments.length > 0 ? (
            allPayments.map((payment: any) => (
              <div
                key={payment._id}
                className="bg-white border-2 border-[#0077bc] p-4 rounded-lg relative shadow-md"
              >
                <div
                  className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  onClick={() => handleDeletePaymentWay(payment._id)}
                >
                  <FaTrash className="text-[19px] border border-[#0077bc] p-1 bg-white rounded-full" />
                </div>
                <div className="text-lg font-semibold text-center text-[#0077bc]">
                  {payment.Way}
                </div>
                <div className="mt-4 text-center text-gray-600">شهرا</div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">لا يوجد طرق دفع</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
