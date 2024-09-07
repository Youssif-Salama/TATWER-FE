import { Outlet } from "react-router-dom";
import EstateNavbar from "../navbar/EstateNavbar";
import { Helmet } from "react-helmet";

const Create2 = () => {
    return (
        <div>
            <Helmet title="شركه النور | صفحه العقود| تسجيل عقد" />
            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <EstateNavbar />
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Create2;
