import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/componentsShadcn/ui/tooltip";
import { countResetDaysAndColors } from "@/methods/GlobalMethods";
 // @ts-ignore
import { AppDispatch } from "@/store/store";
import {  useState } from "react";
 // @ts-ignore
import { useDispatch } from "react-redux";
import clsx from "clsx";
import AddSystemMessageDialog from "@/componentsShadcn/dialogs/AddSystemMessageDialog";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddSystemWarningDialog from "@/componentsShadcn/dialogs/AddSystemWarningDialog";


const SystemCommonDiv = ({ system }: { system: any }) => {
  const dueDateGregorian = system?.LastAskDate ? new Date(system?.LastAskDate) : null;
  const remainingDays = dueDateGregorian
    ? countResetDaysAndColors(dueDateGregorian)
    : null;


  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);



  const remainingFormatted = (days: any) => {
    if (days > 365) {
      const years = Math.floor(days / 365);
      return `${years} عام`;
    } else if (days > 30) {
      const months = Math.floor(days / 30);
      return `${months} شهر`;
    } else {
      return `${days} يوم`;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };



  const items = [
    { id: 1, label: "رقم القسط", value: system?.SystemNumber },
    { id: 2, label: "الصفه", value: system?.ContractId?.Type === "tenant" ? "مؤجر" : "مستأجر" },
    { id: 3, label: "المدينه", value: system?.ContractId?.AddressId?.City || "-" },
    { id: 4, label: "الاسم/الشركه", value: system?.ContractId?.Name || system?.contractData?.Name },
    { id: 5, label: "مسجل علي", value: system?.ContractId?.RelyOn || system?.ContractData?.RelyOn },
    { id: 6, label: "نظام العقد ", value: system?.PaymentWay + " اشهر" },
    { id: 7, label: "المبلغ ", value: Number(system?.TotalPrice) },
    { id: 8, label: "رقم العقد", value: system?.ContractId?.ContractNumber || system?.contractData?.ContractNumber },
    { id: 9, label: "المشروع", value: system?.Estate?.EstateName || "_" },
    { id: 10, label: "تاريخه (م)", value: system?.LastAskDate?.slice(0, 10) },
    { id: 11, label: "تاريخه (ه)", value: system?.LastAskDateH?.slice(0, 10) },
    { id: 12, label: system.Applied ? "كان متبقي له" : "متبقي له", value: remainingFormatted(remainingDays?.days), color: remainingDays?.color },
    { id: 13, label: "الحاله", value: remainingDays?.situation, color: remainingDays?.color },
    { id: 15, label: "تذكير / تأكيد", dropdown: true }
  ].filter(item => !(system?.Applied && (item.id === 12 || item.id === 15 || item.id === 13)));

  return (
    <div className="relative w-full">
      <TooltipProvider>
        <div className={clsx("w-full border-2 flex overflow-x-auto text-[12px]", system?.Applied ? "border-slate-500 bg-slate-500" : "border shadow-md bg-white")}>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col w-full min-w-max">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={clsx("p-1 font-bold text-center truncate", system?.Applied ? "bg-gray-500 text-white" : "text-[#0077bc] bg-[#fff]")}>
                    {item.label}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={clsx("font-bold w-full p-1 text-center overflow-hidden whitespace-nowrap text-ellipsis", item.color || (system?.Applied ? "text-gray-500" : "text-gray-500"), system?.Applied && "bg-white text-gray-500")}>
                    { item.dropdown ? (
                      <div className="relative">
                        <div className="cursor-pointer w-full flex items-end justify-center pt-1" onClick={toggleDropdown}>
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {
                    item.label=="متبقي له" &&
                  <p>{remainingDays?.days} يوم</p>                  }
                     {
                    item.label!=="متبقي له" &&
                  <p>{item.value}</p>                  }
                  {
                    item.label=="تذكير / تأكيد" &&
                  <p>اضفط لفتح القائمة</p>                  }
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </TooltipProvider>

      {dropdownOpen && (
        <div className="absolute left-0 top-full bg-white border border-gray-300 mt-1 rounded shadow-lg z-10 text-[12px] text-[#0077bc]">
          <div className="p-2 cursor-pointer">
            <AddSystemWarningDialog system={system} />
          </div>
          <div className="p-2 cursor-pointer">
          <AddSystemMessageDialog system={system}  setDropdownOpen={setDropdownOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemCommonDiv;
