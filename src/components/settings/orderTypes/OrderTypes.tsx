import { Helmet } from "react-helmet"
import OrderTable from "./OrderTable"

const OrderTypes = () => {
  return (
    <div>
            <Helmet title="شركه تطوير البوادي | صفحه الاعدادات |  انواع الطلبات" />
            <OrderTable/>
    </div>
  )
}

export default OrderTypes
