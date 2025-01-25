import EmployeeTable from "@/components/employees/EmployeeTable"
import Reports from "@/components/home/Reports"
import { Helmet } from "react-helmet"

const Employee = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه الموظفين" />
      <div className="mb-4">
            <Reports/>
            </div>
      <EmployeeTable/>
    </div>
  )
}

export default Employee
