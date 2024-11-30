const EstateMeta = ({estate,startDate,endDate}:any) => {

  return (
    <div className="flex items-center justify-center my-6 text-[16px] text-gray-500 font-semibold flex-col">
      <div className="flex items-center gap-2">
        {/* estate head */}
        <p>
          تقرير تفصيلي عن العقار
        </p>
        <p>
          {
            estate?.EstateName
          }
        </p>
      </div>
      <div className="flex items-center gap-2 text-[9px]">
        {/* estate dates */}

        {startDate &&<p>من تاريخ:{startDate?.slice(0,10)}</p>}
        {endDate&&<p>الي تاريخ:{endDate?.slice(0,10)}</p>}
      </div>
      <div className="text-[12px] grid grid-cols-5 gap-2 my-6 max-md:grid-cols-3 max-sm:grid-cols-2">
        {/* main data */}
             <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">العقار</p>
              <p className="p-1 min-w-[100px]">{estate?.EstateName}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">رقم الوثيقه</p>
              <p className="p-1 min-w-[100px]">{estate?.TitleDeedNumber}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">مساحه العقار</p>
              <p className="p-1 min-w-[100px]">{estate?.EstateSpace}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">تاريخها</p>
              <p className="p-1 min-w-[100px]">{estate?.createdAt?.slice(0,10)}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">العنوان</p>
              <p className="p-1 min-w-[100px]">{estate?.AddressId?.Town}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">رقم القطعه</p>
              <p className="p-1 min-w-[100px]">{estate?.PieceNumber}</p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">رقم المخطط</p>
              <p className="p-1 min-w-[100px]">{estate?.PlanNumber}</p>
            </div>

      </div>
    </div>
  )
}

export default EstateMeta
