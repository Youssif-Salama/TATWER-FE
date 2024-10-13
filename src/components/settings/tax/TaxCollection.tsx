import { Helmet } from "react-helmet"
import TaxTable from "./TaxTable"

const TaxCollection = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات |  الضرائب" />
      <TaxTable/>
    </div>
  )
}

export default TaxCollection
