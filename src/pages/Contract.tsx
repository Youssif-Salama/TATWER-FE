import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

const Contract = () => {
    return (
        <div className="py-8">
            <Helmet title="شركه النور | صفحه العقود" />
            <Outlet />
        </div>
    );
}

export default Contract;
