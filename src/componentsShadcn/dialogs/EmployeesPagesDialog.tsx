import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import Pages from "@/common/Pages";
import { UpdateEmployeePagesApi } from "@/api/employee/UpdateEmployeePagesApi";
import { successToaster } from "@/utils/ReactToatify";
import { setRefreshONDeleteEmployee } from "@/store/slices/GlobalSlice";
import { GetOneEmployeeApi } from "@/api/profile/GetOneEmployeeApi";
import { AddRoleApi } from "@/api/roles/AddRoleApi";

const EmployeesPagesDialog = ({ rows, setCatchSelectedRows }: any) => {
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [pages, setPages] = useState<any>({
    systems: {
      system: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
    },
    contracts: {
      all: false,
      tenants: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      landlords: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
    },
    estates: {
      all: false,
      estate: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      estateUnits: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
    },
    settings: {
      all: false,
      paymentWays: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      taxes: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      employees: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      objects: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
      remindings: {
        post: false,
        delete: false,
        get: false,
        put: false,
      },
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const deletMultipleEmployees = async () => {
    const data = {
      Pages: pages,
    };
    const result = await UpdateEmployeePagesApi(data, setLoading, rows);
    result && dispatch(setRefreshONDeleteEmployee(Math.random()));
    result && setCatchSelectedRows([]);
    result && successToaster("تم التعديل بنجاح");
  };

  const getMydate = async () => {
    const result = await GetOneEmployeeApi(rows[0]?._id);
    if (result) {
      if (result?.data?.data[0]?.Pages) {
        setPages(result?.data?.data[0]?.Pages);
      }
    }
  };

  useEffect(() => {
    getMydate();
  }, []);

  const [openInputDiv, SetopenInputDiv] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 border-0 outline-0 rounded-md p-2 text-sm text-white">
          الصلاحيات
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="relative">
            <DialogClose className="text-lg absolute left-0 -top-2" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
                <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-start">
            تحديد الصفحات
          </DialogDescription>
        </DialogHeader>
        <Pages setPages={setPages} pages={pages} />
        <DialogFooter>
          <div className="flex gap-2">
          <Button
            onClick={() => {
              deletMultipleEmployees();
            }}
            type="button"
            className="text-white bg-green-500 hover:text-white rounded-lg hover:bg-green-400"
          >
            {loading ? <LoadingSpinner color="text-white" /> : "تأكيد"}
          </Button>
          <div className="relative">
          <Button
            onClick={() => {
             SetopenInputDiv(!openInputDiv)
            }}
            type="button"
            className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0077bcb1]"
          >
           {openInputDiv ? "اغلاق" : "تسجيل الدور"}
          </Button>
            <div className={`${openInputDiv ? "absolute left-0 -top-[55px]" : "hidden"} bg-gray-200 p-2 rounded-md flex items-center gap-4`}>
            <input type="text" className="rounded-md px-2 py-1" placeholder="ادخل اسم الدور او الصلاحيه هنا " onChange={(e:any)=>{
              setRoleName(e?.target?.value)
            }} />
            <button className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0077bcb1] px-4 py-1"
onClick={async()=>{
  await AddRoleApi({Name:roleName,Pages:pages});
}}
            >تأكيد</button>
            </div>
          </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesPagesDialog;
