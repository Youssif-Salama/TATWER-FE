import { GetAllSystemsApiForReports } from "@/api/systems/GetAllSystemsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
 // @ts-ignore
import SystemCommonDiv from "@/common/SystemCommonDiv";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MinSystemInfoLandlord = () => {
  const [allSystems,setAllSystems] = useState<any>([]);
  const [loading,setLoading] = useState<boolean>(true);
  // @ts-ignore
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Store expanded rows
  const [totalRents, setTotalRents] = useState<number>(0); // Store total rents
  const [totalFixeds, setTotalFixeds] = useState<number>(0); // Store total fixed prices

  const getAllSystems=async()=>{
    const result = await GetAllSystemsApiForReports(setLoading,"landlord");
    result && setAllSystems(result?.data?.data);
  }

  useEffect(()=>{
    getAllSystems();
  },[])

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

  // @ts-ignore
  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="rounded-md overflow-hidden">
      {
        loading && <div className="min-h-[30vh] flex items-center justify-center"><LoadingSpinner/></div>
      }
      {
        <div className="text-[16px] flex items-center justify-between">
          <p className="text-[#0077bc]">دفعات المستأحر</p>
          <Link to="/systems" className="bg-[#0077bc] px-4 py-1 rounded-md text-white">انتقل</Link>
        </div>
      }
{
  allSystems && allSystems.length>0 ?(<div className="overflow-x-auto rounded-md ">
    <table className="table-auto border border-[#0077bc] text-[14px] min-w-full rounded-md overflow-hidden">
      <thead>
        <tr className="bg-[#0077bc] text-white">
          <th className="font-semibold w-[50px] px-2 py-2">العقد باسم</th>
          <th className="font-semibold w-[150px] px-2 py-2">القيمه الكليه</th>
          <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاصدار م</th>
          <th className={`font-semibold w-[100px] px-2 py-2 `}>تاريخ الاستحقاق م</th>
          <th className="font-semibold w-[180px] px-2 py-2">نظام العقد</th>
          <th className={`font-semibold w-[150px] px-2 py-2 `}>الحاله</th>
        </tr>
      </thead>
      <tbody className="font-normal text-[14px]">
        {allSystems?.map((system: any, index: number) => {
          let situation: any = "متأخره";
          let today = new Date();

          if (system && system.LastAskDate && !system.Applied) {
            situation = new Date(system.LastAskDate) > today ? "قادمه" : "متأخره";
          } else {
            situation = "مدفوعه"; // Paid
          }

          return (
            <tr key={index} className={(index%2===0)?"bg-[#0077bc17]":"bg-white"}>
              <td className="px-2 py-2 whitespace-nowrap text-center">{system?.ContractId?.Name}</td>
              <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                {(Number(system?.RentValue) + Number(system?.FixedPrice))}
              </td>
              <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                {system?.ReleaseDate?.slice(0, 10)}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{system?.LastAskDate?.slice(0, 10)}</td>
              <td className={`px-2 py-2 whitespace-nowrap text-center`}>
                {system?.PaymentWay || "-"} اشهر
              </td>
              <td className={`px-2 py-2 whitespace-nowrap text-center
                ${situation === "قادمه" ? "text-[#0077bc]" : (situation === "متأخره" ? "text-red-900 bg-red-200" : "text-green-900 bg-green-200")}`}>
                {situation}
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td className="text-center bg-[#0077bc96] text-white font-semibold">{Number(Number(totalRents)+Number(totalFixeds))}</td>
        </tr>
      </tbody>
    </table>
  </div>):(
    <div className="text-[#0077bc] flex items-center justify-center h-[30vh] w-full">لا يوجد دفعات</div>
  )
}
    </div>
  )
}

export default MinSystemInfoLandlord
