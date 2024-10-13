import NormalDateComponent from "@/common/NormalDateComponent";

interface ContractFiltersProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  fullView: boolean;
  setFullView: (value: boolean) => void;
}
const ContractFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fullView,
  setFullView,
}: ContractFiltersProps) => {
  return (
    <div className="mt-10 mb-6 text-[12px]">
      <div className="flex items-center justify-between flex-wrap gap-4">
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
        <div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={fullView}
                className="sr-only peer"
                onChange={(e) => setFullView(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:bg-[#0077bc] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0077bc]"></div>
              <span className="ms-3 font-medium text-gray-900 dark:text-gray-300">
                جميع التفاصيل
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractFilters;
