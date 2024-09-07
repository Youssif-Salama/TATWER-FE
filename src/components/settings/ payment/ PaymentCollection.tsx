import { Helmet } from "react-helmet"
import PaymentForm from "./ PaymentForm"
import PaymentTable from "./PaymentTable"

const PaymentCollection = () => {
  return (
    <div>
      <Helmet title="شركه النور | صفحه الاعدادات | طرق الدفع" />
      <PaymentForm/>
      <PaymentTable/>
    </div>
  )
}

export default PaymentCollection
