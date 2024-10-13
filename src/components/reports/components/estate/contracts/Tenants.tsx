import SystemsPagination from "@/components/systems/SystemsPagination";
import { useState } from "react";

const Tenants = ({
  currentEstate,
  tenants,
  tenantsTotalRows,
  setTenantsPage,
  tenantsPage,
  setClickedTenantId
}: any) => {
  const [whichTenant, setWhichTenant] = useState<any>(null);

  return (
    <div className="my-6">
      <div className="my-2">جميع عقود المؤجرين المرتبطه بالعقار</div>
      {tenants &&
        tenants?.map((tenant: any) => {
          return (
            <>
            {
              (tenant?.ContractId) &&
            <div className="text-[12px] flex items-center justify-between mb-6">
              <div className="grid-cols-5 gap-2 grid max-md:grid-cols-3 max-sm:grid-cols-2">
                <p
                  onClick={() => {
                    setWhichTenant(tenant);
                    setClickedTenantId(tenant?.ContractId?._id)
                  }}
                  className={`${
                    whichTenant?.ContractId?._id == tenant?.ContractId?._id &&
                    "border border-[#0077bc]"
                  } bg-[#0077bc64] px-4 p-2 cursor-pointer hover:bg-[#0077bc2f] transition-all duration-200 `}
                >
                  {tenant?.ContractId?.Name}-{tenant?.ContractId?.RelyOn}
                </p>
              </div>
            </div>
            }
            </>
          );
        })}
      <div className="flex items-end justify-end">
        <SystemsPagination
          totalRows={tenantsTotalRows}
          setPage={setTenantsPage}
          page={tenantsPage}
        />
      </div>
      {whichTenant && (
        <div className="my-6">
          <p className="mb-2">المعلومات الاساسيه عن المؤجر ووحدته</p>
          <div className="grid grid-cols-5 gap-2 max-md:grid-cols-3 max-sm:grid-cols-2">
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                الاسم
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.Name||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 الهويه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.Identity||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                البريد
              </p>
              <p className="p-1 min-w-[100px] text-[9px]">
                {whichTenant?.ContractId?.Email||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                مسجل علي
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.RelyOn||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                الجوال
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.Phone||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 جوال اخر
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.AdditionalPhone||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                تاريخ البدايه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.ContractReleaseDate?.slice(0, 10)||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                تاريخ النهايه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.ContractEndDate?.slice(0, 10)||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                نسخة العقد
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.ContractCopy||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                 رقم الضريبه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.TaxNumber||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                م.التمثيل
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.DocumentNumber||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                طرق الدفع
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.ContractId?.PaymentWay[whichTenant?.ContractId?.PaymentWay?.length-1]||"-"} اشهر
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
                {whichTenant?.UniteId?.UniteName||"-"}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 gap-2 shadow-md">
              <p className="bg-[#0077bc] text-white w-[100px] break-words p-1">
                المساحه
              </p>
              <p className="p-1 min-w-[100px]">
                {whichTenant?.UniteId?.UnitSpace||"-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
