import Reports from "@/components/home/Reports"
import TodoNavbar from "@/components/todo/navbar/TodoNavbar"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"

const Todo = () => {
  return (
    <div>
      <Helmet title="المهمات"/>
      <div className="mb-4">
            <Reports/>
            </div>
      <TodoNavbar/>
      <Outlet>
      </Outlet>
    </div>
  )
}

export default Todo
