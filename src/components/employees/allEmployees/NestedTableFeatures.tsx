import DeleteEmployeesDialog from "@/componentsShadcn/dialogs/DeleteEmployeesDialog";
import EmployeesPagesDialog from "@/componentsShadcn/dialogs/EmployeesPagesDialog";




const NestedTableFeatures = ({selectedRows,setCatchSelectedRows}:{selectedRows:any,setCatchSelectedRows:any}) => {

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
<DeleteEmployeesDialog row={selectedRows} setCatchSelectedRows={setCatchSelectedRows}/>
<EmployeesPagesDialog rows={selectedRows} setCatchSelectedRows={setCatchSelectedRows}/>
        </div>
    </div>
  )
}

export default NestedTableFeatures
