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
import LoadingSpinner from "@/common/LoadingSpinner";
import { UpdateRoleApi } from "@/api/roles/UpdateRoleApi";
import { DeleteRoleApi } from "@/api/roles/DeleteRoleApi";
import { setRefreshAllRoles } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";


const UpdateRoleDialog = ({dbPages,dbRoleName,roleId}:any) => {
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
  const dispatch:AppDispatch=useDispatch();
  useEffect(()=>{
    setPages(dbPages)
    setRoleName(dbRoleName)
  },[
    dbPages,dbRoleName
  ])

  const updateRole = async () => {
    const data = {
      Pages: pages,
    };
   await UpdateRoleApi(roleId,data, setLoading);
  };


  const delteRole=async () => {
    const result=await DeleteRoleApi(roleId);
    result && dispatch(setRefreshAllRoles(Math.random()));
  }

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
       {dbPages &&
        <Pages setPages={setPages} pages={pages} disabled={false}/>
       }
        <DialogFooter>
          <div className="flex text-center justify-between w-full">
          <Button
            onClick={() => {
              updateRole()
            }}
            type="button"
            className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0077bcb1] flex items-center justify-center"
          >
            {loading?(<LoadingSpinner color="text-white"/>):(<>تعديل</>)}
          </Button>
          <Button
            onClick={() => {
              delteRole()
            }}
            type="button"
            className="text-white bg-red-500 hover:text-white rounded-lg hover:bg-red-300 flex items-center justify-center"
          >
            {loading?(<LoadingSpinner color="text-white"/>):(<>حذف</>)}
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoleDialog;
