import EmployeeTable from "@/components/employees/EmployeeTable"
import { Helmet } from "react-helmet"

const Employee = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه الموظفين" />
      <EmployeeTable/>
    </div>
  )
}

export default Employee
