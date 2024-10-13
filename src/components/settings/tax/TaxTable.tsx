import { ChooseTaxApi } from "@/api/tax/ChooseTaxApi";
import { GetAllTaxApi } from "@/api/tax/GetAllTaxApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { setRefrehTax } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { DeleteTaxApi } from "@/api/tax/DeleteTaxApi";
import AddTaxDialog from "@/componentsShadcn/dialogs/AddTaxDialog";
import { decodeToken } from "@/methods/GlobalMethods";
import Cookies from "js-cookie";
 // @ts-ignore
import NotAllowedLayer from "@/common/NotAllowedLayer";
import { checkAuth } from "@/methods/PageConditions";

const TaxTable = () => {
  const [allTaxes, setAllTaxes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { refreshTax } = useSelector((state: RootState) => state.GlobalReducer);

  const getAllTaxes = async () => {
    const result: any = await GetAllTaxApi(setLoading);
    result && setAllTaxes(result?.data?.data);
  };

  useEffect(() => {
    getAllTaxes();
  }, [refreshTax]);

  const handleUpdateTax = async (taxId: any) => {
    const result = await ChooseTaxApi(taxId);
    result && dispatch(setRefrehTax(Math.random()));
  };

  const handleDeleteTax = async (id: any) => {
    const result = await DeleteTaxApi(id);
    result && getAllTaxes();
  };


  const token = Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const tokenData = decodeToken(token);
      setDecodedToken(tokenData);
    }
  }, [token]);

  return (
    <>
    <div dir="rtl" className="w-full mt-6 p-4 text-[12px]">
      <h2 className="text-md font-bold mb-4 text-[#fff] bg-[#0077bc] w-full text-center p-2">الضرائب</h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full mt-6">
          <div className={`my-2 ${checkAuth(decodedToken,"post",["settings","taxes"]) ? "" : "hidden"}`}>
          <AddTaxDialog/>
          </div>
        <div className=" w-full grid grid-cols-2 gap-2 mt-4">
          {allTaxes.length > 0 && (
            allTaxes.map((tax: any) => (
              <div
                key={tax._id}
                className="bg-gray-100 mb-2 border px-1 py-2 w-full rounded-lg relative shadow-md flex items-start justify-between gap-4 flex-wrap"
              >
                <div className="absolute -top-3 p-1 text-[8px] rounded-md right-2 text-white bg-[#0077bc] border">
                  {tax.Choosed ? "مختار" : "غير مختار"}
                </div>
                <div
                  className={`absolute top-3 right-2 text-red-500 cursor-pointer ${
                    checkAuth(decodedToken,"delete",["settings","taxes"]) ? "" : "hidden"
                  }`}
                  onClick={() => handleDeleteTax(tax._id)}
                >
                  <FaTrash className="text-[19px] border border-[#0077bc] p-1 bg-gray-100 rounded-full" />
                </div>
                <div className={`flex items-center justify-between px-8 text-[12px] gap-4
                  ${checkAuth(decodedToken,"delete",["settings","taxes"]) ? "" : "w-full"}
                  `}>
                  <div>
                    <p>الاسم</p>
                    <p>{tax.Name}</p>
                  </div>
                  <div className="text-[#0077bc]">
                    <p>القيمة</p>
                    <p>{tax.TaxValue}%</p>
                  </div>
                  <div>
                    <p>الرمز</p>
                    <p>{tax.Symbol}</p>
                  </div>
                </div>
                <div className="flex my-auto justify-center">
                  <label className={`${checkAuth(decodedToken,"delete",["settings","taxes"]) ? "" : "hidden"} inline-flex items-center cursor-pointer`}>
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={tax.Choosed}
                      onChange={() => handleUpdateTax(tax._id)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0077bc]"></div>
                  </label>
                </div>
              </div>
            ))
          )
          }
        </div>
        {
          allTaxes.length === 0 && (
            <div className="w-full flex items-center justify-center py-4 border bg-gray-100">لا يوجد ضرائب</div>
          )
        }
        </div>
      )}
    </div>
    </>
  );
};

export default TaxTable;
