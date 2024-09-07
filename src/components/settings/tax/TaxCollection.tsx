import { Helmet } from "react-helmet"
import TaxForm from "./TaxForm"
import TaxTable from "./TaxTable"

const TaxCollection = () => {
  return (
    <div>
      <Helmet title="شركه النور | صفحه الاعدادات |  الضرائب" />
      <TaxForm/>
      <TaxTable/>
    </div>
  )
}

export default TaxCollection
