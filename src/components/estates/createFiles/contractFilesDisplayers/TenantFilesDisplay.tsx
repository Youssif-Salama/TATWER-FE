
const TenantFilesDisplay = ({files}:any) => {
  return (
    <div className="flex items-start gap-2 my-2">
      {files?.map((file:any)=>{
        return(
          <div className="text-white bg-[#0077bc]">
            <p className="flex items-center justify-between px-1">
              <span>
                {file?.name}
              </span>
              <span className="cursor-pointer"
              onClick={()=>{
                window.open(import.meta.env.VITE_BE_Domain+file?.path,"_blank")
              }}
              >مشاهده</span>
            </p>
            <img src={import.meta.env.VITE_BE_Domain+file?.path} alt="img" className="w-[150px] h-[100px]" />
          </div>
        )
      })}
    </div>
  )
}

export default TenantFilesDisplay
