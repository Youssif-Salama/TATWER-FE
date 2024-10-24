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
import {  useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Pages from "@/common/Pages";
import { UpdateEmployeePagesApi } from "@/api/employee/UpdateEmployeePagesApi";
import { successToaster } from "@/utils/ReactToatify";
import LoadingSpinner from "@/common/LoadingSpinner";


const RoleDialog = ({dbPages,dbRoleName,employeeId}:any) => {
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
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setPages(dbPages)
    setRoleName(dbRoleName)
  },[
    dbPages,dbRoleName
  ])

  const updateEmployeeRole = async () => {
    const data = {
      Pages: pages,
    };
    const rows=[{_id:employeeId}];
    const result = await UpdateEmployeePagesApi(data, setLoading, rows);
    result && successToaster("تم التعديل بنجاح");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#0077bc] border-0 outline-0 rounded-md p-1 text-sm text-white">
          مشاهده
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
            دور {roleName}
          </DialogDescription>
        </DialogHeader>
        <Pages setPages={setPages} pages={pages} disabled={true}/>
        <DialogFooter>
          <div className="relative">
          <Button
            onClick={() => {
              updateEmployeeRole()
            }}
            type="button"
            className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0077bcb1] flex items-center justify-center"
          >
            {loading?(<LoadingSpinner/>):(<>اختيار</>)}
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;
