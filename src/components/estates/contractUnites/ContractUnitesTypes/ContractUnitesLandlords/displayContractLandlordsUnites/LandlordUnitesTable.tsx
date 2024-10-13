import { GetContractUnitesPerTypeAndEstate } from "@/api/contractUnites/GetContractUnitesPerTypeAndEstate";
import DeleteContractUnieDialog from "@/componentsShadcn/dialogs/DeleteContractUnieDialog";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const LandlordUnitesTable = () => {

  const navigate=useNavigate();

  const columns: any = [
    {
      name: "الرمز",
      // @ts-ignore
      selector: (row: any, index: number) => index + 1,
    },
    {
      name: "المؤجر",
      selector: (row: any) => row.contract?.Name,
    },
    {
      name: "الوحده",
      selector: (row: any) => row.unite?.UniteName,
    },
    {
      name: "المساحه",
      selector: (row: any) => row.unite?.UnitSpace,
    },
    {
      name:"التعديل",
      selector: (row:any) => {
        return<div
        onClick={()=>{
          navigate(`/unites/landlords/${row?._id}?uniteId=${row?.UniteId}&contractId=${row?.ContractId}`)
        }}
        className="bg-green-500 p-2 rounded-md cursor-pointer">
          <FaEdit className="text-white"/>
        </div>
      }
    }
  ];

















  const [result, setResult] = useState<any>([]);
   // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
 // @ts-ignore
  const [page, setPage] = useState<number>(1);
   // @ts-ignore
  const [meta, setMeta] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { refreshLandlordUnites ,refreshOnDeleteContractUnites} = useSelector(
    (state: RootState) => state.GlobalReducer
  );

  const getSpecificContractUnites = async () => {
    const result = await GetContractUnitesPerTypeAndEstate(
      setLoading,
      page,
      "landlord",
      Cookies.get("estateId")
    );
    result && setResult(result?.data?.data);
    result && setMeta(result?.data?.meta);
  };

  useEffect(() => {
    getSpecificContractUnites();
  }, [refreshLandlordUnites,refreshOnDeleteContractUnites]);

  return (
    <div>
      {selectedRows && selectedRows?.length > 0 && (
        <div className="flex justify-between text-[12px] text-[#0077bc] p-2">
          <div>{<p>عدد العناصر المحددة: {selectedRows.length}</p>}</div>
          <div>
            {
              <DeleteContractUnieDialog
                row={selectedRows}
                setCatchSelectedRows={setSelectedRows}
              />
            }
          </div>
        </div>
      )}
     {
      result && result.length>0 && <DataTable
      columns={columns}
      data={result}
      noDataComponent="لا يوجد بيانات"
      selectableRows
      onSelectedRowsChange={(data: any) => {
        setSelectedRows(data.selectedRows);
      }}    />
     }
    </div>
  );
};

export default LandlordUnitesTable;
