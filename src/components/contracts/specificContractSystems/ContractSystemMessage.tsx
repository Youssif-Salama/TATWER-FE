
const ContractSystemMessage = ({data}:any) => {
  return (
    <div className="p-4 max-w-[500px]">
{data?.Message || "لا يوجد ملحوظات او رسائل"}
    </div>
  )
}

export default ContractSystemMessage
