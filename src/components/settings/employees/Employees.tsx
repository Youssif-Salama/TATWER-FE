import AddRoleDialog from "@/componentsShadcn/dialogs/AddRoleDialog"
import EmployeesRoles from "./EmployeesRoles"

const Employees = () => {
  return (
    <div className="py-8">
      <div className="bg-[#0077bc] text-white p-2 w-full text-center">المناصب</div>
      {/* add employees roles */}
      <AddRoleDialog/>
      {/* employee roles */}
      <EmployeesRoles/>
    </div>
  )
}

export default Employees
