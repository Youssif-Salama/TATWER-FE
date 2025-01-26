import { customStyles } from "@/common/TableRowStyle";
import DataTable from "react-data-table-component";
import CommonTooltip from "@/common/CommonTooltip";
import { useEffect, useState } from "react";
import { GetAllContractsApi } from "@/api/contract/GetAllContractsApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setGetContractType } from "@/store/slices/GlobalSlice";

const DisplayAllContractsLandlordsSimple = () => {
  // Static variables
  const dispatch:AppDispatch=useDispatch();
  const getContractType = "landlord";
  const page = 1;
  const rowPerPage = 10;
  const showWay = "asc";
  const searchKeyWord = null;
  const searchValue = null;
  const startDate = null;
  const endDate = null;
  const displayOnlyNearToEndedContracts = true;

  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [totalRows, setTotalRows] = useState<number>(10);
  const [allContracts, setAllContracts] = useState<any[]>([]);

  const getAllContracts = async () => {
    const result = await GetAllContractsApi(
      setLoading,
      getContractType,
      page,
      showWay,
      searchKeyWord,
      searchValue,
      startDate,
      endDate,
      displayOnlyNearToEndedContracts,
      rowPerPage
    );
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllContracts(result?.data?.data);
    !result && setAllContracts([]);
    !result && setTotalRows(0);
  };

  useEffect(() => {
    getAllContracts();
  }, []);

  const columns = [
    {
      name: "المؤجر - المستأجر",
      selector: (row: any) => <CommonTooltip field={row?.Name + " " + row?.NickName || "-"} />,
      minWidth: "120px",
    },
    {
      name: "الهويه",
      selector: (row: any) => <CommonTooltip field={row?.Identity || "-"} />,
      minWidth: "150px",
    },
    {
      name: "رقم العقد",
      selector: (row: any) => <CommonTooltip field={row?.ContractNumber || "-"} />,
      minWidth: "150px",
    },
    {
      name: "تاريخ الانتهاء",
      selector: (row: any) => row?.ContractEndsDate?.split("T")[0],
      minWidth: "100px",
    },
  ];

  return (
    <div className="text-[12px]">
    <div className="overflow-x-auto rounded-md">
                 <div className="text-[12px] flex items-center justify-between">
              <p className="text-[#0077bc]">عقود المستاءجرين التي قربت علي الانتهاء</p>
              <Link to="/contracts" className="bg-[#0077bc] px-4 py-1 rounded-md text-white"
              onClick={()=>{
                dispatch(setGetContractType("landlord"));
              }}
              >انتقل</Link>
    </div>
    </div>
    <div className="rounded-md border">
      <DataTable
        // @ts-ignore
        columns={columns}
        data={allContracts}
        // @ts-ignore
        customStyles={customStyles}
        noDataComponent="لا يوجد بيانات"
      />
    </div>
    </div>);
};

export default DisplayAllContractsLandlordsSimple;
