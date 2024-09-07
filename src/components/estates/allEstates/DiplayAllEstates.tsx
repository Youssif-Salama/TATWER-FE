import { customStyles } from "@/common/TableRowStyle";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import NestedTableFeatures from "./NestedTableFeatures";
import { GetAllEstatesApi } from "@/api/estate/GetAllEstatesApi";
import { AllEstatesTypes } from "@/types/GetAllEstatesTypes";

const DiplayAllEstates = ({searchKeyWord,searchValue,showWay}:{searchKeyWord:string |null,searchValue:string|null,showWay:string|null}) => {
  const { refreshONDeleteContracts} = useSelector(
    (state: RootState) => state.GlobalReducer
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [allContracts, setAllContracts] = useState<any[]>([]);
  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);

  const getAllContractsDependingOnType = async () => {
    const result = await GetAllEstatesApi(setLoading, page,showWay,searchKeyWord,searchValue);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
  };

  useEffect(() => {
    getAllContractsDependingOnType();
  }, [ page,searchKeyWord,searchValue,showWay,refreshONDeleteContracts]);

  const columns = [
    {
      name: "رقم العقار",
      selector: (row: AllEstatesTypes, index: number) => index + 1,
    },
    {
      name: "اسم العقار",
      selector: (row: AllEstatesTypes) => row?.EstateName,
    },
    {
      name: "رقم وثيقه الملكيه",
      selector: (row: AllEstatesTypes) => row?.TitleDeedNumber,
    },
    {
      name: "رقم القطعه",
      selector: (row: AllEstatesTypes) => row?.PieceNumber,
    },
    {
      name: "رقم المخطط",
      selector: (row: AllEstatesTypes) => row?.PlanNumber,
    },
    {
      name: "المساحة",
      selector: (row: AllEstatesTypes) => row?.EstateSpace,
    },
    {
      name: "المنطقه",
      selector: (row: any) => row?.AddressId?.City || row?.AddressData?.City || "-",
    },
    {
      name: "تاريخ التسجيل",
      selector: (row: AllEstatesTypes) => row?.createdAt.slice(0,10),
    }
  ];


  const handleSelectedRowsChange=({selectedRows}:any)=>{
    setCatchSelectedRows(selectedRows)
  }

  return (
    <div className="py-4 text-[12px]">
      {
        catchSelectedRows.length > 0 && <NestedTableFeatures selectedRows={catchSelectedRows} setCatchSelectedRows={setCatchSelectedRows} />
      }
      <DataTable
        // @ts-ignore
        columns={columns}
        data={allContracts}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        selectableRows
        onChangePage={(value: number) => {
          setPage(value);
        }}
        // @ts-ignore
        customStyles={customStyles}
        noDataComponent="لا يوجد بيانات"
      />
    </div>
  );
};

export default DiplayAllEstates;
