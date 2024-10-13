import UpdateContractSystemDialog from "@/componentsShadcn/dialogs/ UpdateContractSystemDialog";
import DeleteContractSystemDialog from "@/componentsShadcn/dialogs/DeleteContractSystemDialog";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";



const NestedTableFeatures = ({selectedRows,setCatchSelectedRows}:{selectedRows:any,setCatchSelectedRows:any}) => {


  const token=Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    token && setDecodedToken(decodeToken(token));
  }, [token]);

  return (
    <div className="mb-4 px-2 flex items-center justify-between text-[12px]">
        <div className="text-[#0077bc]">
          <span>          العناصر المختاره
          </span>:
          <span>
            {selectedRows.length}
          </span>
        </div>
        <div className="flex gap-2">
          {
            checkAuth(decodedToken,"delete",["systems","system"]) &&
<DeleteContractSystemDialog  row={selectedRows} setCatchSelectedRows={setCatchSelectedRows}/>
          }
          {
            checkAuth(decodedToken,"put",["systems","system"]) &&<>
          {
            selectedRows.length >=2 ?null:<UpdateContractSystemDialog row={selectedRows[0]}/>
          }
            </>
          }
        </div>
    </div>
  )
}

export default NestedTableFeatures
