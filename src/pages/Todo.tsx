import TodoNavbar from "@/components/todo/navbar/TodoNavbar"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"

const Todo = () => {
  return (
    <div>
      <Helmet title="المهمات"/>
      <TodoNavbar/>
      <Outlet>
      </Outlet>
    </div>
  )
}

export default Todo
