
const ContractSystemMessage = ({data}:any) => {
  return (
    <div className="p-4 max-w-[500px]">
      <p className="flex items-center gap-2">
        <span>نظام الدفعه</span>
        <span>كل {data?.PaymentWay} شهر</span>
      </p>
      <p className="flex items-center gap-2">
        <span>تاريخ الانتهاء</span>
        <span>{new Date(data?.DueDate).toLocaleString()}</span>
      </p>
{data?.Message || "لا يوجد ملحوظات او رسائل"}
    </div>
  )
}

export default ContractSystemMessage
