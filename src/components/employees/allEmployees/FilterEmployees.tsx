import { Input } from "@/componentsShadcn/ui/input";



interface FilterContractsProps {
  setSearchKeyWord: (value: string) => void;
  setSearchValue: (value: string) => void;
  setShowWay: (value: string) => void;
  searchKeyWord: string | null;
}

const FilterEmployees: React.FC<FilterContractsProps> = ({
  setSearchKeyWord,
  setSearchValue,
  searchKeyWord,
  setShowWay,
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
            <option value="Fname">الاسم الاول</option>
            <option value="Lname">الاسم الثاني</option>
            <option value="Email">البريد الالكتروني</option>
            <option value="Phone">الهاتف</option>
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

        </div>
      </div>
    </div>
  );
};

export default FilterEmployees;
