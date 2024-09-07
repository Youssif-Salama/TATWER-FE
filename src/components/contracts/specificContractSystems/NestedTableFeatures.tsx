import UpdateContractSystemDialog from "@/componentsShadcn/dialogs/ UpdateContractSystemDialog";
import DeleteContractSystemDialog from "@/componentsShadcn/dialogs/DeleteContractSystemDialog";



const NestedTableFeatures = ({selectedRows,setCatchSelectedRows}:{selectedRows:any,setCatchSelectedRows:any}) => {

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
<DeleteContractSystemDialog  row={selectedRows} setCatchSelectedRows={setCatchSelectedRows}/>
          {
            selectedRows.length >=2 ?null:<UpdateContractSystemDialog row={selectedRows[0]}/>
          }
        </div>
    </div>
  )
}

export default NestedTableFeatures
