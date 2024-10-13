import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"

const Settings = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات" />
      <Outlet/>
    </div>
  )
}

export default Settings
