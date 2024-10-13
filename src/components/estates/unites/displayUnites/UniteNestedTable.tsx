const UniteNestedTable = ({ data }: any) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 text-[12px]">
      {data?.ElecMeters && data?.ElecMeters.length > 0 && (
        <div className="border border-[#0077bc] p-4">
          <h3 className="font-bold mb-2">عدادات الكهرباء</h3>
          <p>{data.ElecMeters.join("- ")}</p>
        </div>
      )}

      {data?.WaterMeters && data?.WaterMeters.length > 0 && (
        <div className="border border-[#0077bc] p-4">
          <h3 className="font-bold mb-2">عدادات المياه</h3>
          <p>{data.WaterMeters.join("- ")}</p>
        </div>
      )}

      {data?.TelMeters && data?.TelMeters.length > 0 && (
        <div className="border border-[#0077bc] p-4">
          <h3 className="font-bold mb-2">الهواتف</h3>
          <p>{data.TelMeters.join("- ")}</p>
        </div>
      )}

      {data?.GasMeters && data?.GasMeters.length > 0 && (
        <div className="border border-[#0077bc] p-4">
          <h3 className="font-bold mb-2">عدادات الغاز</h3>
          <p>{data.GasMeters.join("- ")}</p>
        </div>
      )}
    </div>
  );
};

export default UniteNestedTable;
