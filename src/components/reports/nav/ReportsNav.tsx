import { Link} from "react-router-dom";

const ReportsNav = () => {

  // Define the link items for better maintainability
  const links = [
    { path: "/reports/contracts", label: "المؤجرين والمستأجرين" },
    { path: "/reports/tenants", label: "تقرير بالمؤجر" },
    { path: "/reports/landlords", label: "تقرير بالمستأجر" },
    { path: "/reports/estates", label: "تقرير المواقع" },
    { path: "/reports/estate", label: "تقرير موقع محدد" },
    { path: "/reports/earnings", label: "تقرير الارباح" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`p-3 hover:bg-white text-white hover:text-[#0077bc] transition-all duration-200 ease-linear text-center  bg-[#0077bc]`}
          aria-current={location.pathname === path ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ReportsNav;
