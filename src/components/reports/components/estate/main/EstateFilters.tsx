import NormalDateComponent from "@/common/NormalDateComponent"
import EstateSearch from "./EstateSearch"

const EstateFilters = ({setCurrentEstate,setContractStartDate,setContractEndDate,startDate,endDate}:any) => {
  return (
    <div className="my-6 flex items-start justify-between flex-wrap gap-4">
        <div>
        {/* start date */}
        <NormalDateComponent
              placeholder="ادخل تاريخ الانتهاء هنا"
              value={startDate}
              onChange={setContractStartDate}
            />
      </div>
      <div>
        {/* end date */}
        <NormalDateComponent
              placeholder="ادخل تاريخ الانتهاء هنا"
              value={endDate}
              onChange={setContractEndDate}
            />
      </div>
      <div>
        {/* estate finder */}
        <EstateSearch setTenantId={setCurrentEstate}/>
      </div>
    </div>
  )
}

export default EstateFilters
