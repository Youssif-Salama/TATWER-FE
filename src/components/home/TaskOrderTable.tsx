import { GetAllOrdersApi } from "@/api/tasks/orders/GetAllOrdersApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SimpleOrdersTable = () => {
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);

  const getAllOrders = async () => {
    const result = await GetAllOrdersApi(setLoading, 1, 15, "", "");
    result && setAllOrders(result?.data?.data);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div dir="rtl" className="text-[14px]">
                   <div className="text-[12px] flex items-center justify-between">
                <p className="text-[#0077bc]">الطلبات</p>
                <Link to="/tasks/orders" className="bg-[#0077bc] px-4 py-1 rounded-md text-white">انتقل</Link>
              </div>
      <div className="overflow-auto rounded-md text-[12px]">
        <table className="table-auto border-collapse border border-gray-300 min-w-full">
          <thead>
            <tr className="bg-[#0077bc] text-white">
              <th className="px-4 py-2 border-b">رقم الطلب</th>
              <th className="px-4 py-2 border-b">نوع الطلب</th>
              <th className="px-4 py-2 border-b">اسم المستخدم</th>
              <th className="px-4 py-2 border-b">كلمه المرور</th>
              <th className="px-4 py-2 border-b">اخر من قام بالتعديل</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((order: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.OrderNumber ?? "-"}</td>
                  <td className="px-4 py-2">{order.OrderType ?? "-"}</td>
                  <td className="px-4 py-2">{order.UserName ?? "-"}</td>
                  <td className="px-4 py-2">{order.UserPassword ?? "-"}</td>
                  <td className="px-4 py-2">{new Date(order.OrderNotes[0].createdAt).toLocaleString() ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  لا يوجد طلبات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleOrdersTable;
