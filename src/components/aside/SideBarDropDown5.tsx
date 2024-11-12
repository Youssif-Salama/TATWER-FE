import { SiGoogleforms } from "react-icons/si";
import { Link } from "react-router-dom";
// @ts-ignore
import { FaLocationDot } from "react-icons/fa6";
// @ts-ignore
import { FaFileContract } from "react-icons/fa";
import Cookies from "js-cookie";

interface asideRoutesTypes {
  name: string;
  path: string[];
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

}

const nestedRoutes: asideRoutesTypes[] = [
  {
    name: "اضافه بيانات العقار",
    path: ["/estates/create"],
    icon: SiGoogleforms,
  },
  // {
  //   name: " اضافه عنوان العقار",
  //   path: ["/estates/create/address"],
  //   icon: FaLocationDot,
  // },
  // {
  //   name: " اضافه ملفات العقار ",
  //   path: ["/estates/create/files"],
  //   icon: FaFileContract,
  // },
];

const SideBarDropDown5 = ({opendSideDrop5}:{opendSideDrop5:boolean}) => {
  return (
    <div className={`w-[90%] py-4 ${opendSideDrop5 ? "block" : "hidden"}`}>
      <nav>
        <ul className="space-y-2 text-white">
          {nestedRoutes?.map((item: asideRoutesTypes, index: number) => {
            const isActive = location.pathname === item.path[0];
            return (
              <li key={index}>
                <Link
                onClick={()=>{
                  Cookies.remove("estateId");
                  Cookies.remove("estateAddressId");
                  Cookies.remove("estateFileId");
                }}
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

export default SideBarDropDown5;
