import { Input } from "@/componentsShadcn/ui/input";
import { setUniteAddonsLength } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const InputAdder = ({ formik, placeholder,name,currentAddons }: { formik: any, placeholder: string,name:string,currentAddons?:any }) => {
  const [addons, setAddons] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);  // State to track the addon being edited
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch:AppDispatch=useDispatch();
  const {resetUniteAddons}=useSelector((state:RootState)=> state.GlobalReducer);


  useEffect(() => {
    document.querySelectorAll('input').forEach((input) => {
      input.value=""
      setAddons([]);
    })
  }, [resetUniteAddons])


  useEffect(()=>{
    if(currentAddons) setAddons(currentAddons)
  },[currentAddons])

  const handleAddOrEdit = () => {




    if (inputRef.current) {
      const value = inputRef.current.value;
      if (value.length > 0) {
        if (editIndex !== null) {
          // Edit the existing addon
          const updatedAddons = [...addons];
          updatedAddons[editIndex] = value;
          setAddons(updatedAddons);
          setEditIndex(null);
        } else {
          // Add new addon
          setAddons([...addons, value]);
        }
        inputRef.current.value = "";
      }
    }
  };

  useEffect(()=>{
    formik.setFieldValue(name,addons)
    dispatch(setUniteAddonsLength(addons.length))
  },[addons])

  return (
    <div className="mt-3">
      <div className="w-full" dir="rtl">
        <div className="flex items-center w-full">
          <div className="w-full">
            <Input
              placeholder={placeholder}
              ref={inputRef}
              className="rounded-none w-full px-2 py-3 mx-auto placeholder:text-gray-400 text-[14px] border-2"
              dir="rtl"
            />
          </div>
          <div>
            <button
              onClick={handleAddOrEdit}
              type="button"
              className="bg-[#0077bc] px-3 py-2 text-white hover:bg-[#0077bccd]"
            >
              {editIndex !== null ? "تعديل" : "اضافه"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4 flex-wrap">
        {addons.length > 0 && addons.map((addon, index) => (
          <div key={index} className="bg-[#0077bc] px-3 py-1 text-white relative">
            {/* Close button */}
            <div
              className="absolute -top-1 -right-1 cursor-pointer"
              onClick={() => setAddons(addons.filter((_, i) => i !== index))}
            >
              <IoMdClose className="text-red-500 bg-white border border-[#0077bc] rounded-full font-semibold text-[14px] hover:scale-105" />
            </div>

            <div
              onClick={() => {
                inputRef.current!.value = addon;
                setEditIndex(index);
              }}
              className="cursor-pointer"
            >
              <p>{addon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputAdder;
