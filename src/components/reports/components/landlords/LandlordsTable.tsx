import { GetChoosedTaxApi } from "@/api/tax/GetAllTaxApi";
import { useEffect, useState } from "react";

const LandlordsTable = ({ allSystems }: any) => {
   // @ts-ignore
  const [currentTaxValue, setCurrentTaxValue] = useState<any>();
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Store expanded rows
  const [totalRents, setTotalRents] = useState<number>(0); // Store total rents
  const [totalFixeds, setTotalFixeds] = useState<number>(0); // Store total fixed prices

  const getCurrentTaxValue = async () => {
    const result = await GetChoosedTaxApi(true);
    result && setCurrentTaxValue(result?.data?.data[0]?.TaxValue);
  };

  useEffect(() => {
    getCurrentTaxValue();
  }, []);

  useEffect(() => {
    // Calculate rents and fixed prices as numbers
    const newRents = allSystems.map((system: any) => Number(system?.RentValue) || 0);
    const newFixeds = allSystems.map((system: any) => Number(system?.FixedPrice) || 0);
    // @ts-ignore
    const sumRents = newRents.reduce((acc, rent) => acc + rent, 0); // Total rents
    // @ts-ignore
    const sumFixeds = newFixeds.reduce((acc, fixed) => acc + fixed, 0); // Total fixed prices

    setTotalRents(sumRents); // Set the total rents
    setTotalFixeds(sumFixeds); // Set the total fixed prices
  }, [allSystems]); // Depend on allSystems to update rents and fixeds

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-[#0077bc] text-[10px] min-w-full">
        <thead>
          <tr className="bg-[#0077bc] text-white">
            <th className="font-semibold w-[50px] px-2 py-2">الرمز</th>
            <th className="font-semibold w-[50px] px-2 py-2">رقم المسلسل</th>
            <th className="font-semibold w-[150px] px-2 py-2">قيمه الايجار بعد الضريبه</th>
            <th className="font-semibold w-[150px] px-2 py-2">المبالغ الثابته</th>
            <th className="font-semibold w-[150px] px-2 py-2">القيمه الكليه</th>
            <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاصدار م</th>
            <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاستحقاق م</th>
            <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاصدار ه</th>
            <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاستحقاق ه</th>
            <th className="font-semibold w-[180px] px-2 py-2">نظام العقد</th>
            <th className={`font-semibold w-[150px] px-2 py-2 `}>الحاله</th>
            <th className={`font-semibold w-[150px] px-2 py-2 `}>تاريخ اخر تذكير</th>
            <th className={`font-semibold w-[150px] px-2 py-2 `}>ملاحظات</th>
          </tr>
        </thead>
        <tbody className="font-normal text-[8px]">
          {allSystems.map((system: any, index: number) => {
            let situation: any = "متأخره";
            let today = new Date();

            if (system && system.DueDate && !system.Applied) {
              situation = new Date(system.DueDate) > today ? "قادمه" : "متأخره";
            } else {
              situation = "مدفوعه"; // Paid
            }

            return (
              <tr key={index} className={(index%2===0)?"bg-[#0077bc17]":"bg-white"}>
                <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
                <td className="px-2 py-2 whitespace-nowrap text-center">{system?.SystemNumber}</td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  {Number(system?.RentValue)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  {Number(system?.FixedPrice)}
                </td>
                <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                  {(Number(system?.RentValue) + Number(system?.FixedPrice))}
                </td>
                <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                  {system?.ReleaseDate?.slice(0, 10)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">{system?.DueDate?.slice(0, 10)}</td>
                <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                  {system?.ReleaseDateH?.slice(0, 10)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">{system?.DueDateH?.slice(0, 10)}</td>
                <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                  {system?.PaymentWay || "-"} اشهر
                </td>
                <td className={`px-2 py-2 whitespace-nowrap text-center
                  ${situation === "قادمه" ? "text-[#0077bc]" : (situation === "متأخره" ? "text-red-900 bg-red-200" : "text-green-900 bg-green-200")}`}>
                  {situation}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">{system?.Alerts?.[system?.Alerts?.length - 1] || "-"}</td>
                <td className="px-2 py-2 text-center">
                  {/* Button to toggle visibility */}
                  <button
                    onClick={() => toggleRow(index)}
                    className="text-[#0077bc] hover:underline"
                  >
                    {expandedRows.includes(index) ? "إخفاء" : "عرض المزيد"}
                  </button>
                  {/* Conditionally render the content based on state */}
                  {expandedRows.includes(index) && (
                    <div className="whitespace-normal">
                      {system?.Message}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td className="text-center bg-[#0077bc96] text-white font-semibold">{Number(totalRents)}</td>
            <td className="text-center bg-[#0077bc96] text-white font-semibold">{Number(totalFixeds)}</td>
            <td className="text-center bg-[#0077bc96] text-white font-semibold">{Number(Number(totalRents)+Number(totalFixeds))}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LandlordsTable;
