const ContractTable = ({ allContracts,fullView }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-[#0077bc] text-[12px] min-w-full">
        <thead>
          <tr className="bg-[#0077bc] text-white">
            <th className="font-semibold w-[50px] px-2 py-2">الرمز</th>
            <th className="font-semibold w-[150px] px-2 py-2">الاسم</th>
            <th className="font-semibold w-[150px] px-2 py-2">الهويه</th>
            <th className="font-semibold w-[100px] px-2 py-2">الجوال</th>
            <th className={`font-semibold w-[100px] px-2 py-2 ${!fullView && "hidden"}`}>جوال اخر</th>
            <th className={`font-semibold w-[100px] px-2 py-2 ${!fullView && "hidden"}`}>الصفه</th>
            <th className="font-semibold w-[150px] px-2 py-2">الايميل</th>
            <th className={`font-semibold w-[150px] px-2 py-2 ${!fullView && "hidden"}`}>العقار المرتبط</th>
            <th className="font-semibold w-[180px] px-2 py-2">المدينه الخاصه بالعقار</th>
            <th className={`font-semibold w-[150px] px-2 py-2 ${!fullView && "hidden"}`}>الحساب البنكي</th>
            <th className={`font-semibold w-[100px] px-2 py-2 ${!fullView && "hidden"}`}>المدينه</th>
            <th className="font-semibold w-[100px] px-2 py-2">الممثل</th>
            <th className="font-semibold w-[120px] px-2 py-2">جوال الممثل</th>
            <th className="font-semibold w-[120px] px-2 py-2">رقم الوكاله</th>
            <th className="font-semibold w-[120px] px-2 py-2">رقم العقد</th>
            <th className="font-semibold w-[150px] px-2 py-2">بدايه العقد</th>
            <th className="font-semibold w-[150px] px-2 py-2">نهايه العقد</th>
            <th className="font-semibold w-[120px] px-2 py-2">مسجل علي</th>
          </tr>
        </thead>
        <tbody className="font-normal text-[10px]" >
          {allContracts.map((contract: any, index: number) => (
            <tr key={index} className={(index%2===0)?"bg-[#0077bc17]":"bg-white"}>
              <td className="px-2 py-2 whitespace-nowrap">{index + 1 || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.Name || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.IdNumber || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.Mobile || "-"}</td>
              <td className={`px-2 py-2 whitespace-nowrap ${!fullView && "hidden"}`}>{contract?.AdditionalPhone || "-"}</td>
              <td className={`${!fullView && "hidden"} px-2 py-2 whitespace-nowrap`}>{
                (contract?.Type==="Tenant")?"مؤجر":"مستأجر"
                }</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.Email || "-"}</td>
              <td className={`px-2 py-2 whitespace-nowrap ${!fullView && "hidden"}`}>{contract?.estate?.EstateName || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.estate?.PieceNumber || "-"}</td>
              <td className={`${!fullView && "hidden"} px-2 py-2 whitespace-nowrap`}>{contract?.BankAccount || "-"}</td>
              <td className={`${!fullView && "hidden"} px-2 py-2 whitespace-nowrap`}>{contract?.AddressId?.Town || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.Agent || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.MobileNumber || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.DocumentNumber || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.ContractNumber || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.ContractReleaseDate?.slice(0, 10) || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.ContractEndDate?.slice(0, 10) || "-"}</td>
              <td className="px-2 py-2 whitespace-nowrap">{contract?.RelyOn || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
