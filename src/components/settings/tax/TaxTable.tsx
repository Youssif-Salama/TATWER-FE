import { ChooseTaxApi } from "@/api/tax/ChooseTaxApi";
import { GetAllTaxApi } from "@/api/tax/GetAllTaxApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { setRefrehTax } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { DeleteTaxApi } from "@/api/tax/DeleteTaxApi";

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

  return (
    <div dir="rtl" className="w-full mt-6 p-4 text-[12px]">
      <h2 className="text-md font-bold mb-4 text-[#0077bc]">الضرائب</h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTaxes.length > 0 ? (
            allTaxes.map((tax: any) => (
              <div
                key={tax._id}
                className="bg-white border-2 border-[#0077bc] p-4 rounded-lg relative shadow-md"
              >
                <div
                  className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTax(tax._id)}
                >
                  <FaTrash className="text-[19px] border border-[#0077bc] p-1 bg-white rounded-full" />
                </div>
                <div className="text-lg font-semibold text-center text-[#0077bc]">
                  {tax.TaxValue}
                </div>
                <div className="mt-4 flex justify-center">
                  <label className="inline-flex items-center cursor-pointer">
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
          ) : (
            <div className="text-center py-4">لا يوجد ضرائب</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxTable;
