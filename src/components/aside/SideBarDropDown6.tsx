import { Link } from "react-router-dom";
// @ts-ignore
import { FaLocationDot } from "react-icons/fa6";
// @ts-ignore
import { FaFileContract } from "react-icons/fa";
import Cookies from "js-cookie";
import { ListOrdered } from "lucide-react";

interface asideRoutesTypes {
  name: string;
  path: string[];
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

}

const nestedRoutes: asideRoutesTypes[] = [
  {
    name: "اداره الطلبات",
    path: ["/tasks/orders"],
    icon: ListOrdered,
  },
];

const SideBarDropDown6 = ({opendSideDrop6}:{opendSideDrop6:boolean}) => {
  return (
    <div className={`w-[90%] py-4 ${opendSideDrop6 ? "block" : "hidden"}`}>
      <nav>
        <ul className="space-y-2 text-white">
          {nestedRoutes?.map((item: asideRoutesTypes, index: number) => {
            const isActive = location.pathname === item.path[0];
            return (
              <li key={index}>
                <Link
                  to={item.path[0]}
                  onClick={()=>{
                    Cookies.remove("contractId");
            Cookies.remove("fileId");
            Cookies.remove("addressId");
            Cookies.remove("contractType");
                  }}
                  className={`
                                   flex items-center justify-between uppercase font-medium p-2 rounded-md
 ${
   isActive
     ? "bg-white text-[#0077b6] shadow-[0_0_10px_0_rgba(255,255,255,1)]"
     : "animate-in hover:scale-95 duration-300 transition-all transform ease-in-out"
 }
                                    `}
                >
                  <span>{item.name}</span>
                  <span>
                    {item.icon && (
                      <item.icon className="font-bold text-[16px]" />
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBarDropDown6;
