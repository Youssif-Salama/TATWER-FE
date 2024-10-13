import { GetAllSystemsForPrintingApi } from "@/api/systems/GetAllSystemsForPrintingApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx"; // استيراد مكتبة xlsx

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Amiri: {
    normal: 'https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Regular.ttf',
    bold: "https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Bold.ttf"
  }
};

const SystemPrintMain = ({ applied }: { applied: any }) => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [allSystems, setAllSystems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  const handleGeneratePdf = () => {
    const docDefinition = {
      content: [
        {
          text: 'العقاري للتطوير البوادي  شركه',
          style: 'companyName',
          alignment: 'center',
          margin: [0, 10, 0, 10],
        },
        {
          columns: [
            {
              text: `${new Date().toLocaleDateString()}  اليوم  تاريخ`,
              style: 'date',
              alignment: 'center',
              margin: [0, 0, 0, 15],
              width: '*',
            },
            {
              text: `  ${meta?.numberOfRows} الدفعات عدد`,
              style: 'date',
              alignment: 'center',
              margin: [0, 0, 0, 15],
              width: '*',
            },
          ],
          margin: [0, 0, 0, 15],
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*','*'],
            body: [
              [
                { text: 'الدفعه  رقم', bold: true, style: "header" },
                { text: 'الكلي  السعر', bold: true, style: "header" },
                { text: 'السداد  تاريخ', bold: true, style: "header" },
                { text: 'السداد  حاله', bold: true, style: "header" },
                { text: 'السداد  طريقه', bold: true, style: "header" },
                { text: ' العقد', bold: true, style: "header" },
                { text: ' المشروع', bold: true, style: "header" },
                { text: ' المدينه', bold: true, style: "header" },
              ],
              ...allSystems.map((system) => [
                { text: system?.SystemNumber, style: 'tableCell' },
                { text: (+system?.RentValue + system?.FixedPrice), style: 'tableCell' },
                { text: system?.DueDate?.split('T')[0], style: 'tableCell' },
                { text: system?.Applied ? "دفعها  تم" : "دفعها  يتم  لم", style: 'tableCell' },
                { text: " اشهر" + system?.PaymentWay, style: 'tableCell' },
                { text: system?.ContractId?.Name, style: 'tableCell' },
                { text: system?.estateName, style: 'tableCell' },
                { text: system?.ContractId?.AddressId?.City || "_", style: 'tableCell' },
              ]),
            ],
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex % 2 === 0 ? '#f3f3f3' : '#ffffff'),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          color: '#0077bc',
          bold: true,
          alignment: 'center',
        },
        companyName: {
          fontSize: 16,
          bold: true,
          color: '#0077bc',
        },
        date: {
          fontSize: 12,
          color: '#333333',
        },
        tableCell: {
          fontSize: 10,
          color: '#333333',
          alignment: 'center',
        }
      },
      defaultStyle: {
        font: 'Amiri',
        direction: 'rtl',
      },
    };
    // @ts-ignore
    pdfMake.createPdf(docDefinition).download('system-print.pdf');
  };

  const handleGenerateExcel = () => {
    const worksheetData = allSystems.map(system => ({
      "رقم الدفعه": system?.SystemNumber,
      "السعر الكلي": (+system?.RentValue + system?.FixedPrice),
      "تاريخ السداد": system?.DueDate?.split('T')[0],
      "حاله السداد": system.Applied ? "تم دفعها" : "لم يتم دفعها",
      "طريقة السداد": `${system?.PaymentWay} اشهر`,
      "العقد": system?.ContractId?.Name,
      "المشروع": system?.estateName,
      "المدينة": system?.ContractId?.AddressId?.City || "_"
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'أنظمة السداد');
    XLSX.writeFile(workbook, 'systems.xlsx');
  };

  const getAllSystems = async () => {
    setLoading(true);
    try {
      const result = await GetAllSystemsForPrintingApi(applied, page);
      if (result) {
        setAllSystems((prevSystems) => {
          const currentSystemIds = new Set(prevSystems.map(system => system._id));
          const newSystems = result.data.data.filter((system: any) => !currentSystemIds.has(system._id));
          return [...prevSystems, ...newSystems];
        });
        setMeta(result.data.meta);
      }
    } catch (err) {
      setError('فشل في جلب الأنظمة');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSystems();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setAllSystems([]);
    getAllSystems();
  }, [applied]);

  useEffect(() => {
    if (meta && meta.nextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [meta]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          {error}
        </div>
      ) : allSystems.length === 0 ? (
        <div className="text-center text-[#0077bc] text-[12px] h-[80vh] flex items-center justify-center">
          <p>لا توجد أنظمة للطباعة.</p>
        </div>
      ) : (
        <div>
          <button onClick={handleGeneratePdf} className="bg-[#0077bc] px-2 text-white text-[12px] p-1 font-semibold">
            تحميل PDF
          </button>
          <button onClick={handleGenerateExcel} className="bg-green-500 px-2 text-white text-[12px] ml-2 p-1 font-semibold">
            تحميل Excel
          </button>
          <div ref={pageRef} className="border border-[#0077bc] max-h-[80vh] overflow-scroll print relative mt-4">
            <div className="bg-[#0077bc] p-2 grid grid-cols-8 text-[14px] text-white sticky top-0 w-full">
              <div>رقم الدفعه</div>
              <div>السعر الكلي</div>
              <div>تاريخ السداد</div>
              <div>حاله السداد</div>
              <div>طريقة السداد</div>
              <div>العقد</div>
              <div>المشروع</div>
              <div>المدينة</div>
            </div>
            <div className="flex flex-col gap-1 p-2">
              {
               // @ts-ignore
              allSystems.map((system: any, index: number) => (
                <div key={system._id} className="grid grid-cols-8 text-[12px]">
                  <div className="px-1">{system?.SystemNumber}</div>
                  <div className="px-1">{(+system?.RentValue + system?.FixedPrice)}</div>
                  <div className="px-1">{system?.DueDate?.split('T')[0]}</div>
                  <div className="px-1">{system.Applied ? "تم دفعها" : "لم يتم دفعها"}</div>
                  <div className="px-1">{system?.PaymentWay} اشهر</div>
                  <div className="px-1">{system?.ContractId?.Name}</div>
                  <div className="px-1">{system?.estateName}</div>
                  <div className="px-1">{system?.ContractId?.AddressId?.City || "_"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SystemPrintMain;
