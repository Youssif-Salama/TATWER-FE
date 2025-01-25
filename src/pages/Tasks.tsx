import Reports from "@/components/home/Reports"
import TasksMain from "@/components/tasks/TasksMain"
import { Helmet } from "react-helmet"

const Tasks = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه المهام"/>
      <div className="mb-4">
            <Reports/>
            </div>
      <TasksMain/>
    </div>
  )
}

export default Tasks
