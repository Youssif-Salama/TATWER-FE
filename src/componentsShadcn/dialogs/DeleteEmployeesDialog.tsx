import LoadingSpinner from "@/common/LoadingSpinner"
import { Button } from "@/componentsShadcn/ui/button"
import { FaTrash } from "react-icons/fa";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog"
import {  setRefreshONDeleteEmployee } from "@/store/slices/GlobalSlice"
import { AppDispatch } from "@/store/store"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { IoClose } from "react-icons/io5";
import { DeleteMultipleEmployees } from "@/api/employee/DeleteMultipleEmployees";
import { successToaster } from "@/utils/ReactToatify";

const DeleteEmployeesDialog = ({row,setCatchSelectedRows}:{row:any,setCatchSelectedRows:any}) => {
  const [loading, setLoading] = useState(false);
  const dispatch:AppDispatch=useDispatch();
  const deletMultipleEmployees=async()=>{
   let result=await DeleteMultipleEmployees(row,setLoading);
   result && dispatch(setRefreshONDeleteEmployee(Math.random()));
   result && setCatchSelectedRows([]);
   result && successToaster("تم الحذف بنجاح");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button  className="bg-red-500 border-0 outline-0 rounded-md p-2 text-sm text-white"><FaTrash />
      </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="relative">
          <DialogClose className="text-lg absolute left-0 -top-2" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
            <div className="flex gap-2 py-4">
    <span>عدد العتاصر</span><span>{row.length}</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-start">
           هل انت متأكد من الحذف
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
          onClick={()=>{
            deletMultipleEmployees()
          }}
          type="button" className="text-white bg-red-500 hover:text-white rounded-lg hover:bg-red-400">{
            loading ? <LoadingSpinner color="text-white"/> : "حذف"
          }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEmployeesDialog
