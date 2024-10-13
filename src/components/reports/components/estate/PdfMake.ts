import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Amiri: {
    normal: 'https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Regular.ttf',
    bold: "https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Bold.ttf"
  }
};

export const generatePdfFromArray = (systems: any,headers: string[], keys: string[],pageType:string,pdfName:string,extraContent?:any) => {
  let headRow: any = [];
  let width:any=[];


  headers?.forEach((header: string) => {
    const reversedHeader = header.split(' ').reverse().join(' ');
    headRow.push({ text: reversedHeader, bold: true, style: "header" });
    width.push("*");
  });


  const getValueFromNestedKeys = (obj: any, key: string) => {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
  };

  const generateExtraContent = (extraContent: any) => {
    const rows: any[] = [];
    const contentKeys = Object.keys(extraContent);

    for (let i = 0; i < contentKeys.length; i += 2) {
      const row: any[] = [];
      for (let j = i; j < i + 2 && j < contentKeys.length; j++) {
        const key = contentKeys[j];
        const value = extraContent[key];

        // Combine key and value in a single text field, ensuring proper RTL formatting
        row.push({
          text: `${value} : ${key}`,  // Place value before key
          style: 'extraHeader',
          fillColor: '#f3f3f3',
          alignment: 'right',  // Align text to the right
          margin: [0, 5],
          direction: 'rtl',  // Ensure direction is set to RTL
        });
      }

      rows.push({
        columns: row,
        columnGap: 10,  // Adds space between the columns
      });
    }

    return rows;
  };

  let tableMaped;
  if(extraContent){
    tableMaped= systems.map((system: any, index: number) =>{
      const lastAlert = system?.Alerts && system.Alerts.length > 0 ? system.Alerts[system.Alerts.length - 1] : "-";
      const totalPrice =Number(Number(system?.RentValue) + Number(system?.FixedPrice)).toFixed(4)
      return (
        [
          { text: (index + 1).toString(), style: 'tableCell' },
          ...keys.map((key: string) => ({
            text: getValueFromNestedKeys(system, key) || '-',
            style: 'tableCell',
          })),
          totalPrice && { text: totalPrice || "-", style: 'tableCell' },
          lastAlert && { text: lastAlert || "-", style: 'tableCell' },
        ]
      )
    })
  }
  else{
    tableMaped = systems.map((system: any, index: number) =>[
        { text: (index + 1).toString(), style: 'tableCell' },
        ...keys.map((key: string) => ({
          text: getValueFromNestedKeys(system, key) || '-',
          style: 'tableCell',
        })),
      ]
  )
  }


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
      extraContent && {
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
        stack: generateExtraContent(extraContent),
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
  pdfMake.createPdf(docDefinition).download(`${pdfName}.pdf`);
};