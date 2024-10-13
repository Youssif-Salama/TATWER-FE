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
import { AppDispatch } from "@/store/store"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { IoClose } from "react-icons/io5";
import { successToaster } from "@/utils/ReactToatify";
import { DeleteMultipleContractUnites } from "@/api/contractUnites/DeleteMultipleContractUnites";
import { setRefreshOnDeleteContractUnites } from "@/store/slices/GlobalSlice";

const DeleteContractUnite2Dialog = ({row,setCatchSelectedRows}:{row:any,setCatchSelectedRows:any}) => {
  const [loading, setLoading] = useState(false);
  const dispatch:AppDispatch=useDispatch();
  const deleteMultipleUnites=async()=>{
   let result=await DeleteMultipleContractUnites(row,setLoading,"tenant");
   result && dispatch(setRefreshOnDeleteContractUnites(Math.random()));
   result && successToaster("تم الحذف بنجاح");
   result && setCatchSelectedRows([]);
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
          <DialogClose className="text-lg absolute left-0 -top-4" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-start">
           هل انت متأكد من الحذف
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
          onClick={()=>{
            deleteMultipleUnites()
          }}
          type="button" className="text-white bg-red-500 hover:text-white rounded-lg hover:bg-red-400">{
            loading ? <LoadingSpinner color="text-white"/> : "حذف"
          }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteContractUnite2Dialog
