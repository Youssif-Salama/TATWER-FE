import NormalDateComponent from "@/common/NormalDateComponent";
import SearchForLandlords from "./SearchForLandlords";

interface LandlordsFiltersProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  tenant:any
  setTenant:any;
}
const LandlordsFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
   // @ts-ignore
  tenant,
  setTenant
}: LandlordsFiltersProps) => {
  return (
    <div className="mt-10 mb-6 text-[12px]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          {/* which tenant */}
          <SearchForLandlords setTenantId={setTenant}/>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <NormalDateComponent
              placeholder="ادخل تاريخ البدء هنا"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div>
            <NormalDateComponent
              placeholder="ادخل تاريخ الانتهاء هنا"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordsFilters;
