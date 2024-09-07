import AddContractSystemDialog from "@/componentsShadcn/dialogs/AddContractSystemDialog"

const AddNewContractSystem = () => {
  return (
    <div>
      <div className="w-full flex items-end justify-between">
        <div className="text-[#0077bc]">
          الدفعات
        </div>
        <div>
          <AddContractSystemDialog/>
        </div>
      </div>
    </div>
  )
}

export default AddNewContractSystem
