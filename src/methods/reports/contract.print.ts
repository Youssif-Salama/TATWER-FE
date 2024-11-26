// @ts-ignore
export const generatePdfForContracts = async(systems: any,headers: string[], keys: string[],pageType:string,pdfName:string,
  // @ts-ignore
 meta?: any) => {

   const pdfMake = (await import("pdfmake/build/pdfmake")).default;
   const pdfFonts = (await import("../../../vfs_fontes")).default;

   // Register the fonts
   pdfMake.vfs = pdfFonts.vfs;
   pdfMake.fonts = {
     Amiri: {
       normal: 'https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Regular.ttf',
       bold: "https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Bold.ttf"
     }
   };



 let headRow: any = [];
 let width:any=[];

 headers=headers.reverse();
 headers?.forEach((header: string) => {
   const reversedHeader = header.split(' ').reverse().join(' ');
   headRow.push({ text: reversedHeader, bold: true, style: "header", alignment: 'right',dir: 'rtl' });
   width.push("*");
 });


 const getValueFromNestedKeys = (obj: any, key: string) => {
   return key.split('.').reduce((o, k) => (o || {})[k], obj);
 };


 let tableMaped;

   tableMaped = systems.map((system: any, index: number) =>[
       { text: (index + 1).toLocaleString(), style: 'tableCell' },
       ...keys.reverse().map((key: string) => ({
         text: getValueFromNestedKeys(system, key) || '-',
         style: 'tableCell',
         alignment: 'right'
       })),
     ]
 )



 const docDefinition: any = {
   pageSize: pageType,
   pageOrientation: 'landscape',
   content: [
     {
       text: 'العقاري للتطوير البوادي  شركه',
       style: 'companyName',
       alignment: 'center',
       margin: [0, 10, 0, 10],
     },
     {
       text: `${new Date().toLocaleDateString()}  اليوم  تاريخ`,
       style: 'date',
       alignment: 'center',
       margin: [0, 0, 0, 15],
       width: '*',
     },
     {
       table: {
         widths: width,
         body: [
           headRow,
           ...tableMaped
         ],

       },
       layout: {
         fillColor: (rowIndex: any) => (rowIndex % 2 === 0 ? '#f3f3f3' : '#ffffff'),
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
     extraHeader: {
       fontSize: 10,
       color: '#1f1f1f',
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
     },
   },
   defaultStyle: {
     font: 'Amiri',
     direction: 'rtl',
   },
 };

 // Create and download the PDF
 pdfMake.createPdf(docDefinition).print();
};