import { useEffect, useState } from "react";
import ReportsHead from "../../nav/ReportsHead";
import EstateFilters from "./EstateFilters";
import {
  GetAllEstatesForReportsWithAddress,
  GetAllEstatesForReportsWithRelyOn,
} from "@/api/estate/GetAllEstatesForReports";
import SystemsPagination from "@/components/systems/SystemsPagination";
import LoadingSpinner from "@/common/LoadingSpinner";
import EstateTable from "./EstateTable";
import {
  generateArabicExcelFromArrayForEstates,
  generatePdfFromArray,
  generatePdfFromArrayForEstate,
} from "@/methods/Print";

const EstateMain = () => {
  const [searchWay, setSearchWay] = useState<any>(null);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [allEstates, setAllEstates] = useState<any>([]);
  const [situation, setSituation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<any>(1);
  const [totalRows, setTotalRows] = useState<any>(null);
  const [contracts, setContracts] = useState<any>(null);
  const [allEstatesAtAll, setAllEstatesAtAll] = useState<any>([]);
  const [pageForAllEstatesAtAll, setPageForAllEstatesAtAll] = useState<any>(1);

  const headers = [
    "الرمز",
    "المشروع",
    "وثيقه الملكيه",
    "المساحه",
    "رقم القطعه",
    "رقم المخطط",
    "ملحوظات",
    "الحاله",
    "مسجل علي",
  ];

  const headersForAddress = [
    "الرمز",
    "المشروع",
    "وثيقه الملكيه",
    "المساحه",
    "رقم القطعه",
    "رقم المخطط",
    "ملحوظات",
    "الحاله",
  ];

  const keysForAddress = [
    "EstateName",
    "TitleDeedNumber",
    "EstateSpace",
    "PieceNumber",
    "PlanNumber",
    "Notes",
    "Situation",
  ];

  const keys = [
    "EstateName",
    "TitleDeedNumber",
    "EstateSpace",
    "PieceNumber",
    "PlanNumber",
    "Notes",
  ];

  const getAllEstates = async () => {
    let result;
    if (searchWay == "relyOn") {
      result = await GetAllEstatesForReportsWithRelyOn(
        setLoading,
        page,
        situation,
        searchValue
      );
      result && setAllEstates(result.data?.data);
      result && setContracts(result.data?.contracts);
    } else {
      result = await GetAllEstatesForReportsWithAddress(
        setLoading,
        page,
        situation,
        { location: searchValue }
      );
      result &&
        result.data?.data[0]?.AddressId !== null &&
        setAllEstates(result.data?.data);
    }
    result && setTotalRows(result.data?.meta?.numberOfRows);
  };

  useEffect(() => {
    setAllEstates([]);
    getAllEstates();
  }, [searchWay, searchValue, situation, page]);

  const getAllEstatesAtAll = async () => {
    let result:any=[];
    if (searchWay == "relyOn") {
      result = await GetAllEstatesForReportsWithRelyOn(
        setLoading,
        page,
        situation,
        searchValue
      );
      result &&
        setAllEstatesAtAll((prevData: any) => {
          const newData = result?.data?.data; // Ensure this accesses the correct data
          const seen = new Set();

          // Combine previous data with new data and filter for uniqueness
          const uniqueData = [...prevData, ...newData].filter((item: any) => {
            if (seen.has(item?._id)) {
              return false; // Skip if already seen
            }
            seen.add(item?._id); // Add to seen set
            return true; // Keep unique item
          });

          return uniqueData; // Set the unique data
        });
      result && setContracts(result.data?.contracts);
      (result && result?.data?.meta?.nextPage) && setPageForAllEstatesAtAll(pageForAllEstatesAtAll + 1);
    } else {
      result = await GetAllEstatesForReportsWithAddress(
        setLoading,
        page,
        situation,
        { location: searchValue }
      );
     ( result &&
        result.data?.data[0]?.AddressId !== null) &&
        setAllEstatesAtAll((prevData: any) => {
          const newData = result?.data?.data; // Ensure this accesses the correct data
          const seen = new Set();

          // Combine previous data with new data and filter for uniqueness
          const uniqueData = [...prevData, ...newData].filter((item: any) => {
            if (seen.has(item?._id)) {
              return false; // Skip if already seen
            }
            seen.add(item?._id); // Add to seen set
            return true; // Keep unique item
          });

          return uniqueData; // Set the unique data
        });
        (result && result?.data?.meta?.nextPage) && setPageForAllEstatesAtAll(pageForAllEstatesAtAll + 1);
    }
  };

  useEffect(() => {
    getAllEstatesAtAll();
  }, [searchWay, searchValue, situation, pageForAllEstatesAtAll]);

  return (
    <div className="py-8">
      <div>
        {/* header */}
        <ReportsHead message="تقارير عن  المواقع" />
      </div>
      <div>
        {/* estates filters */}
        <EstateFilters
          setSearchWay={setSearchWay}
          setSearchValue={setSearchValue}
          setSituation={setSituation}
        />
      </div>
      {((searchWay == "address" &&
        allEstates &&
        allEstates?.length > 0 &&
        allEstates[0]?.AddressId !== null) ||
        (searchWay == "relyOn" && allEstates && allEstates?.length > 0)) && (
        <div className="flex items-center justify-end gap-x-1 mb-1 pt-6">
          {/* printing */}
          <div>
            {searchWay == "address" &&
              allEstates &&
              allEstates?.length > 0 &&
              allEstates[0]?.AddressId !== null && (
                <button
                  onClick={() => {
                    generatePdfFromArray(
                      allEstates,
                      headersForAddress,
                      keysForAddress,
                      "A1",
                      "تطوير-تقرير-المشاريع"
                    );
                  }}
                  className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white"
                >
                  pdf
                </button>
              )}
            {searchWay == "relyOn" && allEstates && allEstates?.length > 0 && (
              <button
                onClick={() => {
                  generatePdfFromArrayForEstate(
                    allEstatesAtAll,
                    headers,
                    keys,
                    "A1",
                    "تطوير-تقرير-المشاريع",
                    contracts,
                    "true"
                  );
                }}
                className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white"
              >
                pdf
              </button>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                generateArabicExcelFromArrayForEstates(
                  allEstates,
                  headers,
                  keys,
                  "تطوير-تقرير-المشاريع",
                  contracts,
                  "true"
                );
              }}
              className="bg-green-500 text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white"
            >
              excel
            </button>
          </div>
        </div>
      )}
      <div className="py-6">
        {/* table */}
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div>
              {searchWay == "address" &&
                allEstates &&
                allEstates?.length > 0 &&
                allEstates[0]?.AddressId !== null && (
                  <EstateTable allEstates={allEstates} />
                )}
              {searchWay == "relyOn" &&
                allEstates &&
                allEstates?.length > 0 && (
                  <EstateTable allEstates={allEstates} contracts={contracts} />
                )}
              {(!allEstates || allEstates?.length === 0) && (
                <div className="py-6 text-[12px] flex items-center gap-1 bg-gray-100 border justify-center p-4">
                  لا يوجد بيانات
                </div>
              )}
            </div>
            <div>
              {((searchWay == "address" &&
                allEstates &&
                allEstates?.length > 0 &&
                allEstates[0]?.AddressId !== null) ||
                (searchWay == "relyOn" &&
                  allEstates &&
                  allEstates?.length > 0)) && (
                <div className="py-6 text-[12px] flex items-center gap-1">
                  {/* pagination */}
                  <div>
                    <SystemsPagination
                      page={page}
                      setPage={setPage}
                      totalRows={totalRows}
                    />
                  </div>
                  <div>- {totalRows} -</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EstateMain;
