import UpdateRoleDialog from "@/componentsShadcn/dialogs/UpdateRoleDialog"

const UpdateEmployeeRoles = ({role,employeeId}:{role:any,employeeId?:string}) => {

  return (
    <div className={`border border-[#0077bc] shadow-md rounded-md overflow-hidden pr-2 my-2 flex items-center justify-between
    `}>
      <p>{role?.Name}</p>
      <UpdateRoleDialog dbPages={role?.Pages} dbRoleName={role?.Name} employeeId={employeeId} roleId={role?._id}/>
    </div>
  )
}

export default UpdateEmployeeRoles
