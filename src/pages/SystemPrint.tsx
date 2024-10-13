import SystemPrintMain from "@/components/systems/SystemPrintMain";
import { useState } from "react";

const SystemPrint = () => {
  // Use a different name instead of 'switch' to avoid conflicts with reserved keywords
  const [status, setStatus] = useState("paid");

  return (
    <div className="py-8">
      <div className="flex gap-2 mb-4">
        <p className={`${status === "paid" ? "bg-[#0077bc] text-white" : "bg-white text-[#0077bc]"} p-1 cursor-pointer`}
        onClick={()=>{
          setStatus("paid")
        }}
        >
          تم دفعها
        </p>
        <p className={`${status === "unpaid" ? "bg-[#0077bc] text-white" : "bg-white text-[#0077bc]"} p-1 cursor-pointer`}
        onClick={()=>{
          setStatus("unpaid")
        }}
        >
          لم يتم دفعها
        </p>
        <p className={`${status === "all" ? "bg-[#0077bc] text-white" : "bg-white text-[#0077bc]"} p-1 cursor-pointer`}
        onClick={()=>{
          setStatus("all")
        }}
        >
          الكل
        </p>
      </div>
      <div className="bg-[#0077bc] text-white p-1 text-center">طباعه الدفعات</div>
      <div>
        <SystemPrintMain    applied={status}/>
      </div>
    </div>
  );
};

export default SystemPrint;
