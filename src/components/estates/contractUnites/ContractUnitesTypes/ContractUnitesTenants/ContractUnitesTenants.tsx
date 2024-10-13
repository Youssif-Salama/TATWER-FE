import { GetAllContractsApiForUnite } from "@/api/contract/GetAllContractsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useRef, useState, ChangeEvent, useEffect } from "react";
import { IoMdMore } from "react-icons/io";

interface Contract {
  Name: string;
  _id:string
}

interface PaginationMeta {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  numberOfRows: number;
}

const ContractUnitesTenants = ({setTenantId}: {setTenantId: any}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [results, setResults] = useState<Contract[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [page, setPage] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openChooseKeyWord, setOpenChooseKeyWord] = useState<boolean>(false);
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const onChangeInput = (value: string) => {
    setSearchValue(value);
    setLoading(value.length > 1);
    if(meta?.nextPage && results.length === 0) {
      setPage(page+1);
    }
  };

  const onBlurInput = () => {
    setLoading(false);
  };

  const handleClick = (text: string) => {
    if (inputRef.current) {
      inputRef.current.value = text;
    }
    setOpenDrop(false);
  };

  const getAllTenants = async () => {
    setLoading(true);
    const result = await GetAllContractsApiForUnite(
      page,
      "tenant",
      setLoading,
      searchKeyWord,
      searchValue,
      "tenant"
    );
    if (result) {
      setResults(result.data?.data || []);
      setMeta(result.data?.meta || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllTenants();
  }, [page, searchValue]);


  useEffect(()=>{
    if(searchValue && page==2){
      setPage(1)
    }
  },[searchValue])

  useEffect(() => {
    if (page === 1) {
      setContracts(results);
    } else {
      setContracts(prevContracts => [...prevContracts, ...results]);
    }
  }, [results]);

  return (
    <div>
      <div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center max-w-[339px]">
          <div className="bg-gray-200 flex items-center justify-center px-1 py-2 relative">
            <IoMdMore
              className="text-[#0077bc] text-[24px] cursor-pointer"
              onClick={() => setOpenChooseKeyWord(prev => !prev)}
            />
            <select
              onChange={(e) => setSearchKeyWord(e.target.value)}
              onBlur={() => setOpenChooseKeyWord(false)}
              className={`absolute border border-[#0077bc] top-[110%] right-0 flex flex-col gap-1 bg-gray-200 p-1 min-w-[200px] rounded-none ${openChooseKeyWord ? "block" : "hidden"}`}
            >
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer">اختر كلمه البحث</option>
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer" value="Name">الاسم</option>
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer" value="AddressId.City">المدينه</option>
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer" value="RelyOn">مسجل علي</option>
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer" value="ContractNumber">رقم العقد</option>
            </select>
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
            onBlur={onBlurInput}
            onFocus={() => setOpenDrop(true)}
            ref={inputRef}
            placeholder="المؤجرين"
            className="rounded-none w-full px-2 py-[0.47rem] outline-none mx-auto placeholder:text-gray-400 text-[14px] border-[0.13rem] focus:border-[#0077bc]"
          />
          {loading && (
            <div className="bg-gray-200 flex items-center justify-center p-1">
              <LoadingSpinner />
            </div>
          )}
            <div
      className="text-[#0077bc] cursor-pointer text-[12px] mx-2"
      onClick={() => {
        setPage(1);
        setSearchValue("");
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
      }
      }}
      >تهيئه</div>
        </div>
        {openDrop && (
          <div className="bg-gray-200 max-w-[300px] p-1 text-[#0077bc] max-h-[150px] overflow-y-scroll border border-[#0077bc]">
            {contracts.length > 0 ? (
              contracts.map((item, index) => (
                <p
                  key={index}
                  className="p-1 cursor-pointer"
                  onClick={() => {handleClick(item.Name)
                    setTenantId(item._id)
                  }}
                >
                  {item.Name}
                </p>
              ))
            ) : (
              <p className="bg-white p-1">لا توجد نتائج</p>
            )}
          </div>
        )}
        {openDrop && meta?.nextPage && (
          <div
            className="text-[12px] text-center text-[#0077bc] max-w-[300px] cursor-pointer border border-[#0077bc]"
            onClick={() => setPage(prev => (meta?.nextPage ? prev + 1 : prev))}
          >
            تحميل المزيد
          </div>
        )}
      </div>

      </div>
    </div>
  );
};

export default ContractUnitesTenants;
