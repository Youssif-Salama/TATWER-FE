import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

const Estate = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه العقود" />
      <Outlet />
    </div>
  );
};

export default Estate;
