import { Link, useLocation } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { useState } from "react";
import Cookies from "js-cookie";

const TodoNavbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = useLocation().pathname;
  return (
    <div className="sm:flex items-center justify-center">
      <div className="mobile sm:hidden">
        <div className="w-full flex items-center justify-end">
          <RiMenu2Line
            className="text-[#0077bc] cursor-pointer"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        </div>
        <div
          className={`${
            !open && "hidden"
          } flex flex-col gap-1 items-end text-[12px] pt-4`}
        >
          <Link className={`py-[1px] ${pathname=="/todo" && "text-[#0077bc]"}`} to="/todo">
            {Cookies.get("currentTaskId")?"تعديل المهمه":"اضافه مهمه"}
          </Link>
          <Link className={`py-[1px] ${pathname=="/todo/tasks" && "text-[#0077bc]"}`} to="/todo/tasks">
            المهمات
          </Link>
        </div>
      </div>
      <div className="all flex items-center gap-3 max-sm:hidden px-8 bg-[#0077bc] text-white w-[400px]">
        <Link
          className={`flex-1 text-center hover:bg-white hover:text-[#0077bc] transition-all duration-200 ${pathname=="/todo" && "text-[#0077bc] bg-white"}`}
          to="/todo"
        >
 {Cookies.get("currentTaskId")?"تعديل المهمه":"اضافه مهمه"}        </Link>
        <Link
          className={`flex-1 text-center hover:bg-white hover:text-[#0077bc] transition-all duration-200 ${pathname=="/todo/tasks" && "text-[#0077bc] bg-white"}`}
          to="/todo/tasks"
        >
          المهمات
        </Link>
      </div>
    </div>
  );
};

export default TodoNavbar;
