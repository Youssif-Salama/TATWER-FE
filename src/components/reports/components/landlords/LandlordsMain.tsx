import { useEffect, useMemo, useState } from "react";
import ReportsHead from "../../nav/ReportsHead";
import { GetAllSystemsForReports } from "@/api/reports/GetAllSystemsForReports";
import Contract from "./Contract";
import LoadingSpinner from "@/common/LoadingSpinner";
import SystemsPagination from "@/components/systems/SystemsPagination";
import { GetSystemsPaymentInfoApi } from "@/api/systems/GetSystemsPaymentInfoApi";
import { generateArabicExcelFromArray, generatePdfFromArray } from "@/methods/Print";
import LandlordsTable from "./LandlordsTable";
import LandlordsFilters from "./LandlordsFilters";

const LandlordsMain = () => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [tenant, setTenant] = useState<any>();
  const[allSystems,setAllSystems]=useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [paymentInfo,setPaymentInfo]=useState<any>(null);
  const [extraContent,setExtraContent]=useState<any>(null);
  const [allSystemsForPrint,setAllSystemsForPrint]=useState<any>([]);
   // @ts-ignore
  const [allLoading,setAllLoading]=useState<boolean>(false);
  const [allPage,setAllPage]=useState<number>(1);


  const getPaymentInfo=async()=>{
    const result=await GetSystemsPaymentInfoApi(tenant);
    result&&setPaymentInfo(result?.data?.data);
  }


  const getAllTenants=async()=>{
    const result=await GetAllSystemsForReports("landlord",tenant,setLoading,page,startDate,endDate);
    result&&setTotalRows(result?.data?.meta?.numberOfRows);
    result&&setAllSystems(result?.data?.data);
  }

  useEffect(()=>{
    getAllTenants();
    getPaymentInfo();
  },[startDate,endDate,tenant,page])


  useEffect(()=>{
    let temp={
        "المؤجر": allSystems[0]?.ContractId?.Name || "-",
        "الهويه": allSystems[0]?.ContractId?.Identity || "-",
        "الجوال رقم": allSystems[0]?.ContractId?.Phone || "-",
        "اخر جوال": allSystems[0]?.ContractId?.AdditionalPhone || "-",
        "الالكتروني البريد": allSystems[0]?.ContractId?.Email || "-",
        "العنوان": allSystems[0]?.ContractId?.AddressId?.City || "-",
        "الوثيقه رقم": allSystems[0]?.ContractId?.DocumentNumber || "-",
        "رقم م.التمثيل": allSystems[0]?.ContractId?.RepresentationDocument || "-",
        "الدفع طريقه": `${allSystems[0]?.ContractId?.PaymentWay || "-"} اشهر`,
        "البنكي الحساب": allSystems[0]?.Estate?.Notes || "-",
        "الرخصه رقم": allSystems[0]?.Estate?.TitleDeedNumber || "-",
        "تاريخه": allSystems[0]?.ContractId?.createdAt?.slice(0, 10) || "-",
        "العقد رقم": allSystems[0]?.ContractId?.ContractNumber || "-",
        "العقد بدايه ": allSystems[0]?.ContractId?.ContractReleaseDate?.slice(0, 10) || "-",
        "العقد نهايه ": allSystems[0]?.ContractId?.ContractEndDate?.slice(0, 10) || "-",
        "بعقار مرتبط ": allSystems[0]?.Estate?.EstateName || "-",
        "العقار مدينه": allSystems[0]?.EstateAddress?.City || "-",
        "علي مسجل": allSystems[0]?.ContractId?.RelyOn || "-",
        "الضريبي الرقم ": allSystems[0]?.ContractId?.TaxNumber || "-",
        "العقد قيمه اجمال ": Number(paymentInfo?.totalContractPrice) || "-",
        "المدفوعه المبالغ ": Number(paymentInfo?.totalAppliedSystemsPrice) || "-",
        "العقد من المتبقي  ": Number(paymentInfo?.totalNotAppliedSystemsPrice) || "-"
    }
    setExtraContent(temp);
  },[allSystems])

  const headers = [
    "الرمز",
    "رقم المسلسل",
    "قيمه الايجار بعد الضريبه",
    "المبالغ الثابته",
    "تاريخ الاصدار م",
    "تاريخ الاستحقاق م",
    "تاريخ الاصدار ه",
    "تاريخ الاستحقاق ه",
    "نظام العقد",
    "الحاله",
    "القيمه الكليه",
    "تاريخ اخر تذكير",
    // "ملاحظات"
  ];

  const keys = [
    "SystemNumber",
    "RentValue",
    "FixedPrice",
    "ReleaseDate",
    "DueDate",
    "ReleaseDateH",
    "DueDateH",
    "PaymentWay",
    "Applied",
    // "Message"
  ];


  const getAllSystemsForPrint = async () => {
    const result = await GetAllSystemsForReports("landlord", tenant, setAllLoading, allPage, startDate, endDate);

    // Check if result exists
    if (result) {
        setAllSystemsForPrint((prevData: any) => {
            const newData = result?.data?.data; // Ensure this accesses the correct data
            const seen = new Set();

            // Combine previous data with new data and filter for uniqueness
            const uniqueData = [...prevData, ...newData].filter((item: any) => {
                if (seen.has(item?._id)) {
                    return false; // Skip if already seen
                }
                seen.add(item?._id); // Add to seen set
                return true; // Keep unique item
            });

            return uniqueData; // Set the unique data
        });
    }
    // Check for next page
    if (result?.data?.meta?.nextPage) {
        setAllPage(allPage + 1);
    }
};


