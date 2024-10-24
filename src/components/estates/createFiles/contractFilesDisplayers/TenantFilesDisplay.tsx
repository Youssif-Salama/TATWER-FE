import ContractEstateFilePrfeview from "@/common/ContractEstateFilePrfeview"

const TenantFilesDisplay = ({files}:any) => {
  return (
    <div className="flex items-start gap-2 my-2 flex-wrap">
      {files?.map((file:any)=>{
        return(
          <div className="text-white bg-[#0077bc]">
            <p className="flex items-center justify-between px-1">
            <ContractEstateFilePrfeview file={file}/>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default TenantFilesDisplay
