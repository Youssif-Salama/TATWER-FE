import { Helmet } from "react-helmet"
import ObjectTable from "./RemindingsTable"
import RemindingsMoreInfo from "./RemindingsMoreInfo"

const RemindingsCollection = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات |  التذكيرات" />
      <ObjectTable/>
      <RemindingsMoreInfo/>
    </div>
  )
}

export default RemindingsCollection
