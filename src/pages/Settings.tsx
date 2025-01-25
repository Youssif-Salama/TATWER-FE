import Reports from "@/components/home/Reports"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"

const Settings = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات" />
      <div className="mb-4">
            <Reports/>
            </div>
      <Outlet/>
    </div>
  )
}

export default Settings
