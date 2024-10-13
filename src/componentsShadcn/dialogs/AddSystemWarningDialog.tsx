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
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/common/LoadingSpinner";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setRefreshOnApplyOrSetSystemMessage } from "@/store/slices/GlobalSlice";
import { handSendEmailApi } from "@/api/email/handSendEmailApi";
import { GetAllRemindingsApi } from "@/api/remindings/GetAllRemindingsApi";


const AddSystemWarningDialog = ({system}:any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const dispatch:AppDispatch=useDispatch();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const AddSystemMessage=async()=>{
    const data={message,systemId:system?._id}
    const result:any=await handSendEmailApi(data,setLoading);
    result && dispatch(setRefreshOnApplyOrSetSystemMessage(Math.random()));
  }

  const redirectToWhatsApp = (phoneNumber:any, message:any) => {
    const modifiedMessage=`
    شركه تطوير البوادي العقاريه
    رساله تنويه بتسديد الدفعه رقم ${system?.SystemNumber}
    تاريخ اليوم ${new Date().toLocaleDateString()}
    ${message}
    اخر موعد علي التسديد ${system?.DueDate?.slice(0,10)}
    `
    const encodedMessage = encodeURIComponent(modifiedMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank'); // Open in a new tab
  };

  const today=new Date();

  const [requiredRemindingFormat, setRequiredRemindingFormat] = useState<string>("");
  const getAllRemindingsFormats=async()=>{
    const result=await GetAllRemindingsApi();
    if(result){
      let temp=result?.data?.data;
      // @ts-ignore
      const days=new Date(system?.DueDate)-today;

      if(days/ (1000 * 60 * 60 * 24)>=30){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==30;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);

      }
      else if(days/ (1000 * 60 * 60 * 24)<30 && days/ (1000 * 60 * 60 * 24)>=15){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==15;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
      else if(days/ (1000 * 60 * 60 * 24)<15 && days/ (1000 * 60 * 60 * 24)>=7){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==15;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
      else if(days/ (1000 * 60 * 60 * 24)<7 && days/ (1000 * 60 * 60 * 24)>=0){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==7;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
      else if(days/ (1000 * 60 * 60 * 24)<0 && days/ (1000 * 60 * 60 * 24)>=-7){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==-4;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
      else if(days/ (1000 * 60 * 60 * 24)<-7 && days/ (1000 * 60 * 60 * 24)>=-15){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==-15;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
      else if(days/ (1000 * 60 * 60 * 24)<-15 && days/ (1000 * 60 * 60 * 24)>=-30){
        const desiredMessage=temp.filter((item:any)=>{
          return item?.RemindingTimeLine==-30;
        })
        setRequiredRemindingFormat(desiredMessage[0]?.RemindingMessage);
      }
    }

  }

  useEffect(()=>{
    getAllRemindingsFormats();
  },[])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-0 m-0 border-0 outline-none"
        >
           تذكير
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-sm mt-5 relative">
            <DialogClose className="text-lg absolute left-0 -top-7" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-red-500" />
              </button>
            </DialogClose>
           <div className="flex gap-4 flex-col items-start justify-start">
           <div className="text-red-500 text-[12px] underline cursor-pointer"
           onClick={()=>{
            if (messageRef.current) {
              messageRef.current.focus();
              messageRef.current.value = requiredRemindingFormat;
              setMessage(requiredRemindingFormat);
            }
           }}
           >
              استخدام التذكير المناسب للدفعه
            </div>
            <div>
              <textarea
              ref={messageRef}
              onChange={(e) => setMessage(e.target.value)}
              name="message" id="message" rows={5} cols={50} className=" border rounded-md outline-red-500 p-2 w-full" placeholder={system?.Message||"اترك رساله هنا"}></textarea>
            </div>
           </div>

          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
        <Button
          type="button"
          onClick={AddSystemMessage}
          className="text-white bg-red-500 rounded-lg rounded-l-none hover:bg-red-400 w-full"
        >
          {loading ? <LoadingSpinner color="text-white" /> : "تنويه عبر الايميل"}
        </Button>
        <Button
          type="button"
          onClick={()=>{
            redirectToWhatsApp(system?.ContractId?.Phone,message)
          }}
          className="text-white bg-red-500 rounded-lg rounded-r-none hover:bg-red-400 w-full"
        >
          {loading ? <LoadingSpinner color="text-white" /> : "تنويه عبر الواتساب"}
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSystemWarningDialog;
