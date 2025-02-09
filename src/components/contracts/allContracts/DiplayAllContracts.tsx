import { GetAllContractsApi, GetAllContractsPerEstateApi } from "@/api/contract/GetAllContractsApi";
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

const DiplayAllContracts = ({searchKeyWord,searchValue,showWay,startDate,endDate,displayOnlyNearToEndedContracts}:{searchKeyWord:string |null,searchValue:string|null,showWay:string|null,startDate:string|null,endDate:string|null,displayOnlyNearToEndedContracts?:any}) => {
  const today = new Date();
  const dateAfter40Days = new Date(today.getTime() + 40 * 24 * 60 * 60 * 1000);
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
    const result = await GetAllContractsApi(setLoading, getContractType, page,showWay,searchKeyWord,searchValue,startDate,endDate,displayOnlyNearToEndedContracts,rowPerPage);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
    !result && setAllContracts([]);
    !result && setTotalRows(0);
  };


  const getAllContractsDependingOnTypePerEstate = async () => {
    const result = await GetAllContractsPerEstateApi(setLoading, getContractType, page,showWay,searchValue,startDate,endDate,rowPerPage);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
    !result && setAllContracts([]);
    !result && setTotalRows(0);
  };
  useEffect(() => {
      if(searchKeyWord=="estate"){
        getAllContractsDependingOnTypePerEstate();
        console.log("getAllContractsDependingOnTypePerEstate");

      }
      else{
        getAllContractsDependingOnType();
      }

  }, [getContractType, page,searchKeyWord,searchValue,showWay,startDate,endDate,refreshONDeleteContracts,rowPerPage,displayOnlyNearToEndedContracts]);




  const columns = [
    {
      name: "الرمز",
      selector: (row: AllContractTypes, index: number) => {
        const isContractEndingSoon = row?.ContractEndsDate
          && new Date(row.ContractEndsDate) < dateAfter40Days
          && new Date(row.ContractEndsDate) > today;
        const isContractEnded = row?.ContractEndsDate && new Date(row.ContractEndsDate) < today;

        return (
          <div
            className={`${isContractEndingSoon ? "bg-yellow-500 px-2 py-1 text-white rounded-full" : ""}
            ${isContractEnded ? "bg-red-500 px-2 py-1 text-white rounded-full" : ""}
            `}
          >
            {index + 1}
          </div>
        );
      }
      ,
      minWidth:"50px"
    },{
      name: "المؤجر - المستأجر",
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.Name + " "+row?.NickName || "-"}/>,
      minWidth:"200px"
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
      selector: (row: AllContractTypes) => <CommonTooltip field={row?.AddressId?.Town   || "-"}/>,
      minWidth:"70px"
    },
    {
      name: "رقم العقد",
      selector: (row: AllContractTypes) => < CommonTooltip field={row?.ContractNumber || "-"}/>,
      minWidth:"200px"
    },
    {
      name: "طريقه الدفع",
      selector: (row: AllContractTypes) =>< CommonTooltip field={`كل ${row?.PaymentWay} اشهر` || "-"}/>,
      minWidth:"50px"
    },
    {
      name: "عدد الدفعات",
      selector: (row: AllContractTypes) => < CommonTooltip field={row?.Times || "-"}/>,
      minWidth:"70px"
    },
    {
      name: "تاريخ البدء",
      selector: (row: AllContractTypes) =>
        new Date(row?.ContractSigningDate).toLocaleDateString(),
      minWidth:"100px"
    },
    {
      name: "تاريخ الانتهاء",
      selector: (row: AllContractTypes) => new Date(row?.ContractEndsDate).toLocaleDateString(),
      minWidth:"100px"
    },
    {
      name: "مسحل علي",
      selector: (row: AllContractTypes) => row?.RelyOn,
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
        customStyles={
          displayOnlyNearToEndedContracts?{
            ...customStyles,
            rows: {
              ...customStyles.rows,
              style: {
                ...customStyles.rows.style,
                backgroundColor: '#0077bc25',
              }
            }
          }:customStyles
        }
        noDataComponent="لا يوجد بيانات"
      />
          </>
        )
      }
    </div>
  );

};

export default DiplayAllContracts;
