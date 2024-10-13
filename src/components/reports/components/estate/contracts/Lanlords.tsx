import SystemsPagination from "@/components/systems/SystemsPagination";
import { useState } from "react";

const Lanlords = ({
  currentEstate,
  landlords,
  landlordsTotalRows,
  setLandlordsPage,
  landlordsPage,
  setClickedLandlordId
}: any) => {
  const [whichLandlord, setWhichLandlord] = useState<any>(null);

  return (
    <div className="my-6">
      <div className="my-2">جميع عقود المستأجرين المرتبطه بالعقار</div>
      {landlords &&
        landlords?.map((landlord: any) => {
          return (
            <>
            {
              (landlord?.ContractId) &&
            <div className="text-[12px] flex items-center justify-between mb-6">
              <div className="grid-cols-5 gap-2 grid max-md:grid-cols-3 max-sm:grid-cols-2">
                <p
                  onClick={() => {
                    setWhichLandlord(landlord);
                    setClickedLandlordId(landlord?.ContractId?._id)
                  }}
                  className={`${
                    whichLandlord?.ContractId?._id == landlord?.ContractId?._id &&
                    "border border-[#0077bc]"
                  } bg-[#0077bc64] px-4 p-2 cursor-pointer hover:bg-[#0077bc2f] transition-all duration-200 `}
                >
                  {landlord?.ContractId?.Name}-{landlord?.ContractId?.RelyOn}
                </p>
              </div>
            </div>
            }
            </>
          );
        })}
      <div className="flex items-end justify-end">
        <SystemsPagination
          totalRows={landlordsTotalRows}
          setPage={setLandlordsPage}
          page={landlordsPage}
        />
      </div>
      {whichLandlord && (
        <div className="my-6">
          <p className="mb-2">المعلومات الاساسيه عن المستأجر ووحدته</p>
          <div className="grid grid-cols-5 gap-2 max-md:grid-cols-3 max-sm:grid-cols-2">
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                الاسم
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.Name||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 الهويه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.Identity||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                البريد
              </p>
              <p className="p-1 min-w-[100px] text-[9px]">
                {whichLandlord?.ContractId?.Email||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                مسجل علي
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.RelyOn||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                الجوال
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.Phone||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 جوال اخر
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.AdditionalPhone||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                تاريخ البدايه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.ContractReleaseDate?.slice(0, 10)||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                تاريخ النهايه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.ContractEndDate?.slice(0, 10)||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                نسخة العقد
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.ContractCopy||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 رقم الضريبه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.TaxNumber||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                م.التمثيل
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.DocumentNumber||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                طرق الدفع
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.ContractId?.PaymentWay[whichLandlord?.ContractId?.PaymentWay?.length-1]||"-"} اشهر
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 مدينه العقار
              </p>
              <p className="p-1 min-w-[100px]">
                {currentEstate?.AddressId?.City}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                الوحده
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.UniteId?.UniteName||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                المساحه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichLandlord?.UniteId?.UnitSpace||"-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lanlords;
