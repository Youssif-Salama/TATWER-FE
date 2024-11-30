const Contract = ({contract,startDate,endDate,Estate,EstateAddress}:any) => {
  return (
    <div>
      <div className="text-[12px] flex items-center justify-between mb-6">
        <div>البيانات الاساسيه</div>
        <div className="flex items-center gap-2">
          {
            startDate &&
          <div>تاريخ البدء: {startDate}</div>
          }
          {
            endDate &&
          <div>تاريخ الانتهاء: {endDate}</div>
          }
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px] max-md:grid-cols-3 max-sm:grid-cols-2">
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">المؤجر</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.Name || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">الهويه</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.Identity || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم الجوال</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.Phone || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">جوال اخر</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.AdditionalPhone || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">البريد الالكتروني</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full break-words" dir="ltr">{contract?.Email || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">العنوان</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.AddressId?.Town || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم الوثيقه</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.DocumentNumber || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم الجوال</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.Mobile || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">جوال اخر</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.MobileNumber || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم م.التمثيل</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.RepresentationDocument || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">طريقه الدفع</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.PaymentWay || "-"} اشهر</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">الحساب البنكى</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{Estate?.Notes || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم الرخصه</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{Estate?.TitleDeedNumber || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">تاريخه</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.createdAt.slice(0,10) || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">رقم العقد</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.ContractNumber || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">يدايه العقد</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.ContractReleaseDate.slice(0,10) || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">نهايه العقد</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.ContractEndDate?.slice(0,10) || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">مرتبط بعقار</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{Estate?.EstateName || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">مدينه العقار</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{EstateAddress?.Town || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">مسجل علي</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.RelyOn || "-"}</div>
        </div>
        <div className="flex items-center  justify-center shadow-md">
          <div className="bg-[#0077bc] px-4 py-1 text-white h-full w-[40%]">الرقم الضريبي</div>
          <div className="bg-gray-100 px-4 py-1 w-[60%] h-full ">{contract?.TaxNumber || "-"}</div>
        </div>
      </div>
    </div>
  )
}

export default Contract
