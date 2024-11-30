import { customStyles } from "@/common/TableRowStyle";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import NestedTableFeatures from "./NestedTableFeatures";
import { GetAllEstatesApi } from "@/api/estate/GetAllEstatesApi";
import { AllEstatesTypes } from "@/types/GetAllEstatesTypes";
import CommonTooltip from "@/common/CommonTooltip";
import EstateNestedTable from "./EstateNestedTable";

const DiplayAllEstates = ({searchKeyWord,searchValue,showWay}:{searchKeyWord:string |null,searchValue:string|null,showWay:string|null}) => {
  const { refreshONDeleteContracts} = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [allContracts, setAllContracts] = useState<any[]>([]);
  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);
  const [rowsPerPage,   setRowsPerPage] = useState<number>(10);

  const getAllContractsDependingOnType = async () => {
    const result = await GetAllEstatesApi(setLoading, page,showWay,searchKeyWord,searchValue,rowsPerPage);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
  };

  useEffect(() => {
    getAllContractsDependingOnType();
  }, [ page,searchKeyWord,searchValue,showWay,refreshONDeleteContracts,rowsPerPage]);

  const columns = [
    {
      name: "الرمز",
      // @ts-ignore
      selector: (row: AllEstatesTypes, index: number) => index + 1,
    },
    {
      name: "اسم العقار",
      selector: (row: AllEstatesTypes) => <CommonTooltip field={row?.EstateName}/>,
    },
    {
      name: "المدينه",
      selector: (row: any) =><CommonTooltip field={row?.AddressId?.Town || row?.AddressData?.Town || "-" }/>,
    },
    {
      name: "الحي",
      selector: (row: any) => <CommonTooltip field={row?.AddressId?.Neighborhood || row?.AddressData?.Neighborhood || "-" }/>
    },
    {
      name: "الشارع",
      selector: (row: any) =><CommonTooltip field={row?.AddressId?.Street || row?.AddressData?.Street || "-" }/>
    },
    {
      name: "رقم وثيقه الملكيه",
      selector: (row: AllEstatesTypes) => row?.TitleDeedNumber,
    },
    {
      name: "رقم القطعه",
      selector: (row: AllEstatesTypes) =><CommonTooltip field={row?.PieceNumber}/>,
    },
    {
      name: "رقم المخطط",
      selector: (row: AllEstatesTypes) => <CommonTooltip field={row?.PlanNumber}/>
    },
    {
      name: "المساحة",
      selector: (row: AllEstatesTypes) =><CommonTooltip field={row?.EstateSpace}/>
    },
    {
      name: "تاريخ التسجيل",
      selector: (row: AllEstatesTypes) =><CommonTooltip field={row?.EstateDate.slice(0,10)}/> ,
    },
    {
      name: "الحاله",
      selector: (row: AllEstatesTypes) =><div className="flex gap-2 text-[12px] w-[400px]">
        {
          row?.Situation=="active" ?<p className="bg-green-500 text-white p-1 rounded-md">نشط</p>:<p className="bg-red-500 text-white p-1 rounded-md">مسوده</p>
        }
         {
          row?.Status=="complete" ?<p className="bg-green-500 text-white p-1 rounded-md">مكتمل</p>:<p className="bg-red-500 text-white p-1 rounded-md">غير مكتمل</p>
        }
      </div>    }
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
        onChangeRowsPerPage={(value: number) => {
          setRowsPerPage(value);
        }}
        onSelectedRowsChange={handleSelectedRowsChange}
        selectableRows
        onChangePage={(value: number) => {
          setPage(value);
        }}
        // @ts-ignore
        customStyles={customStyles}
        expandableRows
        // @ts-ignore
        expandableRowsComponent={EstateNestedTable}
        noDataComponent="لا يوجد بيانات"
      />
    </div>
  );
};

export default DiplayAllEstates;
