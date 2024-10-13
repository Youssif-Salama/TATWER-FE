import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";


const SystemsPagination = ({totalRows,setPage,page}:{totalRows:number,setPage:any,page:number}) => {
  const totalPages=Math.ceil(totalRows/10);
  return (
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
  )
}

export default SystemsPagination
