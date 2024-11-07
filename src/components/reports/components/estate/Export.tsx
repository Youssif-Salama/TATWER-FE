import { useEffect, useState } from "react";
import { generatePdfFromArray } from "./PdfMake";
import { reverseObjectKeys } from "@/methods/GlobalMethods";
import { generateArabicExcelFromArray } from "@/methods/Print";

const Export = ({
  keys,
  headers,
  currentEstate,
  currentContratcTenant,
  tenantSystemsForPrinting,
  name,
  sprints,
}: any) => {
  const [sprintsInfo, setSprintsInfo] = useState<any>(null);

  useEffect(() => {
    let temp = {
      "إجمالي قيمة العقد":
        Number(sprints?.totalContractPrice) || "-",
      "المبالغ المدفوعة":
        Number(sprints?.totalAppliedSystemsPrice) || "-",
      "المتبقي من العقد":
        Number(sprints?.totalNotAppliedSystemsPrice) || "-",
      "عدد سنوات العقد": Number(sprints?.totalContractSprints) || "-",
      "عدد السنوات المدفوعة": Number(sprints?.totalAppliedSystemSprints) || "-",
      "عدد السنوات المتبقية من العقد":
        Number(sprints?.totalNotAppliedSystemSprints) || "-",
    };
    setSprintsInfo(temp);
  }, [sprints]);

  let extraContentForTenant = {
    ...currentEstate,
    ...currentContratcTenant,
    ...sprintsInfo,
  };

  extraContentForTenant = reverseObjectKeys(extraContentForTenant);

  return (
    <div className="flex items-center justify-end gap-x-1 mb-1">
      {/* printing */}
      <div>
        <button
          onClick={() => {
            generatePdfFromArray(
              tenantSystemsForPrinting,
              headers,
              keys,
              "A1",
              name,
              extraContentForTenant
            );
          }}
          className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white"
        >
          pdf
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            generateArabicExcelFromArray(
              tenantSystemsForPrinting,
              headers,
              keys,
              "A1",
              name,
              extraContentForTenant
            )
          }}
          className="bg-green-500 text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white"
        >
          excel
        </button>
      </div>
    </div>
  );
};

export default Export;
