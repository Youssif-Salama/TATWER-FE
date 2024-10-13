import TasksMain from "@/components/tasks/TasksMain"
import { Helmet } from "react-helmet"

const Tasks = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه المهام"/>
      <TasksMain/>
    </div>
  )
}

export default Tasks
