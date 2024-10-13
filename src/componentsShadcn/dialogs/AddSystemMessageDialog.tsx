import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/componentsShadcn/ui/dialog";

import { IoClose } from "react-icons/io5";
import { useState } from "react";
import LoadingSpinner from "@/common/LoadingSpinner";
import { AddSystemMessageApi } from "@/api/systems/AddSystemMessageApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { ApplyContractSystemApi } from "@/api/systems/ApplyContractSystemApi";
import { setRefreshOnApplyOrSetSystemMessage } from "@/store/slices/GlobalSlice";


const AddSystemMessageDialog = ({system,setDropdownOpen}:any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const dispatch:AppDispatch=useDispatch();
  const applyContractSystem = async () => {
    const data = { Applied: true };
    const result: any = await ApplyContractSystemApi(data, setLoading, system?._id);
    if (result) {
      dispatch(setRefreshOnApplyOrSetSystemMessage(Math.random()));
    }
  };
  const AddSystemMessage=async()=>{
    const data={message}
    const result=await AddSystemMessageApi(data,setLoading,system?._id);
    result && applyContractSystem();
    result && setDropdownOpen(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-0 m-0 border-0 outline-none"
        >
          تأكيد
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-sm mt-5 relative">
            <DialogClose className="text-lg absolute left-0 -top-7" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
            <div>
              <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message" id="message" rows={5} cols={50} className=" border rounded-md outline-[#0077bc] p-2 w-full" placeholder={system?.Message||"اترك رساله هنا"}></textarea>
            </div>

          </DialogTitle>
        </DialogHeader>
        <Button
          type="button"
          onClick={AddSystemMessage}
          className="text-white bg-[#0077bc] rounded-lg hover:bg-[#0078bdc7] w-full"
        >
          {loading ? <LoadingSpinner color="text-white" /> : "تأكيد مع اضافة الرسالة"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSystemMessageDialog;