useEffect(() => {
  getAllSystemsForPrint();
}, [allPage, startDate, endDate,tenant]);


const dataToExport=useMemo(()=>{
  return allSystemsForPrint
},[allSystemsForPrint])



  return (
    <div className="py-8">
      <div>
        <ReportsHead message="تقارير عن المؤجرين " />
      </div>
      <div>
        {/* tenants filters */}
        <LandlordsFilters
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setTenant={setTenant}
          tenant={tenant}
        />
      </div>
      {
        loading ? <div className="h-[50vh] flex items-center justify-center"><LoadingSpinner/></div>:<>
        {
          (allSystems && allSystems.length>0 && allSystems[0]?.ContractId) ?<>
  <div>
        {/* contract */}
        <Contract contract={allSystems[0]?.ContractId} startDate={startDate} endDate={endDate} Estate={allSystems[0]?.Estate} EstateAddress={allSystems[0]?.EstateAddress}/>
      </div>
          </>:<div className="bg-gray-100 border p-4 flex items-center justify-center">لايوجد بيانات</div>
        }
        </>
      }

{
  (allSystems && allSystems.length>0 && allSystems[0]?.ContractId) &&<div className="flex items-center justify-end gap-x-1 mt-6">
  {/* printing */}
  <div>
    <button
    onClick={()=>{
      generatePdfFromArray(dataToExport,headers,keys,"A1","تطوير-تقرير-المستأجر",extraContent)
    }}
    className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">pdf</button>
  </div>
  <div>
    <button
    onClick={()=>{
      generateArabicExcelFromArray(dataToExport,headers,keys,"تطوير-تقرير-المستأجر",extraContent)
    }}
    className="bg-green-500 text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">excel</button>
  </div>
</div>
}

      <div className="my-6">
        {/* systems table */}
        {
           (allSystems && allSystems.length>0 && allSystems[0]?.ContractId) &&
        <LandlordsTable allSystems={allSystems}/>
        }
      </div>
        {
          (allSystems && allSystems.length>0 && allSystems[0]?.ContractId) &&<div className="flex items-end gap-1">
            {/* pagination */}
            <div>
            <SystemsPagination page={page} setPage={setPage} totalRows={totalRows}/>
            </div>
            <div className="text-[9px]">
              - {totalRows} -
            </div>
          </div>
        }
        {
          (allSystems && allSystems.length>0 && allSystems[0]?.ContractId) &&<div className="flex flex-col items-end gap-2 justify-end text-[10px]">
            <div className="flex items-center bg-gray-100 shadow-md">
              <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">اجمالي قيمه العقد</div>
              <div className=" bg-gray-100 p-1 text-center w-[160px]">{
                Number(paymentInfo?.totalContractPrice)
                }</div>
            </div>
            <div className="flex items-center bg-gray-100 shadow-md">
              <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">المبالغ المدفوعة</div>
              <div className=" bg-gray-100 p-1 text-center w-[160px]">{
                Number(paymentInfo?.totalAppliedSystemsPrice)
                }</div>
            </div>
            <div className="flex items-center bg-gray-100 shadow-md">
              <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">المتبقي من العقد</div>
              <div className=" bg-gray-100 p-1 text-center w-[160px]">{
                Number(paymentInfo?.totalNotAppliedSystemsPrice)
                }</div>
            </div>
          </div>
        }
    </div>
  );
};

export default LandlordsMain;