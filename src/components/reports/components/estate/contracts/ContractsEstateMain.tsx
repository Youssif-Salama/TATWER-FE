import { useEffect, useState } from "react";
import Tenants from "./Tenants";
import Lanlords from "./Lanlords";
import { GetContractSystemsApi } from "@/api/systems/GetContractSystemsApi";
import SystemsPagination from "@/components/systems/SystemsPagination";
import TenantsSystems from "./systems/TenantsSystems";
import { GetSystemsPaymentInfoApi } from "@/api/systems/GetSystemsPaymentInfoApi";
import Export from "../Export";

const ContractsEstateMain = ({
  currentEstate,
  allTenants,
  allLandlords,
  setTenantsPage,
  setLandlordsPage,
  tenantsPage,
  landlordsPage,
  tenantsTotalRows,
  landlordsTotalRows,
}: any) => {
  const [tenants, setTenants] = useState<any>([]);
  const [landlords, setLandlords] = useState<any>([]);
  const [tenantSystemTotalRows, setTenantSystemTotalRows] = useState<number>(0);
  const [landlordSystemTotalRows, setLandlordSystemTotalRows] =
    useState<number>(0);
  const [tenantsSystemsPage, setTenantsSystemsPage] = useState<number>(1);
  const [landlordsSystemsPage, setLandlordsSystemsPage] = useState<number>(1);
  const [tenantSystems, setTenantSystems] = useState<any>([]);
  const [landlordSystems, setLandlordSystems] = useState<any>([]);

  const [tenantSystemsForPrinting, setTenantSystemsForPrinting] = useState<any>([]);
  const [landlordSystemsForPrinting, setLandlordSystemsForPrinting] = useState<any>([]);
  const [tenantSystemsPageForPrinting, setTenantSystemsPageForPrinting] = useState<number>(1);
  const [landlordSystemsPageForPrinting, setLandlordSystemsPageForPrinting] = useState<number>(1);

  const [clickedTenantId, setClickedTenantId] = useState<any>(null);
  const [clickedLandlordId, setClickedLandlordId] = useState<any>(null);

  const [paymentTenantInfo, setPaymentTenantInfo] = useState<any>(null);
  const [paymentLandlordInfo, setPaymentLandlordInfo] = useState<any>(null);
  const [sprintsTenantInfo, setSprintsTenantInfo] = useState<any>(null);
  const [sprintsLandlordInfo, setSprintsLandlordInfo] = useState<any>(null);

  useEffect(() => {
    allTenants && setTenants(allTenants);
    allLandlords && setLandlords(allLandlords);
  }, [allLandlords, allTenants]);

  const getAllSystemsForSpecificTenant = async () => {
    const result = await GetContractSystemsApi(
      clickedTenantId,
      tenantsSystemsPage,
      10
    );
    result && setTenantSystems(result?.data?.data);
    result && setTenantSystemTotalRows(result?.data?.meta?.numberOfRows);
  };

  const getAllSystemsForSpecificTenantForPrinting = async () => {
    const result = await GetContractSystemsApi(
      clickedTenantId,
      tenantSystemsPageForPrinting,
      10
    );

    if (result) {
      setTenantSystemsForPrinting((prev:any) => {
        // Create a Set to track existing system IDs
        const existingIds = new Set(prev.map((item:any) => item._id));

        // Filter and add new unique systems based on _id
        const newSystems = result.data.data.filter((item:any) => {
          return !existingIds.has(item._id);
        });

        // Combine existing systems with new unique systems
        return [...prev, ...newSystems];
      });
    }
    (result?.data?.meta?.nextPage) && setTenantSystemsPageForPrinting(tenantSystemsPageForPrinting + 1);
  };

  useEffect(()=>{
    clickedTenantId && getAllSystemsForSpecificTenantForPrinting();
  },[tenantSystemsPageForPrinting,clickedTenantId]);

  useEffect(() => {
    clickedTenantId && getAllSystemsForSpecificTenant();
  }, [clickedTenantId, tenantsSystemsPage]);

  const getAllSystemsForSpecificLandlord = async () => {
    const result = await GetContractSystemsApi(
      clickedLandlordId,
      landlordsSystemsPage,
      10
    );
    result && setLandlordSystems(result?.data?.data);
    result && setLandlordSystemTotalRows(result?.data?.meta?.numberOfRows);
  };




  const getAllSystemsForSpecificLandlordForPrinting = async () => {
    const result = await GetContractSystemsApi(
      clickedLandlordId,
      landlordSystemsPageForPrinting,
      10
    );

    if (result) {
      setLandlordSystemsForPrinting((prev:any) => {
        // Create a Set to track existing system IDs
        const existingIds = new Set(prev.map((item:any) => item._id));

        // Filter and add new unique systems based on _id
        const newSystems = result.data.data.filter((item:any) => {
          return !existingIds.has(item._id);
        });

        // Combine existing systems with new unique systems
        return [...prev, ...newSystems];
      });
    }


    (result?.data?.meta?.nextPage) && setLandlordSystemsPageForPrinting(landlordSystemsPageForPrinting + 1);
  };

  useEffect(()=>{
    clickedLandlordId && getAllSystemsForSpecificLandlordForPrinting();
  },[ landlordSystemsPageForPrinting,clickedLandlordId]);



  useEffect(() => {
    clickedLandlordId && getAllSystemsForSpecificLandlord();
  }, [clickedLandlordId, landlordsSystemsPage]);

  const getPaymentInfoForTenant = async () => {
    const result = await GetSystemsPaymentInfoApi(clickedTenantId);
    result && setPaymentTenantInfo(result?.data?.data);
    result && setSprintsTenantInfo(result?.data?.sprints);
  };

  useEffect(() => {
    clickedTenantId && getPaymentInfoForTenant();
  }, [clickedTenantId]);

  const getPaymentInfoForLandlord = async () => {
    const result = await GetSystemsPaymentInfoApi(clickedLandlordId);
    result && setPaymentLandlordInfo(result?.data?.data);
    result && setSprintsLandlordInfo(result?.data?.sprints);
  };

  useEffect(() => {
    clickedLandlordId && getPaymentInfoForLandlord();
  }, [clickedLandlordId]);





  // preparing for priniting

  const currentEstateForPrint={
    "العقار": currentEstate?.EstateName,
    "رقم الوثيقه": currentEstate?.TitleDeedNumber,
    "مساحه العقار": currentEstate?.EstateSpace,
    "تاريخها": currentEstate?.createdAt?.slice(0, 10),
    "العنوان": currentEstate?.AddressId?.City,
    "رقم القطعه": currentEstate?.PieceNumber,
    "رقم المخطط": currentEstate?.PlanNumber
  }

  let [currentContratcTenantForPrint,setCurrentContratcTenantForPrint]=useState<any>(null);

  useEffect(()=>{
    if(clickedTenantId){
      const temp=tenants.find((item:any)=>item.ContractId?._id===clickedTenantId);
     if(temp){
      setCurrentContratcTenantForPrint({
        "الاسم": temp?.ContractId?.Name || "-",
        "الهويه": temp?.ContractId?.Identity || "-",
        "البريد": temp?.ContractId?.Email || "-",
        "مسجل علي": temp?.ContractId?.RelyOn || "-",
        "الجوال": temp?.ContractId?.Phone || "-",
        "جوال اخر": temp?.ContractId?.AdditionalPhone || "-",
        "تاريخ البدايه": temp?.ContractId?.ContractReleaseDate?.slice(0, 10) || "-",
        "تاريخ النهايه": temp?.ContractId?.ContractEndDate?.slice(0, 10) || "-",
        "نسخة العقد": temp?.ContractId?.ContractCopy || "-",
        "رقم الضريبه": temp?.ContractId?.TaxNumber || "-",
        "م.التمثيل": temp?.ContractId?.DocumentNumber || "-",
        "طرق الدفع": temp?.ContractId?.PaymentWay[temp?.ContractId?.PaymentWay?.length - 1] || "-" + " اشهر",
        "مدينه العقار": currentEstate?.AddressId?.City,
        "الوحده": temp?.UniteId?.UniteName || "-",
        "المساحه": temp?.UniteId?.UnitSpace || "-"
      })
     }
    }
  },[clickedTenantId]);


  let [currentContratcLandlordForPrint,setCurrentContratcLandlordForPrint]=useState<any>(null);

  useEffect(()=>{
    if(clickedLandlordId){
      const temp=landlords.find((item:any)=>item.ContractId?._id===clickedLandlordId)
      if(temp){
        setCurrentContratcLandlordForPrint({
          "الاسم": temp?.ContractId?.Name || "-",
          "الهويه": temp?.ContractId?.Identity || "-",
          "البريد": temp?.ContractId?.Email || "-",
          "مسجل علي": temp?.ContractId?.RelyOn || "-",
          "الجوال": temp?.ContractId?.Phone || "-",
          "جوال اخر": temp?.ContractId?.AdditionalPhone || "-",
          "تاريخ البدايه": temp?.ContractId?.ContractReleaseDate?.slice(0, 10) || "-",
          "تاريخ النهايه": temp?.ContractId?.ContractEndDate?.slice(0, 10) || "-",
          "نسخة العقد": temp?.ContractId?.ContractCopy || "-",
          "رقم الضريبه": temp?.ContractId?.TaxNumber || "-",
          "م.التمثيل": temp?.ContractId?.DocumentNumber || "-",
          "طرق الدفع": temp?.ContractId?.PaymentWay[temp?.ContractId?.PaymentWay?.length - 1] || "-" + " اشهر",
          "مدينه العقار": currentEstate?.AddressId?.City,
          "الوحده": temp?.UniteId?.UniteName || "-",
          "المساحه": temp?.UniteId?.UnitSpace || "-"
        })
      }
    }
  },[clickedLandlordId]);









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
  ];













  return (
    <div>
      {tenants && tenants?.length > 0 && (
        <>
          <Tenants
            tenants={tenants}
            tenantsTotalRows={tenantsTotalRows}
            setTenantsPage={setTenantsPage}
            tenantsPage={tenantsPage}
            currentEstate={currentEstate}
            setClickedTenantId={setClickedTenantId}
          />
          { (currentEstate && tenantSystemsForPrinting && clickedTenantId) && <div className="flex items-center justify-between">
        <p>تصدير</p>
        <p><Export keys={keys} headers={headers} currentEstate={currentEstateForPrint}
        name={"تطوير-تقرير-المؤجر -العقار"}
        currentContratcTenant={currentContratcTenantForPrint}
        tenantSystemsForPrinting={tenantSystemsForPrinting}
        sprints={sprintsTenantInfo}
        /></p>
      </div>}
          {tenantSystems && tenantSystems?.length > 0 && (
            <div>
              <div>
                <TenantsSystems allSystems={tenantSystems} />
              </div>
              <div className="my-6 flex items-start gap-6 justify-end">
                <div className="flex flex-col items-end gap-2 justify-end text-[10px]">
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      اجمالي قيمه العقد
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(paymentTenantInfo?.totalContractPrice)}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      المبالغ المدفوعة
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        paymentTenantInfo?.totalAppliedSystemsPrice
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      المتبقي من العقد
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        paymentTenantInfo?.totalNotAppliedSystemsPrice
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 justify-end text-[10px]">
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    عدد سنوات العقد                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(sprintsTenantInfo?.totalContractSprints)}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    السنوات المدفوعة                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        sprintsTenantInfo?.totalAppliedSystemSprints
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    عدد السنوات المتبقية                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        sprintsTenantInfo?.totalNotAppliedSystemSprints
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SystemsPagination
                  totalRows={tenantSystemTotalRows}
                  setPage={setTenantsSystemsPage}
                  page={tenantsSystemsPage}
                />
              </div>
            </div>
          )}
        </>
      )}
      {landlords && landlords?.length > 0 && (
        <>
          <Lanlords
            landlords={landlords}
            landlordsTotalRows={landlordsTotalRows}
            setLandlordsPage={setLandlordsPage}
            landlordsPage={landlordsPage}
            currentEstate={currentEstate}
            setClickedLandlordId={setClickedLandlordId}
          />
           { (currentEstate && landlordSystemsForPrinting && clickedLandlordId) && <div className="flex items-center justify-between">
        <p>تصدير</p>
        <p><Export keys={keys} headers={headers} currentEstate={currentEstateForPrint}
        name={"تطوير-تقرير-المستأجر -العقار"}
        currentContratcTenant={currentContratcLandlordForPrint}
        tenantSystemsForPrinting={landlordSystemsForPrinting}
        sprints={sprintsLandlordInfo}
        /></p>
      </div>}
          {landlordSystems && landlordSystems?.length > 0 && (
            <div>
              <div>
                <TenantsSystems allSystems={landlordSystems} />
              </div>
              <div className="my-6 flex items-start gap-6 justify-end">
                <div className="flex flex-col items-end gap-2 justify-end text-[10px]">
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      اجمالي قيمه العقد
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(paymentLandlordInfo?.totalContractPrice).toFixed(
                        4
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      المبالغ المدفوعة
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        paymentLandlordInfo?.totalAppliedSystemsPrice
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                      المتبقي من العقد
                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        paymentLandlordInfo?.totalNotAppliedSystemsPrice
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 justify-end text-[10px]">
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    عدد سنوات العقد                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(sprintsLandlordInfo?.totalContractSprints)}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    السنوات المدفوعة                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        sprintsLandlordInfo?.totalAppliedSystemSprints
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 shadow-md">
                    <div className="bg-[#0077bc] text-white px-2 py-1 w-[110px]">
                    عدد السنوات المتبقية                    </div>
                    <div className=" bg-gray-100 p-1 text-center w-[160px]">
                      {Number(
                        sprintsLandlordInfo?.totalNotAppliedSystemSprints
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SystemsPagination
                  totalRows={landlordSystemTotalRows}
                  setPage={setLandlordsSystemsPage}
                  page={landlordsSystemsPage}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContractsEstateMain;
