import { useEffect, useState } from "react";
import LoadingSpinner from "./common/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "./components/aside/SideBar";
import { autoEmailSenderApi } from "./api/email/autoEmailSenderApi";

const Layout = () => {
    const [loading, setLoading] = useState<boolean>(true);


    const [hideSidebar] = useState<boolean>(false);

    const callAutoEmailSender=async()=>{
        await autoEmailSenderApi();
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        callAutoEmailSender();
        return () => clearTimeout(timer);
    }, []);

    return (
        <div dir="rtl" className="p-4 box-border">
            <Helmet title="شركه تطوير البوادي | الصفحه الرئيسيه" />
            <Sidebar hide={hideSidebar} />

            {
                loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div>
                        <Outlet></Outlet>
                    </div>
                )
            }
        </div>
    );
}

export default Layout;
