import { Outlet } from "react-router-dom";
import ContractNavbar from "../navbar/ContractNavbar";
import ContractTypeSwitch from "../navbar/ContractTypeSwitch";
import { Helmet } from "react-helmet";

const Create = () => {
    return (
        <div>
            <Helmet title="شركه النور | صفحه العقود| تسجيل عقد" />
            <div className="flex flex-col gap-4">
                <div className="w-[20%] max-sm:w-full max-md:w-[50%]">
                    <ContractTypeSwitch />
                </div>
                <div className="w-full">
                    <ContractNavbar />
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Create;
