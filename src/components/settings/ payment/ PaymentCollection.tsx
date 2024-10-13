import { Helmet } from "react-helmet"
import PaymentTable from "./PaymentTable"

const PaymentCollection = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات | طرق الدفع" />
      <PaymentTable/>
    </div>
  )
}

export default PaymentCollection
