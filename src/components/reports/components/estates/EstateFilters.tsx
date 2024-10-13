import { useEffect, useState } from "react"

const EstateFilters = ({setSearchWay,setSearchValue,setSituation}:any) => {
  const [searchBy, setSearchBy] = useState<any>(null);


  useEffect(()=>{
    if(searchBy) setSearchWay(searchBy);
  },[searchBy])


  return (
    <div className="flex items-center gap-4 justify-between flex-wrap text-[12px]">
      <div>
        {/* choose estate search */}
        <select className="bg-[#0077bc] text-white p-2"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchBy(e.target.value)}
        >
          <option>اختر حقل البحث</option>
          <option value="relyOn">مسجل علي</option>
          <option value="address">العنوان</option>
        </select>
        <input type="text" className="bg-gray-100 p-2 px-8" disabled={searchBy==null}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        placeholder={
          searchBy == "relyOn" ? "ادخل الاسم" :(searchBy == "address" ? "ادخل العنوان" : "اختر البحث عن طريق")
        }
        />
      </div>
      <div className="flex items-center gap-2">
        {/* choose estate situation */}
        <label htmlFor="situation"  className="text-[#0077bc]">حاله العقار</label>
        <select className="bg-gray-100 p-2" name="situation" id="situation"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSituation(e.target.value)}
        >
          <option>اختر حاله العقار</option>
          <option value="active">مكتمل</option>
          <option value="inactive">غير مكتمل</option>
        </select>
      </div>
    </div>
  )
}

export default EstateFilters
