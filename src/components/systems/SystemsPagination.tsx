import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";


const SystemsPagination = ({totalRows,setPage,page,rowsPerPage,setRowsPerPage}:{totalRows:number,setPage:any,page:number,setRowsPerPage?:any,rowsPerPage?:any}) => {
  const totalPages=Math.ceil(totalRows/rowsPerPage) || Math.ceil(totalRows/10) ;
  const [currentRowsNo,setCurrentRowsNo]=useState<any>(10);
  useEffect(()=>{
    if(rowsPerPage && setRowsPerPage){
      setRowsPerPage(currentRowsNo)
    }
  },[currentRowsNo])
  return (
   <div className="flex items-center gap-6">
     <div className="flex items-center gap-4">
      <button
      onClick={
        ()=>{
          if(page<totalPages)setPage(page+1)
        }
      }
      className={`bg-[#0077bc] text-white rounded-full hover:scale-110 transition transform ease duration-150 text-[15px]`}
      ><MdKeyboardArrowRight/></button>
      <div className="font-bold text-sm text-[#0077bc]">{page}/{totalPages}</div>
      <button
      onClick={
        ()=>{
          if(page>1)setPage(page-1)
        }
      }
      className={`bg-[#0077bc] text-white rounded-full hover:scale-110 transition transform ease duration-150 text-[15px]`}
      ><MdKeyboardArrowLeft/></button>
    </div>
    {
      (rowsPerPage && setRowsPerPage)&& <select className="bg-inherit text-[#0077bc] text-[14px] border" value={currentRowsNo} onChange={(e)=>setCurrentRowsNo(e.target.value)}>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="35">35</option>
    </select>
    }
   </div>
  )
}

export default SystemsPagination
