import { useEffect, useRef, useState } from "react"
import OrderForm from "./OrderForm"
import { GetAllOrdersApi } from "@/api/tasks/orders/GetAllOrdersApi";
import OrdersTable from "./OrdersTable";
import SystemsPagination from "@/components/systems/SystemsPagination";
import OrderFilteration from "./OrderFilteration";
import Reports from "@/components/home/Reports";

const TasksOrders = () => {
  const [refreshOrders,setRefreshOrders]=useState<any>(1);
  const [toUpdateOrder,setToUpdateOrder]=useState<any>(null);
  const [allOrders,setAllOrders]=useState<any>([]);
  // @ts-ignore
  const [loading,setLoading]=useState<boolean>(false);
  const [page,setPage]=useState<any>(1);
  const [limit,setLimit]=useState<any>(10);
  const [meta, setMeta] = useState<any>(null);
  const headRef=useRef<any>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [status,setStatus]=useState<"pending"|"complete"|"all"|"cancelled">("all");

  const getAllOrders=async()=>{
    const result=await GetAllOrdersApi(setLoading,page,limit,status,searchValue);
    result&&setAllOrders(result?.data?.data);
    result&&setMeta(result?.data?.meta);
  }

  useEffect(()=>{getAllOrders()},[refreshOrders,page,limit,searchValue,status]);

  return (
    <div className="py-8 px-4 flex flex-col gap-4">
         <div className="mb-4">
            <Reports/>
            </div>
      {/* order head */}
      <div className="bg-[#0077bc] text-white text-center w-full p-2" ref={headRef}>اداره الطلبات</div>
      {/* form to add new order */}
      <OrderForm setToUpdateOrder={setToUpdateOrder} setRefreshOrders={setRefreshOrders} toUpdateOrder={toUpdateOrder}/>
      {/* filters & search */}
      <OrderFilteration setSearchValue={setSearchValue} setStatus={setStatus}
      searchValue={searchValue} status={status}/>
      {/* table to display orders */}
      <OrdersTable setRefreshOrders={setRefreshOrders} headRef={headRef} data={allOrders} setPage={setPage} setLimit={setLimit} setToUpdateOrder={setToUpdateOrder}/>
      {/* pagination */}
      <SystemsPagination totalRows={meta?.numberOfRows} setPage={setPage} page={page} rowsPerPage={limit} setRowsPerPage={setLimit}/>
    </div>
  )
}

export default TasksOrders
