const OrderFilteration = ({
  setSearchValue,
  searchValue,
  setStatus,
  // @ts-ignore
  status
}: {
  setSearchValue: any;
  searchValue: any;
  setStatus: any;
  status: any;
}) => {
  return (
    <div className="w-full flex items-start justify-between text-[14px]">
      <div className="flex items-center gap-2">
        <label className="text-[14px] text-[#0077bc]"  htmlFor="search"> بحث</label>
        <input
          type="search"
          name="search"
          value={searchValue}
          onChange={(e:any) => setSearchValue(e.target.value)}
          placeholder="بحث"
          className="bg-gray-100 p-2 border-2 rounded-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <label  className="text-[14px] text-[#0077bc]" htmlFor="filter">الحاله</label>
        <select name="filter" className="p-2 border-2"
        onChange={(e: any) => setStatus(e.target.value)}
        >
          <option value="">الكل</option>
          <option value="pending">قيد الانتظار</option>
          <option value="complete">مكتمل</option>
          <option value="cancelled">ملغى</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilteration;
