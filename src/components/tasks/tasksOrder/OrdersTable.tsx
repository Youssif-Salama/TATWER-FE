import { UpdateOrderApi } from '@/api/tasks/orders/UpdateOrderApi';
import { successToaster } from '@/utils/ReactToatify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { IoImagesOutline } from 'react-icons/io5';

// @ts-ignore
const OrdersTable = ({ setRefreshOrders, headRef, data, setPage, setLimit, setToUpdateOrder }: any) => {
  const [note, setNote] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Track expanded states for each order's notes
  const [expandedNotes, setExpandedNotes] = useState<any>({});

  const addNote = async (id: any, OldOrderNotes: any) => {
    const formData = new FormData();
    formData.append('OrderNotes', JSON.stringify({ Note: note }));
    formData.append("OldOrdNote", JSON.stringify(OldOrderNotes));
    formData.append('orderImage', image);
    const result = await UpdateOrderApi(formData, setLoading, id);
    if (result) {
      setRefreshOrders(Math.random());
    }
  };

  // Toggle the expanded state of a specific note
  const toggleExpand = (orderId: any, noteIndex: number) => {
    setExpandedNotes((prevState: any) => ({
      ...prevState,
      [`${orderId}-${noteIndex}`]: !prevState[`${orderId}-${noteIndex}`],
    }));
  };

  return (
    <div dir="rtl" className='text-[14px] mt-4'>
      <h2 className="text-[#0077bc] font-bold mb-4">جدول الطلبات</h2>

      {/* Table wrapper with scrolling */}
      <div className="overflow-auto">
        <table className="table-auto border-collapse border border-gray-300 min-w-full">
          <thead>
            <tr className="bg-[#0077bc] text-white">
              <th className="px-4 py-2 border-b">رقم الطلب</th>
              <th className="px-4 py-2 border-b">موقع الطلب</th>
              <th className="px-4 py-2 border-b">الطلب مقدم باسم</th>
              <th className="px-4 py-2 border-b">نوع الطلب</th>
              <th className="px-4 py-2 border-b">اسم المستخدم</th>
              <th className="px-4 py-2 border-b">كلمة المرور</th>
              <th className="px-4 py-2 border-b">رقم الهاتف</th>
              <th className="px-4 py-2 border-b">تاريخ الطلب</th>
              <th className="px-4 py-2 border-b">سجل الحالات</th>
              <th className="px-4 py-2 border-b">اضافه حاله</th>
              <th className="px-4 py-2 border-b">حالة الطلب</th>
              <th className="px-4 py-2 border-b">الاعدادات</th>
              <th className="px-4 py-2 border-b">اخر من قام بالتعديل</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ?
              data.map((order: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.OrderNumber ?? "-"}</td>
                  <td className="px-4 py-2">{order.OrderLocation ?? "-"}</td>
                  <td className="px-4 py-2">{order.OrderName ?? "-"}</td>
                  <td className="px-4 py-2">{order.OrderType == "elec" ? "الكهرباء" : "المياه"}</td>
                  <td className="px-4 py-2">{order.UserName ?? "-"}</td>
                  <td className="px-4 py-2">{order.UserPassword ?? "-"}</td>
                  <td className="px-4 py-2">{order.OrderPhone ?? "-"}</td>
                  <td className="px-4 py-2">{new Date(order.OrderDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {/* Display order notes */}
                    {order.OrderNotes.map((note: any, noteIndex: number) => {
                      const isExpanded = expandedNotes[`${order._id}-${noteIndex}`];

                      return (
                        <div key={noteIndex} className='border p-1 rounded-md my-1 text-[12px] flex items-start justify-between gap-2'>
                          <p className='max-w-[200px] break-words'>
                            {isExpanded ? note?.Note : note?.Note?.slice(0, 16)}
                            {note?.Note?.length > 16 && (
                              <button
                                className='text-[10px] text-[#0077bc]'
                                onClick={() => toggleExpand(order._id, noteIndex)}
                              >
                                {isExpanded ? "عرض أقل" : "عرض المزيد"}
                              </button>
                            )}
                          </p>
                          {
                            note?.filePath && (
                              <div onClick={()=>{
                                window.open(`${import.meta.env.VITE_BE_Domain}/${note?.filePath}`,"_blank")
                              }}>
                                <IoImagesOutline className='text-[#0077bc]' />
                              </div>
                            )
                          }
                        </div>
                      );
                    })}
                  </td>
                  <td className="px-4 py-2 text-[12px]">
                    <textarea
                      name="note"
                      id="note"
                      className='min-w-[250px] p-1 border rounded-md'
                      placeholder='اكتب هنا لترك حاله جديده'
                      onChange={(e: any) => {
                        setNote(e.target.value);
                      }}
                    ></textarea>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className='w-full'
                      onChange={(e: any) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    <button
                      className='w-full bg-[#0077bc] text-white rounded-md mt-4 p-1 flex items-center justify-center'
                      onClick={() => {
                        addNote(order._id, order.OrderNotes);
                      }}
                    >
                      {loading ? <CgSpinner className='animate-spin' /> : "اضافه حاله"}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-[12px]">
                    {/* Status selector */}
                    <select
                      value={order.OrderStatus}
                      className="p-2 border border-gray-300 rounded-md"
                      onChange={async(e:any)=>{
                        const result=await axios.put(`${import.meta.env.VITE_BASE_URL}orders/${order?._id}`,{
                          OrderStatus:e.target.value
                        },{
                          headers:{
                            token:Cookies.get("token")
                          }
                        })
                        result && successToaster(result?.data?.message);
                        result && setRefreshOrders(Math.random());
                      }}
                    >
                      <option value="pending"

                      >قيد الانتظار</option>
                      <option value="complete"

                      >مكتمل</option>
                      <option value="cancelled"
                      >ملغى</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <div className='gap-1 flex flex-row'>
                      <button
                        onClick={() => {
                          setToUpdateOrder(order);
                          if (headRef.current) {
                            headRef.current.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-[#0077bc] text-white rounded-md p-1"
                      >
                        <BiEdit className='text-[14px]' />
                      </button>
                      {/* <button className="bg-red-500 text-white rounded-md p-1">
                        <BiTrash className='text-[14px]' />
                      </button> */}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                        {
                          order?.AddedBy?.Fname
                        }
                        {"-"}
                        {
                          order?.AddedBy?.Lname
                        }
                  </td>
                </tr>
              )) : <div className='w-full flex items-center justify-center'>لا يوجد طلبات</div>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
