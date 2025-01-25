import Reports from "@/components/home/Reports";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

const Contract = () => {
    return (
        <div className="py-8">
            <Helmet title="شركه تطوير البوادي | صفحه العقود" />
            <div className="mb-4">
            <Reports/>
            </div>
            <Outlet />
        </div>
    );
}

export default Contract;
