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
import { StopSystemsApi } from "@/api/systems/StopSystemsApi";
import ContractSystemMessage from "./ContractSystemMessage";
import CommonTooltip from "@/common/CommonTooltip";

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
  const [limit, setLimit] = useState(10);

  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);

  const getSpecificContractSystems = async () => {
    const result = await GetContractSystemsApi(contractId,page,limit);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setContractSystems(result?.data?.data);
    !result && setContractSystems(null);
  };
  useEffect(() => {
      getSpecificContractSystems();
  }, [ contractId]);

  useEffect(()=>{
    setPage(1)
    getSpecificContractSystems();
  },[refreshOnDeleteContractSystems])

  useEffect(()=>{
    getSpecificContractSystems();
  },[page,refreshOnAddNewContractSystem,limit])
  // @ts-ignore
  const today=new Date();

  const columns = [
    {
      name: "رقم المسلسل",
      selector: (row: SpecificContractSystemTypes) => <div className={` ${row.Applied?"text-[#0077bc]":" "}`}>
        {row.SystemNumber}
      </div>,
    },
    {
      name: "قيمه الايجار",
      selector: (row: SpecificContractSystemTypes) => <CommonTooltip field={row?.RentValue}/>,
    },
    {
      name: "الضريبه",
      selector: (row: SpecificContractSystemTypes) =><CommonTooltip field={`${row?.TaxValue}%`}/>,
    },
    {
      name: "المبالغ الثابته",
      selector: (row: SpecificContractSystemTypes) =><CommonTooltip field={row?.FixedPrice}/>,
    },
    {
      name: "القيمه الكليه ",
      selector: (row: SpecificContractSystemTypes) => <CommonTooltip field={row?.TotalPrice}/>,
    },
    // {
    //   name: "الحاله",
    //   selector: (row: SpecificContractSystemTypes) => <div>
    //     {
    //       // @ts-ignore
    //       ((new Date(row?.DueDate)-today) && !row?.Applied)<0?<span className="text-red-500">متأحره</span>:<span className="text-[#0077bc]">قادم</span>
    //     }
    //     {
    //       // @ts-ignore
    //       row?.Applied && <span className="text-[#0077bc]">تم الدفع</span>
    //     }
    //   </div>,
    // },
    {
      name: " تاريخ البدأ",
      selector: (row: SpecificContractSystemTypes) =>
        row.ReleaseDate.split("T")[0],
    },
    {
      name: " تاريخ الاستحقاق",
      selector: (row: SpecificContractSystemTypes) => row.LastAskDate.split("T")[0],
    },
    {
      name: "تاريخ البدأ الهجري",
      selector: (row: SpecificContractSystemTypes) =>
        row.ReleaseDateH.split("T")[0],
    },
    {
      name: " تاريخ الاستحقاق الهجري",

      selector: (row: SpecificContractSystemTypes) =>
        row.LastAskDateH.split("T")[0],
    },
    {
      name:"الحاله",
      selector: (row: SpecificContractSystemTypes) => <div>
        {
          (!row?.Applied)?
          (<>
          {
            (row?.IsRuning)?<p
            onClick={async()=>{
              await StopSystemsApi(row?._id)
              getSpecificContractSystems()
            }}
            className="text-[12px] rounded-md px-2 py-1  cursor-pointer text-white bg-green-500">مفعل</p>:<p
            onClick={async()=>{
              await StopSystemsApi(row?._id)
              getSpecificContractSystems()
            }}
            className="text-[12px] rounded-md px-2 py-1  cursor-pointer text-white bg-red-500">غير مفعل</p>
          }
          </>):(<>
          {
              <p className="text-[12px] rounded-md px-2 py-1 text-white bg-[#0077bc]">مدفوع</p>
          }
          </>)

        }
      </div>
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
              expandableRows
              expandableRowsComponent={ContractSystemMessage}
              onChangePage={(value:number)=>{
                setPage(value)
              }}
              // @ts-ignore
              customStyles={customStylesSystems}
              noDataComponent="لا يوجد بيانات"
              onChangeRowsPerPage={(value:number)=>{
                setLimit(value)
              }}
            />
            </div>
          }
        </>
      )}
    </div>
  );
};

export default SpecificContractSystems;
