import { GetEstateFileApi } from "@/api/estateFile/GetEstateFileApi";
import DeleteContracts from "@/componentsShadcn/dialogs/DeleteContracts";
import Cookies from "js-cookie"
import { FaEdit } from "react-icons/fa";



const NestedTableFeatures = ({selectedRows,setCatchSelectedRows}:{selectedRows:any,setCatchSelectedRows:any}) => {

  const getEstateFileId=async(id:string)=>{
    const result=await GetEstateFileApi(id);
    if(result){
      result?.data?.data?.length>0 && Cookies.set("estateFileId",result?.data?.data[0]?._id);
      window.location.href = "/estates/create"
    }
  }

  return (
    <div className="mb-4 px-2 flex items-center justify-between">
        <div className="text-[#0077bc]">
          <span>          العناصر المختاره
          </span>:
          <span>
            {selectedRows.length}
          </span>
        </div>
        <div className="flex gap-2">
<DeleteContracts row={selectedRows} setCatchSelectedRows={setCatchSelectedRows}/>
          {
            selectedRows.length >=2 ?null:<button className="bg-green-500 border-0 outline-0 rounded-md p-2 text-sm text-white"
            onClick={()=>{
              selectedRows[0]?._id && Cookies.set("estateId",selectedRows[0]?._id)
              Cookies.remove("estateAddressId");
              Cookies.remove("estateFileId");
              selectedRows[0]?.AddressId && Cookies.set("estateAddressId",selectedRows[0]?.AddressId?._id);
              getEstateFileId(selectedRows[0]?._id)

            }}
            ><FaEdit  className=" text-white" />
</button>
          }
        </div>
    </div>
  )
}

export default NestedTableFeatures
