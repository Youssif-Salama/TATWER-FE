import SystemCommonDiv from "@/common/SystemCommonDiv"

const SystemsTable = ({allSystems}:{allSystems:any}) => {
  return (
    <div>

     {
      (allSystems && allSystems.length==0) ?
     <div className="min-h-[70vh] flex items-center justify-center">
      لا يوجد بيانات
     </div>
:(
  <>
  <div className="w-full flex items-center flex-col gap-4">
 { allSystems.map((system:any)=>{
    return (
      <SystemCommonDiv key={system._id} system={system} />
    )
  })}
  </div>
  </>
)
     }
    </div>
  )
}

export default SystemsTable
