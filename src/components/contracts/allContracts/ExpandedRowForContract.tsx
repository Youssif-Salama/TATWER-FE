import { GetAllConractUnites } from "@/api/contractUnites/GetAllConractUnites";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useEffect, useState } from "react";

const ExpandedRowForContract = ({ data }: any) => {
  const { _id } = data;
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const [page, setPage] = useState(1);
  const [unites, setUnites] = useState<any>(null);
  const getContractUnites = async () => {
    const result = await GetAllConractUnites(setLoading, _id, page);
    result && setUnites(result?.data?.data[0]?.UniteId?.EstateId);
  };

  useEffect(() => {
    getContractUnites();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : unites? (
        <div className="p-4">
          <p className="text-[#0077bc] text-[14px] mb-4">العقار</p>
          <div className="grid grid-cols-5 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          <p className="flex items-start gap4">
            <span>اسم العقار</span>:
            <span className="mx-2">{unites?.EstateName || "-"}</span>
          </p>
          <p className="flex items-start gap4">
            <span>رقم وثيقة العقار</span>:
            <span className="mx-2">{unites?.TitleDeedNumber || "-"}</span>
          </p>
          <p className="flex items-start gap4">
            <span>مساحه العقار</span>:
            <span className="mx-2">{unites?.EstateSpace || "-"}</span>
          </p>
          <p className="flex items-start gap4">
            <span> رقم القطعه</span>:
            <span className="mx-2">{unites?.PieceNumber || "-"}</span>
          </p>
          <p className="flex items-start gap4">
            <span> المخطط</span>:
            <span className="mx-2">{unites?.PlanNumber || "-"}</span>
          </p>
          <p className="flex items-start gap4">
            <span> الملحوظات</span>:
            <span className="mx-2 max-w-[400px] whitespace-wrap break-words">{unites?.Notes || "-"}</span>
          </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center h-[10vh] justify-start p-4">
          لا يوجد وحدات او عقارات مرتبطه بهذا العقد
        </div>
      )}
    </div>
  );
};

export default ExpandedRowForContract;