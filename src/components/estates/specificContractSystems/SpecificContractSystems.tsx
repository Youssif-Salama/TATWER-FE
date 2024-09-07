import { GetContractSystemsApi } from "@/api/systems/GetContractSystemsApi";
import { RootState } from "@/store/store";
import { SpecificContractSystemTypes } from "@/types/SpecificContractSystemTypes";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import AddNewContractSystem from "./AddNewContractSystem";
import {  customStylesSystems } from "@/common/TableRowStyle";
import NestedTableFeatures from "./NestedTableFeatures";

const SpecificContractSystems = () => {
  const [contractSystems, setContractSystems] = useState<
    SpecificContractSystemTypes[] | null
  >(null);
  const [totalRows, setTotalRows] = useState<number>(10);
  const contractId: any = Cookies.get("contractId");

  const { refreshOnAddNewContractSystem,refreshOnDeleteContractSystems } = useSelector(
    (state: RootState) => state.GlobalReducer
  );

  const [page, setPage] = useState(1);

  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);

  const getSpecificContractSystems = async () => {
    const result = await GetContractSystemsApi(contractId,page);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setContractSystems(result?.data?.data);
    !result && setContractSystems(null);
  };
  useEffect(() => {
    if(contractId)    getSpecificContractSystems();
  }, [ contractId]);

  useEffect(()=>{
    setPage(1)
    getSpecificContractSystems();
  },[,refreshOnDeleteContractSystems])

  useEffect(()=>{
    getSpecificContractSystems();
  },[page,refreshOnAddNewContractSystem])

  const columns = [
    {
      name: "الرقم",
      selector: (row: SpecificContractSystemTypes, index: number) => index + 1,
    },
    {
      name: "رقم الدفعه",
      selector: (row: SpecificContractSystemTypes) => row.SystemNumber,
    },
    {
      name: "قيمه الايجار",
      selector: (row: SpecificContractSystemTypes) => row.RentValue,
    },
    {
      name: "المبالغ الثابته",
      selector: (row: SpecificContractSystemTypes) => row.FixedPrice,
    },
    {
      name: " تاريخ البدأ",
      selector: (row: SpecificContractSystemTypes) =>
        row.ReleaseDate.split("T")[0],
    },
    {
      name: " تاريخ الانتهاء",
      selector: (row: SpecificContractSystemTypes) => row.DueDate.split("T")[0],
    },
    {
      name: "تاريخ البدأ الهجري",
      selector: (row: SpecificContractSystemTypes) =>
        row.ReleaseDateH.split("T")[0],
    },
    {
      name: " تاريخ الانتهاء الهجري",

      selector: (row: SpecificContractSystemTypes) =>
        row.DueDateH.split("T")[0],
    }
  ];

  const handleSelectedRowsChange=({selectedRows}:any)=>{
    setCatchSelectedRows(selectedRows)
  }

  return (
    <div dir="rtl">
      {(contractSystems) && (
        <>
          <div className="mb-6">
            <p className="h-[2px] bg-gray-300" />
          </div>
          <div className="text-sm mb-2 py-2">
            <AddNewContractSystem/>
          </div>
          {
        catchSelectedRows.length > 0 && <NestedTableFeatures selectedRows={catchSelectedRows} setCatchSelectedRows={setCatchSelectedRows} />
      }
          {contractSystems &&
            <div className="shadow-md">
            <DataTable
              // @ts-ignore
              columns={columns}
              data={contractSystems}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              selectableRows
              onSelectedRowsChange={handleSelectedRowsChange}

              onChangePage={(value:number)=>{
                setPage(value)
              }}
              // @ts-ignore
              customStyles={customStylesSystems}
              noDataComponent="لا يوجد بيانات"
            />
            </div>
          }
        </>
      )}
    </div>
  );
};

export default SpecificContractSystems;
