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
import {   useState } from "react";
import { IoClose } from "react-icons/io5";
import Pages from "@/common/Pages";
import LoadingSpinner from "@/common/LoadingSpinner";
import { AddRoleApi } from "@/api/roles/AddRoleApi";
import { setRefreshAllRoles } from "@/store/slices/GlobalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";


const AddRoleDialog = () => {
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
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

  const addRole = async () => {
    const data = {
      Pages: pages,
      Name: roleName,
    };
   const result = await AddRoleApi(data, setLoading);
   result && dispatch(setRefreshAllRoles(Math.random()))
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#f3f4f6]  border my-2 outline-0 p-2 text-sm text-[#0077bc] text-[12px]">
          اضافه
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
          <DialogDescription className="text-start flex gap-2">
            <label htmlFor="roleName" className="text-[#0077bc] text-[12px]">اسم المنصب</label>
            <input type="text" className="border" onChange={(e:any)=>{
              setRoleName(e.target.value)
            }} />
          </DialogDescription>
        </DialogHeader>
        <Pages setPages={setPages} pages={pages}/>
        <DialogFooter>
          <div className="relative">
          <Button
            onClick={() => {
              addRole()
            }}
            type="button"
            className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0077bcb1] flex items-center justify-center"
          >
            {loading?(<LoadingSpinner/>):(<>اضافه</>)}
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleDialog;
