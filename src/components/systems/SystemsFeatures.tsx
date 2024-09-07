import NormalDateComponent from "@/common/NormalDateComponent";
import { Input } from "@/componentsShadcn/ui/input";
import { IoReload } from "react-icons/io5";



interface SystemsFeaturesProps {
  setSearchKeyWord: (value: string) => void;
  setSearchValue: (value: string) => void;
  setShowWay: (value: string) => void;
  setStartDate: (value: string | null) => void;
  setEndDate: (value: string | null) => void;
  searchKeyWord: string | null;
  startDate: string | null;
  endDate: string | null;
}

const SystemsFeatures: React.FC<SystemsFeaturesProps> = ({
  setSearchKeyWord,
  setSearchValue,
  searchKeyWord,
  setShowWay,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center bg-[#0077bc]">
        <div className="h-full">
          <select
            className="py-1 px-3 border-0 outline-none ring-0 bg-[#0077bc] text-white"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSearchKeyWord(e.target.value)
            }
          >
            <option value="">اختر حقل البحث</option>
            <option value="ContractId.ContractNumber">رقم العقد</option>
            <option value="ContractId.Name">الاسم</option>
            <option value="ContractId.AddressId.City">المدينه</option>
            <option value="ContractId.RelyOn">مسجل علي</option>
            <option value="ContractId.Type">الصفه</option>
          </select>
        </div>
        <div className="w-full h-full">
          <Input
            disabled={!searchKeyWord || searchKeyWord.length == 0}
            type="text"
            className="rounded-none w-full px-2 py-3 mx-auto placeholder:text-gray-400 text-[14px] border-2"
            placeholder="اكتب كلمه البحث هنا"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-6 justify-between max-md:flex-col">
          <div className="max-md:w-full">
          <select
            className=" px-2 border-0 outline-none ring-0 bg-[#0077bc] text-white py-2 w-full"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setShowWay(e.target.value)
            }
          >
            <option value="">اختر طريقه العرض</option>
            <option value="desc">تنازلي</option>
            <option value="asc">تصاعدي</option>
          </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-md:w-full">
            <div className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            >
              <span>تهيئه</span>
              <span><IoReload />
              </span>
            </div>
            <div className="relative">
              <NormalDateComponent
                placeholder="ادخل تاريخ الانتهاء هنا"
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="relative">
              <NormalDateComponent
                placeholder="ادخل تاريخ الانتهاء هنا"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemsFeatures;
