import NormalDateComponent from "@/common/NormalDateComponent";
import { Input } from "@/componentsShadcn/ui/input";
import Cookies from "js-cookie";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";



interface SystemsFeaturesProps {
  setSearchKeyWord: (value: string) => void;
  setSearchValue: (value: string) => void;
  setShowWay: (value: string) => void;
  setStartDate: (value: string | null) => void;
  setEndDate: (value: string | null) => void;
  searchKeyWord: string | null;
  startDate: string | null;
  endDate: string | null;
  no: number;
  setNo: (value: number) => void;
}

const SystemsFeatures: React.FC<SystemsFeaturesProps> = ({
  setNo,
  no,
  setSearchKeyWord,
  setSearchValue,
  searchKeyWord,
  setShowWay,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  const cases=[
    {
      case:1,
      show:"متبقي له 40 يوم او اقل | مرحله المطالبه",
      no
    },
    {
      case:2,
      show:"متبقي له 15 يوم او اقل | قريبه الاستحقاق",
      no
    },
    {
      case:3,
      show:"متبقي له 5 ايام او اقل | مستحقه",
      no
    },
    {
      case:4,
      show:"مرجو سداده اليوم",
      no
    },
    {
      case:5,
      show:" تخطي السداد",
      no
    },
    {
      case:6,
      show:" الكل",
      no
    },
  ]
  const currentContractForSystems=Cookies.get("currentContractForSystems");
  const contractIds=Cookies.get("contractIds");
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
            <option value="ContractId.AddressId.Town">المدينه</option>
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
      <div className="flex flex-col gap-4 text-[12px]">
        <p className="text-[#0077bc] flex items-center gap-2 justify-between">
          <p> اختر مجموعه</p>
          <p>    <Link to="/systems/print" className="bg-[#0077bc] text-[12px] text-white p-1 mb-4">طباعه</Link></p>
        </p>
        <select
  className="w-full border p-2 text-[#1f1f1f] hover:border-[#005fa3] transition-colors duration-300 max-sm:w-auto"
  value={no}
  onChange={(e:any) => setNo(e.target.value)}
>
  {cases.map((item, index) => (
    <option
      key={index}
      value={item.case}
      className={no === item?.case ? "text-[#0077bc]" : "text-[#1f1f1f]"}
    >
      *{item.show}
    </option>
  ))}
</select>
    <div>
  {currentContractForSystems&&(
    <div>
      <p>هذه الصفحه تعرض الدفعات الخاصه بعقار {Cookies.get("estateNameForSystems")} </p>
      <p>مع ال {Cookies.get("ContractObjForSystems")}</p>
      <p>لعرض جميع الدفعات مجددا اضغط هنا
        {" "}
        <span className="text-red-500 underline cursor-pointer"
        onClick={()=>{
          Cookies.remove("currentContractForSystems");
          Cookies.remove("contractIds");
          window.location.reload()
        }}
        >اعاده تهيئه</span>
      </p>
      </div>
  )}
  {contractIds&&(
    <div>
      <p>هذه الصفحه تعرض الدفعات الخاصه بعقار {Cookies.get("estateNameForSystems")} </p>
      <p>لعرض جميع الدفعات مجددا اضغط هنا
        {" "}
        <span className="text-red-500 underline cursor-pointer"
        onClick={()=>{
          Cookies.remove("contractIds");
          Cookies.remove("currentContractForSystems");
          window.location.reload()
        }}
        >اعاده تهيئه</span>
      </p>
      </div>
  )}
    </div>
      </div>
    </div>
  );
};

export default SystemsFeatures;
