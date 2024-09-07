import { Link } from "react-router-dom";
import { MdPayments } from "react-icons/md";


interface asideRoutesTypes {
  name: string;
  path: string[];
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

}

const nestedRoutes: asideRoutesTypes[] = [
  {
    name: "طرق الدفع",
    path: ["/settings/payment"],
    icon: MdPayments,
  }
];

const SideBarDropDown4 = ({opendSideDrop4}:{opendSideDrop4:boolean}) => {
  return (
    <div className={`w-[90%] py-4 ${opendSideDrop4 ? "block" : "hidden"}`}>
      <nav>
        <ul className="space-y-2 text-white">
          {nestedRoutes?.map((item: asideRoutesTypes, index: number) => {
            const isActive = location.pathname === item.path[0];
            return (
              <li key={index}>
                <Link
                  to={item.path[0]}
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

export default SideBarDropDown4;
