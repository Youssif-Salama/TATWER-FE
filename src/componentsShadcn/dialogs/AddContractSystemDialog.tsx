import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/componentsShadcn/ui/dialog";

import { IoClose } from "react-icons/io5";
import AddContractSystemByOne from "@/components/dialogsComponents/AddContractSystemByOne";
import { useEffect, useState } from "react";
import AddContractSystemMultiple from "@/components/dialogsComponents/AddContractSystemMultiple";
import { GetAllTaxApi } from "@/api/tax/GetAllTaxApi";


const AddContractSystemDialog = () => {

  const [taxes, setTaxes] = useState([]);
  // @ts-ignore
    const [loading, setLoading] = useState(false);
    const getAllTaxes = async () => {
      const result = await GetAllTaxApi(setLoading);
      result && setTaxes(result?.data?.data);
    }

    useEffect(() => {
      getAllTaxes();
    }, []);

  const [addingSystem, setAddingSystem] = useState<number>(1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white bg-[#0077bc] hover:text-white rounded-none hover:bg-[#0078bdc7]"
        >
          اضافه دفعه يدويا
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-sm mt-5 relative">
            <DialogClose className="text-lg absolute left-0 -top-7" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
            <div className="flex items-center gap-4 bg-[#0077bc] w-full text-white p-1">
              <div
                onClickCapture={() => {
                  setAddingSystem(2);
                }}
                className={`w-full cursor-pointer text-center ${
                  addingSystem == 2
                    ? "text-[#0077bc] bg-white"
                    : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"
                }`}
              >
                عده دفعات
              </div>
              <div
                onClickCapture={() => {
                  setAddingSystem(1);
                }}
                className={`w-full cursor-pointer text-center ${
                  addingSystem == 1
                    ? "text-[#0077bc] bg-white"
                    : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"
                }`}
              >
                دفعه واحده فقط
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      {
        addingSystem == 1 ? <AddContractSystemByOne taxes={taxes} /> : <AddContractSystemMultiple  taxes={taxes}/>
      }
      </DialogContent>
    </Dialog>
  );
};

export default AddContractSystemDialog;
