import { FaFileContract } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";



const ContractNavbar = () => {
    const location: { pathname: string } = useLocation();
    const pathname: string = location.pathname;
    const contractItems = [
        {
            name: "انشاء عقد",
            path: "/contracts/create",
            icon: <FaFileContract />
        },
        {
            name: "اضافه عنوان",
            path: "/contracts/create/address",
            icon: <FaLocationDot />
        },
        {
            name: "اضافه ملفات",
            path: "/contracts/create/files",
            icon: <FaFile />
        }
    ]
    return (
        <div className="w-full bg-[#0077b6] p-1  shadow-lg">
            <ul className="flex items-center justify-evenly gap-4">
                {
                    contractItems.map((item, index) => {
                        const isActive = pathname === item.path
                        return (
                            <li key={index} className={`${isActive ? "bg-white text-[#0077b6]" : "text-white hover:ring-1 hover:ring-white box-border"} w-full p-2  duration-300 transition-all ease-linear max-sm:text-[14px]`}>
                                <Link to={item.path} className="flex items-center gap-2">
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default ContractNavbar;
