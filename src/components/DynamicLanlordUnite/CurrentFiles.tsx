import UnitesFilePreviewer from "@/common/UnitesFilePreviewer"
import { useEffect } from "react"

const CurrentFiles = ({files,setFixedFiles,FixedFiles}:any) => {


  useEffect(()=>{
    setFixedFiles(files);
  },[files])


  return (
    <div>
     {
        <div>
          {
            FixedFiles && FixedFiles?.length>0 && <div className="text-[12px] mb-4 text-[#0077bc]">الملفات الحاليه</div>
          }
         <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
         {
                  FixedFiles && FixedFiles?.length>0 &&  FixedFiles?.map((item:any,index:number)=>{
                    return <UnitesFilePreviewer file={item} setFixedFiles={setFixedFiles} index={index}/>
                  })
          }
         </div>
        </div>

     }
    </div>
  )
}

export default CurrentFiles
