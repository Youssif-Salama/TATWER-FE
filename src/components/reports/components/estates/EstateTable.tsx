const EstateTable = ({ allEstates,contracts }: any) => {

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-[#0077bc] text-[10px] min-w-full">
        <thead>
          <tr className="bg-[#0077bc] text-white">
            <th className="font-semibold w-[50px] px-2 py-2">الرمز</th>
            <th className="font-semibold w-[50px] px-2 py-2">المشروع</th>
            <th className="font-semibold w-[50px] px-2 py-2">وثيقه الملكيه</th>
            <th className="font-semibold w-[50px] px-2 py-2">المساحه</th>
            <th className="font-semibold w-[50px] px-2 py-2">رقم القطعه</th>
            <th className="font-semibold w-[50px] px-2 py-2">رقم المخطط</th>
            <th className="font-semibold w-[50px] px-2 py-2">الحساب البنكي</th>
            <th className="font-semibold w-[50px] px-2 py-2">الحاله</th>
            {
              contracts &&
              <th className="font-semibold w-[50px] px-2 py-2">مسجل علي</th>
            }

          </tr>
        </thead>
        <tbody className="font-normal text-[8px]" >
          {allEstates?.length>0 && allEstates?.map((estate: any, index: number) => (
            <tr key={index} className={(index%2===0)?"bg-[#0077bc17]":"bg-white"}>
              <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.EstateName}</td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.TitleDeedNumber}</td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.EstateSpace}</td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.PieceNumber}</td>
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.PlanNumber}</td>
              {contracts && <td className="px-2 py-2 whitespace-nowrap text-center">{contracts[index]?.BankAccount}</td>}
              <td className="px-2 py-2 whitespace-nowrap text-center">{estate?.Situation=="active" ? "مكتمل":"غير مكتمل"}</td>
              {
              contracts &&
              <th className="font-semibold w-[50px] px-2 py-2">{contracts[index]?.RelyOn}</th>
            }

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstateTable;
