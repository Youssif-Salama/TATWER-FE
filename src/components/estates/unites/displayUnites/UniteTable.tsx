import { GetSpecificEstateUnitesApi } from "@/api/unites/GetSpecificEstateUnitesApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UniteNestedTable from "./UniteNestedTable";
import DeleteUniteDialog from "@/componentsShadcn/dialogs/DeleteUniteDialog";
import UpdateUniteDialog from "@/componentsShadcn/dialogs/UpdateUniteDialog";
import ContractUnitesCollection from "../../contractUnites/ContractUnitesCollection";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";



const UniteTable = () => {
  const estateId = Cookies.get("estateId");
   // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [unites, setUnites] = useState<any>([]);
  const [totalUnites, setTotalUnites] = useState<number>();
  const { refrehEstateUnites, refreshOnDeleteUnite,refreshOnAddNewContractSystem } = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [showConnectContracts, setShowConnectContracts] = useState<boolean>(true);

  const getAllUnitesPerCurrentEstate = async () => {
    const result = await GetSpecificEstateUnitesApi(estateId, setLoading, page);
    result && setUnites(result?.data?.data);
    result && setTotalUnites(result?.data?.meta?.numberOfRows);
    result && setShowConnectContracts(false);
  };

  useEffect(() => {
    estateId && getAllUnitesPerCurrentEstate();
  }, [refrehEstateUnites, page, refreshOnDeleteUnite]);


  useEffect(()=>{
    setUnites(null);
    setShowConnectContracts(true);
  },[refreshOnAddNewContractSystem])

  const token=Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);


  const columns: any = [
    {
      name: "رقم الوحدة",
      // @ts-ignore
      selector: (row: any, index: number) => index + 1,
    },
    {
      name: "اسم الوحدة",
      selector: (row: any) => row.UniteName,
    },
    {
      name: "مساحة الوحدة",
      selector: (row: any) => row.UnitSpace,
    },
    {
      name: "تعديل",
      selector: (row: any) => {
        return (
          <div className="flex gap-2">
            {
              checkAuth(decodedToken,"put",["estates","estateUnits"])?
              <UpdateUniteDialog row={row} />:"_"
            }
          </div>
        );
      },
      maxWidth: "100px",
    },
  ];


  return (
    <div className="mt-6">
      {selectedRows && selectedRows?.length > 0 && checkAuth(decodedToken,"delete",["estates","estateUnits"])&& (
        <div className="flex justify-between text-[12px] text-[#0077bc] p-2">
          <div>{<p>عدد العناصر المحددة: {selectedRows.length}</p>}</div>
          <div>
            {
              <DeleteUniteDialog
                row={selectedRows}
                setCatchSelectedRows={setSelectedRows}
              />
            }
          </div>
        </div>
      )}
      {unites && unites?.length > 0 && (
        <DataTable
          columns={columns}
          data={unites}
          pagination
          paginationServer
          noDataComponent="لا يوجد بيانات"
          paginationTotalRows={totalUnites}
          onChangePage={(page: number) => setPage(page)}
          expandOnRowClicked
          expandableRows
          expandableRowsComponent={UniteNestedTable}
          selectableRows
          onSelectedRowsChange={(data: any) => {
            setSelectedRows(data.selectedRows);
          }}
        />
      )}
        <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <div className={`mt-6 ${showConnectContracts && "hidden"}`}>
        <ContractUnitesCollection />
      </div>
    </div>
  );
};

export default UniteTable;
