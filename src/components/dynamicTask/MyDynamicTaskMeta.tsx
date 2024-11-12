import FilePreview from '@/common/FilePreview';
 // @ts-ignore
import { useEffect, useState } from 'react';
import { CgMoreR, CgClose } from 'react-icons/cg';

const MyDynamicTaskMeta = ({ currentTask ,currentTaskFiles}: { currentTask: any,currentTaskFiles:any }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };




  return (
    <div className="mb-4 p-4 bg-gray-100 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between text-[#0077bc]">
        <h3 className="text-[12px] font-semibold">تفاصيل المهمة</h3>
        {isVisible ? (
          <CgClose
            className="text-[#0077bc] cursor-pointer hover:text-[#005fa3] transition-colors duration-300"
            onClick={toggleVisibility}
          />
        ) : (
          <CgMoreR
            className="text-[#0077bc] cursor-pointer hover:text-[#005fa3] transition-colors duration-300"
            onClick={toggleVisibility}
          />
        )}
      </div>
      {isVisible && (
        <div className="space-y-4 mt-4 flex flex-col w-full">
  <div className="bg-gray-100 text-white p-3 flex items-center justify-between gap-2 ">
    <p className="text-sm font-medium">مهمة:</p>
    <p className="text-sm truncate">{currentTask?.Title}</p>
  </div>
  <div className="flex flex-col gap-1">
    <p className="text-sm font-medium text-gray-700">وصف:</p>
    <p className="text-sm text-gray-600 break-words">{currentTask?.Description}</p>
  </div>
  <div className="flex items-center gap-2">
    <p className="text-sm font-medium text-gray-700">تاريخ البدء:</p>
    <p className="text-sm text-gray-600">{currentTask?.StartDate?.slice(0, 10)}</p>
  </div>
  <div className="flex items-center gap-2">
    <p className="text-sm font-medium text-gray-700">تاريخ الاستحقاق:</p>
    <p className="text-sm text-gray-600">{currentTask?.LastAskDate?.slice(0, 10)}</p>
  </div>
  <div className="flex flex-col gap-1">
    <p className="text-sm font-medium text-gray-700">المعينون:</p>
    <div className='flex items-center gap-2 flex-wrap'>
    {currentTask?.AssigneeId?.map((item: any) => (
      <p key={item} className="text-sm text-gray-600 truncate">{item?.Fname} {item?.Lname},</p>
    ))}
    </div>
  </div>

  <div>
  <p className="text-sm font-medium text-gray-700">الملفات:</p>
  <div className='flex items-center gap-2 flex-wrap'>
    {
      currentTaskFiles?.File?.map((file:any)=>{
        return (
          <div className='w-[200px]'>
           <FilePreview path={`${import.meta.env.VITE_BE_Domain}${file?.path}`}/>
          </div>
        )
      })
    }
  </div>
  <div className='mt-2 flex flex-col'>
  <p className="text-sm font-medium text-gray-700">الرساله:</p>
    <div className='break-words'>
    {
      currentTaskFiles?.FileMessage
    }
    </div>
  </div>
  </div>

</div>
      )}
    </div>
  );
};

export default MyDynamicTaskMeta;
