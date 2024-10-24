import { GetAllContractsApi } from "@/api/contract/GetAllContractsApi";
import { customStyles } from "@/common/TableRowStyle";
import { RootState } from "@/store/store";
import { AllContractTypes } from "@/types/GetAllContractTypes";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import NestedTableFeatures from "./NestedTableFeatures";
import { StopContractApi } from "@/api/contract/StopContractApi";
import CommonTooltip from "@/common/CommonTooltip";
import ExpandedRowForContract from "./ExpandedRowForContract";

const DiplayAllContracts = ({searchKeyWord,searchValue,showWay,startDate,endDate}:{searchKeyWord:string |null,searchValue:string|null,showWay:string|null,startDate:string|null,endDate:string|null}) => {

  const { getContractType ,refreshONDeleteContracts} = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [allContracts, setAllContracts] = useState<any[]>([]);
  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);
  const [rowPerPage, setRowPerPage] = useState<number>(10);

  const getAllContractsDependingOnType = async () => {
    const result = await GetAllContractsApi(setLoading, getContractType, page,showWay,searchKeyWord,searchValue,startDate,endDate,rowPerPage);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
    !result && setAllContracts([]);
    !result && setTotalRows(0);
  };
  useEffect(() => {
    getAllContractsDependingOnType();
  }, [getContractType, page,searchKeyWord,searchValue,showWay,startDate,endDate,refreshONDeleteContracts,rowPerPage]);




  const columns = [
    {
      name: "الرمز",
      // @ts-ignore
      selector: (row: AllContractTypes, index: number) => index + 1,
      minWidth:"70px"
    },{
      name: "المؤجر - المستأجر",
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.Name || "-"}/>,
      minWidth:"120px"
    },
    {
      name: "الهويه",
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.Identity || "-"}/>,
      minWidth:"150px"
    },{
      name: "الجوال",
      selector: (row: AllContractTypes) =>  <CommonTooltip field={row?.Phone || "-"}/>,
      minWidth:"150px"
    },
    {
      name: "الايميل",
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.Email || "-"}/>,
      minWidth:"150px"
    },
    {
      name: "المدينه",
      // @ts-ignore
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.City?.CityName || "-"}/>,
      minWidth:"150px"
    },
    {
      name: "رقم العقد",
      selector: (row: AllContractTypes) => < CommonTooltip field={row?.ContractNumber || "-"}/>,
      minWidth:"150px"
    },
    {
      name: " صفه",
      selector: (row: AllContractTypes) => {
        return row?.Type == "tenant" ? "مؤجر" : "مستأجر";
      },
      minWidth:"100px"
    },
    {
      name: "طريقه الدفع",
      selector: (row: AllContractTypes) =>< CommonTooltip field={`كل ${row?.PaymentWay} اشهر` || "-"}/>,
      minWidth:"150px"
    },
    {
      name: "عدد الدفعات",
      selector: (row: AllContractTypes) => < CommonTooltip field={row?.Times || "-"}/>,
      minWidth:"70px"
    },
    {
      name: "تاريخ البدء",
      selector: (row: AllContractTypes) =>
        row?.ContractReleaseDate?.split("T")[0],
      minWidth:"100px"
    },
    {
      name: "تاريخ  البدء الهجري",
      selector: (row: AllContractTypes) =>
        row?.ContractReleaseDateH?.split("T")[0],
      minWidth:"100px"
    },
    {
      name: "تاريخ الانتهاء",
      selector: (row: AllContractTypes) => row?.ContractEndDate?.split("T")[0],
      minWidth:"100px"
    },
    {
      name: "تاريخ  الانتهاء الهجري",
      selector: (row: AllContractTypes) => row?.ContractEndDateH?.split("T")[0],
      minWidth:"100px"
    },
    {
      name: "الحاله",
      selector: (row: AllContractTypes) =>{
        return <div>
          {
            row?.IsRuning ? <p
            onClick={async()=>{
              await StopContractApi(row?._id,{IsRuning:!row?.IsRuning})
              getAllContractsDependingOnType()
            }}
            className="bg-green-500 px-2 py-1 rounded-md text-white text-[12px] cursor-pointer">مفعل</p>
            :<p
            onClick={async()=>{
              await StopContractApi(row?._id,{IsRuning:!row?.IsRuning})
              getAllContractsDependingOnType()
            }}
            className="bg-red-500 px-2 py-1 rounded-md text-white text-[12px] cursor-pointer">غير مفعل</p>
          }
        </div>
      },
    },
  ];


  const handleSelectedRowsChange=({selectedRows}:any)=>{
    setCatchSelectedRows(selectedRows)
  }

  useEffect(()=>{
    setCatchSelectedRows([])
  },[])

  return (
    <div className="py-4 text-[12px]">
      {
        false ? (
          <div>Access Denied</div>
        ) : (
          <>
            {
              catchSelectedRows.length > 0 && (
                <NestedTableFeatures selectedRows={catchSelectedRows} setCatchSelectedRows={setCatchSelectedRows} />
              )
            }
             <DataTable
        // @ts-ignore
        columns={columns}
        data={allContracts}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        expandableRows
        expandableRowsComponent={ExpandedRowForContract}
        onChangeRowsPerPage={(value: number) => {
            setRowPerPage(value);
        }}
        selectableRows
        onChangePage={(value: number) => {
          setPage(value);
        }}
        // @ts-ignore
        customStyles={customStyles}
        noDataComponent="لا يوجد بيانات"
      />
          </>
        )
      }
    </div>
  );

};

export default DiplayAllContracts;
