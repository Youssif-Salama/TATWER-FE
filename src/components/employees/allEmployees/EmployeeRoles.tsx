import RoleDialog from "@/componentsShadcn/dialogs/RoleDialog"


const EmployeeRoles = ({role,employee}:any) => {
  return (
    <div className={`border border-[#0077bc] shadow-md rounded-md overflow-hidden pr-2 my-2 flex items-center justify-between
      ${(JSON.stringify(role?.Pages)===JSON.stringify(employee?.Pages)) && "bg-green-100"}
`}>
      <p>{role?.Name}</p>
      <RoleDialog dbPages={role?.Pages} dbRoleName={role?.Name} employeeId={employee?._id}/>
    </div>
  )
}

export default EmployeeRoles
