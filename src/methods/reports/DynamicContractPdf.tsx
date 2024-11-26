import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { decryptValue } from "@/utils/encrypt";
import CommonReportContractsTable from "./CommonReportContractsTable";

// Component for the PDF document
const PdfDocument = ({ data }: any) => <CommonReportContractsTable allContracts={data} />;

const DynamicContractPdf = () => {
  const [preparing, setPreparing] = useState(true);
  const [fileName, setFileName] = useState("ملف العقود من تطوير البوادي");
  const reportContractsPdf: any = localStorage.getItem("reportContractsPdf");
  const [decryptedData, setDecryptedData] = useState<any>([]);

  // Clear PDF data on unmount and simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreparing(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const decryptData = decryptValue(reportContractsPdf);
    setDecryptedData(decryptData);
  }, [reportContractsPdf]);

  // Generate PDF Blob for preview
  const generatePdfBlob = async () => {
    const pdfDocument = <PdfDocument data={decryptedData} />;
    const blob = await pdf(pdfDocument).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg border shadow-md p-4 flex flex-col gap-4">
        {preparing ? (
          <div className="flex flex-col items-center gap-2">
            <Loader className="animate-spin" />
            <p>جاري تجهيز الملف ...</p>
          </div>
        ) : (
          <div className="flex flex-row gap-4 w-full">
            <PDFDownloadLink
              document={<PdfDocument data={decryptedData} />}
              fileName={fileName+"A2"}
              className="p-2 px-4 bg-[#0077bc] text-white hover:bg-[#0077bcc1]"
            >
              تحميل
            </PDFDownloadLink>

            <button
              onClick={generatePdfBlob}
              className="p-2 px-4 bg-[#0077bc] text-white hover:bg-[#0077bcc1]"
            >
              معاينة
            </button>

            <input
              type="text"
              value={fileName}
              placeholder="أدخل اسم الملف"
              className="w-full p-2 border text-sm"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default DynamicContractPdf;
