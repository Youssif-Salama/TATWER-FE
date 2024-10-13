import { GetAllEmployeesApi } from "@/api/employee/GetAllEmployeesApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useRef, useState, ChangeEvent, useEffect } from "react";
import { IoMdMore } from "react-icons/io";

interface Unite {
  Fname: string;
  Lname: string;
  _id: string;
}

interface PaginationMeta {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  numberOfRows: number;
}

const GetEmployees = ({setEmployees,setEmpId,setEmpsToDisplay}: {setEmployees: any,setEmpId:any,setEmpsToDisplay:any}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [results, setResults] = useState<Unite[]>([]);
  const [unites, setUnites] = useState<Unite[]>([]);
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
    const result = await GetAllEmployeesApi(
      setLoading,
      page,
      10,
      "desc",
      searchKeyWord,
      searchValue
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
      setUnites(results);
    } else {
      setUnites(prevUnites => [...prevUnites, ...results]);
    }
  }, [results]);

  return (
    <div>
      <div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center max-w-[339px]">
          <div className="bg-gray-200 flex items-center justify-center px-1 py-2 hover:bg-[#0077bc] relative">
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
              <option className="hover:bg-[#0077bc] p-1 cursor-pointer" value="Email">البريد الالكتروني</option>
            </select>
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
            onBlur={onBlurInput}
            onFocus={() => setOpenDrop(true)}
            ref={inputRef}
            placeholder="الموظفون"
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
        setEmpId([]);
        setEmpsToDisplay([]);
        if (inputRef.current) {
          inputRef.current.value = "";
      }
      }}
      >تهيئه</div>
        </div>
        {openDrop && (
          <div className="bg-gray-200 max-w-[300px] p-1 text-[#0077bc] max-h-[150px] overflow-y-scroll border border-[#0077bc]">
            {unites.length > 0 ? (
              unites.map((item, index) => (
                <p
                  key={index}
                  className="hover:bg-gray-100 p-1 cursor-pointer"
                  onClick={() => {handleClick(item.Fname + " " + item.Lname);
                    setEmployees(item)
                  }}
                >
                  {item.Fname} {item.Lname}
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

export default GetEmployees;
