import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
// @ts-ignore
import { JsonToExcel } from "react-json-to-excel";
import { decryptValue } from "@/utils/encrypt";
import Spreadsheet from "react-spreadsheet";



const DynamicContractExcel = () => {
  const [preparing, setPreparing] = useState(true);
  const [fileName, setFileName] = useState("ملف العقود من تطوير البوادي");
  const reportContractsExcel: any = localStorage.getItem("reportContractsExcel");
  const [decryptedData, setDecryptedData] = useState<any>([]);
  const [displayExcel, setDisplayExcel] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreparing(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const decryptData = decryptValue(reportContractsExcel);
    setDecryptedData(decryptData);
  }, [reportContractsExcel]);

  // Prepare data for Excel export
  const prepareExcelData = () => {
    return decryptedData.map((contract: any, index: number) => ({
      "نهايه العقد": contract?.ContractEndDate ? contract?.ContractEndDate.slice(0, 10) : "-",
      "مسجل علي": contract?.RelyOn || "-",
      "بدايه العقد": contract?.ContractReleaseDate ? contract?.ContractReleaseDate.slice(0, 10) : "-",
      "رقم الوكاله": contract?.DocumentNumber || "-",
      "رقم العقد": contract?.ContractNumber || "-",
      "جوال الممثل": contract?.MobileNumber || "-",
      "الممثل": contract?.Agent || "-",
      "المدينه": contract?.AddressId?.City || "-",
      "الحساب البنكي": contract?.BankAccount || "-",
      "العقار المرتبط": contract?.estate?.EstateName || "-",
      "الصفه": contract?.Type === "Tenant" ? "مؤجر" : "مستأجر",
      "جوال اخر": contract?.AdditionalPhone || "-",
      "الجوال": contract?.Mobile || "-",
      "الهويه": contract?.IdNumber || "-",
      "الاسم": contract?.Name || "-",
      "الرمز": index+1 || "-",
    }));
  };

  const transformedData = decryptedData.map((contract: any, index: number) => [
    { value: index + 1 || "-",readOnly:true },
    { value: contract?.Name || "-",readOnly:true },
    { value: contract?.IdNumber || "-",readOnly:true },
    { value: contract?.Mobile || "-",readOnly:true },
    { value: contract?.AdditionalPhone || "-",readOnly:true },
    { value: contract?.Type === "tenant" ? "مؤجر" : "مستأجر",readOnly:true },
    { value: contract?.estate?.EstateName || "-",readOnly:true },
    { value: contract?.BankAccount || "-",readOnly:true },
    { value: contract?.AddressId?.City || "-",readOnly:true },
    { value: contract?.MobileNumber || "-",readOnly:true },
    { value: contract?.ContractNumber || "-",readOnly:true },
    { value: contract?.DocumentNumber || "-",readOnly:true },
    { value: contract?.ContractReleaseDate ? contract?.ContractReleaseDate.slice(0, 10) : "-",readOnly:true },
    { value: contract?.RelyOn || "-",readOnly:true },
    { value: contract?.Agent || "-",readOnly:true },
    { value: contract?.ContractEndDate ? contract?.ContractEndDate.slice(0, 10) : "-",readOnly:true },
  ]);
  const columnLabels = ["الرمز", "الاسم","الهويه","الجوال","جوال اخر","الصفه","العقار المرتبط","الحساب البنكي","المدينه","الممثل","جوال الممثل","رقم العقد","رقم الوكاله","بدايه العقد","نهايه العقد","مسجل علي"];


  return (
    <div className="w-full" dir="rtl">
      <div className="flex flex-col gap-4 py-4">
        {preparing ? (
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-2 shadow-md border w-full max-w-lg p-4 ">
            <Loader className="animate-spin" />
            <p>جاري تجهيز الملف ...</p>
          </div>
          </div>
        ) : (
          <div className="border p-4 h-screen">
            <div className="flex flex-row gap-4 w-full text-[14px]">
            {/* Excel Export Button */}
            <JsonToExcel
              data={prepareExcelData()}
              fileName={fileName}
              sheet="Sheet1"
              title="تحميل"
              btnClassName="btn-export"
              btnColor="#0077bc"
            />
               <button
              onClick={() => {
                setDisplayExcel(true);
                console.log(decryptedData);
              }}
              className="p-2 px-4 bg-[#0077bc] text-white hover:bg-[#0077bcc1]"
            >
              معاينة
            </button>

            {/* File name input */}
            <input
              type="text"
              value={fileName}
              placeholder="أدخل اسم الملف"
              className="w-full p-2 border text-sm text-right"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className=" py-4">
          {
            displayExcel ? (<div className="w-full overflow-y-auto text-[12px]">
              <Spreadsheet data={transformedData} columnLabels={columnLabels} />
            </div>):(
              <div className="text-center text-[12px] w-full flex items-center justify-center h-screen">اضفط علي معاينه لعرض الملف</div>
            )
          }
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicContractExcel;
