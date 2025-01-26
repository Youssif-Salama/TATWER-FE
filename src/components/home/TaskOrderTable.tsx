import { GetAllOrdersApi } from "@/api/tasks/orders/GetAllOrdersApi";
import { useEffect, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SimpleOrdersTable = () => {
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<Record<number, boolean>>({});

  const getAllOrders = async () => {
    const result = await GetAllOrdersApi(setLoading, 1, 10, "pending", "");
    result && setAllOrders(result?.data?.data);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const toggleNote = (index: number) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div dir="rtl" className="text-[14px]">
      <div className="text-[12px] flex items-center justify-between">
        <p className="text-[#0077bc]">الطلبات</p>
        <Link to="/tasks/orders" className="bg-[#0077bc] px-4 py-1 rounded-md text-white">
          انتقل
        </Link>
      </div>
      <div className="overflow-auto rounded-md text-[12px]">
        <table className="table-auto border-collapse border border-gray-300 min-w-full">
          <thead>
            <tr className="bg-[#0077bc] text-white">
              <th className="px-4 py-2 border-b">رقم الطلب</th>
              <th className="px-4 py-2 border-b">موقع الطلب</th>
              <th className="px-4 py-2 border-b">اسم المستخدم</th>
              <th className="px-4 py-2 border-b">كلمه المرور</th>
              <th className="px-4 py-2 border-b">اخر بالتعديل</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((order: any, index: number) => {
                const note = order?.OrderNotes[0]?.Note ?? "-";
                const isLongNote = note.length > 150;

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{order.OrderNumber ?? "-"}</td>
                    <td className="px-4 py-2">{order.OrderLocation ?? "-"}</td>
                    <td className="px-4 py-2">{order.UserName ?? "-"}</td>
                    <td className="px-4 py-2">{order.UserPassword ?? "-"}</td>
                    <td className="px-4 py-2 break-words max-w-10">
                      <p>
                        {isLongNote && !expandedNotes[index]
                          ? note.slice(0, 150) + "..."
                          : note}
                      </p>
                      {isLongNote && (
                        <button
                          onClick={() => toggleNote(index)}
                          className="text-[#0077bc] underline mt-1"
                        >
                          {expandedNotes[index] ? "عرض القليل" : "عرض المزيد"}
                        </button>
                      )}
                      <p>
                        {order?.OrderNotes[0]?.filePath && (
                          <div
                            onClick={() => {
                              window.open(
                                `${import.meta.env.VITE_BE_Domain}/${order?.OrderNotes[0]?.filePath}`,
                                "_blank"
                              );
                            }}
                          >
                            <IoImagesOutline className="text-[#0077bc]" />
                          </div>
                        )}
                      </p>
                    </td>
                  </tr>
                );
              })
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
