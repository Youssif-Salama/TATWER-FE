import { GetAllContractsApi } from "@/api/contract/GetAllContractsApi";
import { customStyles } from "@/common/TableRowStyle";
import { RootState } from "@/store/store";
import { AllContractTypes } from "@/types/GetAllContractTypes";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import NestedTableFeatures from "./NestedTableFeatures";
import { StopContractApi } from "@/api/contract/StopContractApi";

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

  const getAllContractsDependingOnType = async () => {
    const result = await GetAllContractsApi(setLoading, getContractType, page,showWay,searchKeyWord,searchValue,startDate,endDate);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
    !result && setAllContracts([]);
    !result && setTotalRows(0);
  };
  useEffect(() => {
    getAllContractsDependingOnType();
  }, [getContractType, page,searchKeyWord,searchValue,showWay,startDate,endDate,refreshONDeleteContracts]);




  const columns = [
    {
      name: "رقم العقد",
      // @ts-ignore
      selector: (row: AllContractTypes, index: number) => index + 1,
    },{
      name: " الاسم",
      selector: (row: AllContractTypes) => row?.Name,
    },
    {
      name: "رقم الجوال",
      selector: (row: AllContractTypes) => row?.Phone,
    },{
      name: "الهويه",
      selector: (row: AllContractTypes) => row?.Identity,
    },
    {
      name: " صفه",
      selector: (row: AllContractTypes) => {
        return row?.Type == "tenant" ? "مؤجر" : "مستأجر";
      },
    },
    {
      name: "طريقه الدفع",
      selector: (row: AllContractTypes) => {
        if (row?.PaymentWay == "1") {
          return "شهري";
        } else if (row?.PaymentWay == "3") {
          return "ربع سنوي";
        } else if (row?.PaymentWay == "6") {
          return "نصف سنوي";
        } else if (row?.PaymentWay == "12") {
          return "سنوي";
        } else {
          return `${row?.PaymentWay} شهور`;
        }
      },
    },
    // {
    //   name: "سعر الدفعه",
    //   selector: (row: AllContractTypes) => row?.Price,
    // },
    // {
    //   name: "سعر الدفعه الثابت",
    //   selector: (row: AllContractTypes) => row?.FixedPrice,
    // },
    {
      name: "عدد الدفعات",
      selector: (row: AllContractTypes) => row?.Times,
    },
    {
      name: "السعر الكلي",
      selector: (row: AllContractTypes) => row?.TotalPrice,
    },
    {
      name: "تاريخ البدء",
      selector: (row: AllContractTypes) =>
        row?.ContractReleaseDate?.split("T")[0],
    },
    {
      name: "تاريخ  البدء الهجري",
      selector: (row: AllContractTypes) =>
        row?.ContractReleaseDateH?.split("T")[0],
    },
    {
      name: "تاريخ الانتهاء",
      selector: (row: AllContractTypes) => row?.ContractEndDate?.split("T")[0],
    },
    {
      name: "تاريخ  الانتهاء الهجري",
      selector: (row: AllContractTypes) => row?.ContractEndDateH?.split("T")[0],
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
