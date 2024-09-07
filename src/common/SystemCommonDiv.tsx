import { ApplyContractSystemApi } from '@/api/systems/ApplyContractSystemApi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/componentsShadcn/ui/tooltip';
import { countResetDaysAndColors } from '@/methods/GlobalMethods';
import { setRefreshOnApplyOrSetSystemMessage } from '@/store/slices/GlobalSlice';
import { AppDispatch } from '@/store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import AddSystemMessageDialog from '@/componentsShadcn/dialogs/AddSystemMessageDialog';

const SystemCommonDiv = ({ system }: { system: any }) => {
  const dueDateGregorian = system?.DueDate ? new Date(system?.DueDate) : null;
  const remainingDays = dueDateGregorian ? countResetDaysAndColors(dueDateGregorian) : null;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const applyContractSystem = async () => {
    const data = { Applied: true };
    const result: any = await ApplyContractSystemApi(data, setLoading, system?._id);
    if (result) {
      dispatch(setRefreshOnApplyOrSetSystemMessage(Math.random()));
    }
  };


  const items = [
    { id: 1, label: 'رقم القسط', value: system?.SystemNumber },
    { id: 2, label: 'الصفه', value: system?.ContractId?.Type === 'tenant' ? 'مؤجر' : 'مستأجر' },
    { id: 2, label: 'المدينه', value: system?.ContractId?.AddressId?.City || "-"},
    { id: 3, label: 'الاسم/الشركه', value: system?.ContractId?.Name || system?.contractData?.Name },
    { id: 4, label: 'مسجل علي', value: system?.ContractId?.RelyOn || system?.ContractData?.RelyOn },
    { id: 5, label: 'نظام العقد ', value: system?.PaymentWay },
    { id: 6, label: 'المبلغ ', value: system?.RentValue + system?.FixedPrice },
    { id: 7, label: 'رقم العقد', value: system?.ContractId?.ContractNumber || system?.contractData?.ContractNumber },
    { id: 8, label: 'المشروع', value: 'المشروع' },
    { id: 9, label: '  تاريخه (م)', value: system?.DueDate?.slice(0, 10) },
    { id: 10, label: '  تاريخه (ه)', value: system?.DueDateH?.slice(0, 10) },
    { id: 11, label: system.Applied ? 'كان متبقي له' : 'متبقي له', value: remainingDays?.days, color: remainingDays?.color },
    { id: 12, label: 'الحاله', value: remainingDays?.situation, color: remainingDays?.color },
    { id: 13, label: 'تأكيد الدفع', value: loading ? 'جاري ...' : 'تأكيد ', onClick: applyContractSystem },
    { id: 13, label: 'تذكير', value: loading ? 'جاري ...' : 'تذكير ', onClick: applyContractSystem },
    { id: 14, label: 'رساله', value:<AddSystemMessageDialog  system={system} />  },
  ].filter(item => !(system?.Applied && (item.id === 13 || item.id === 12 || item.id === 14)));

  return (
    <TooltipProvider>
      <div
        className={clsx(
          "w-full border-2 flex overflow-x-auto text-[12px]",
          system?.Applied ? "border-slate-500 bg-slate-500" : "border-[#0077bc] bg-white"
        )}
      >
        {items.map((item, index) => (
          <div key={index} className="flex flex-col w-full min-w-max">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={clsx(
                  "p-1  font-bold text-center text-white truncate",
                  system?.Applied ? "bg-gray-500 " : "bg-[#0077bc] "
                )}>
                  {item.label}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={clsx(
                    "font-bold w-full p-1 text-center overflow-hidden whitespace-nowrap text-ellipsis",
                    item.color ? item.color : (system?.Applied ? "text-gray-500" : "text-[#0077bc]"),
                    system?.Applied && "bg-white text-gray-500" // Change background color if applied
                  )}
                >
                  {item.onClick && !system?.Applied && item.id === 13 ? (
                    <p className="cursor-pointer" onClick={item.onClick}>
                      {item.value}
                    </p>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {item.value}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SystemCommonDiv;
