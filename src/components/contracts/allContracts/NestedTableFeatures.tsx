import { GetContractFileApi } from "@/api/file/GetContractFileApi";
import DeleteContracts from "@/componentsShadcn/dialogs/DeleteContracts";
import Cookies from "js-cookie"
import { FaEye } from "react-icons/fa";



const NestedTableFeatures = ({selectedRows,setCatchSelectedRows}:{selectedRows:any,setCatchSelectedRows:any}) => {

  const getFileId=async()=>{
    const result=await GetContractFileApi(selectedRows[0]?._id);
    result && result?.data?.data.length>0 && Cookies.set("fileId",result?.data?.data[0]?._id);
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
              Cookies.remove("contractId");
              Cookies.remove("addressId");
              Cookies.remove("fileId");
              getFileId();
              Cookies.set("contractId",selectedRows[0]?._id)
              Cookies.set("contractType",selectedRows[0]?.Type)
              Cookies.set("addressId",selectedRows[0]?.AddressId?._id)
              window.location.href = "/contracts/create"
            }}
            ><FaEye  className=" text-white" />
</button>
          }
        </div>
    </div>
  )
}

export default NestedTableFeatures
