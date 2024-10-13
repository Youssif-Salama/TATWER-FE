import * as XLSX from 'xlsx';

export const generatePdfFromArray = async(systems: any,headers: string[], keys: string[],pageType:string,pdfName:string,extraContent?:any,
   // @ts-ignore
  meta?: any) => {

    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("../../vfs_fontes")).default;

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




export const generatePdfFromArrayForEstate =async (systems: any,headers: any, keys: any,pageType:string,pdfName:string,extraContent?:any,contracts?:any,
   // @ts-ignore
  meta?: any) => {

    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("../../vfs_fontes")).default;

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
  if(extraContent && !contracts){
    console.log("extra");

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
  else if(contracts){
    console.log("contracts");

    tableMaped= systems.map((system: any, index: number) =>{
      const situation = system?.Situation == "active" ? "مكتمل" : "مكتمل غير"
      return (
        [
          { text: (index + 1).toString(), style: 'tableCell' },
          ...keys.map((key: string) => ({
            text: getValueFromNestedKeys(system, key) || '-',
            style: 'tableCell',
          })),
          situation && { text: situation || "-", style: 'tableCell' },
          contracts && { text: extraContent[index]?.RelyOn || "-", style: 'tableCell' },
        ]
      )
    })
  }
  else{
    console.log("else");

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




export const generateArabicExcelFromArray = (systems: any[], headers: any, keys: any, excelName: string, extraContent?: any,
   // @ts-ignore
  contracts?:any) => {
  // Prepare the header row
  const headerRow = headers;

  // Prepare the extra content row with reversed keys
  const extraContentRow = extraContent
    ? Object.entries(extraContent).map(([key, value]) => `${value} : ${key.split(' ').reverse().join(' ')}`) // Reverse the key words
    : [];


  // Prepare the data rows
  const dataRows = systems.map((system: any, index: number) => [
    (index + 1).toString(), // Add index + 1 as the first cell
    ...keys.map((key: string) => getValueFromNestedKeys(system, key) || '-'), // Use nested keys to get the value
  ]);

  // Combine extra content, header row, and data rows
  const worksheetData = [extraContentRow, headerRow, ...dataRows];

  // Create a worksheet and workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); // aoa_to_sheet converts a 2D array to a worksheet

  // Set RTL (Right-to-Left) direction
  worksheet['!cols'] = headers.map(() => ({ wpx: 100 })); // Set column width (optional)
  worksheet['!dir'] = 'rtl'; // Set the worksheet direction to RTL

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate Excel file
  XLSX.writeFile(workbook, `${excelName}.xlsx`);
};




export const generateArabicExcelFromArrayForEstates = (
  systems: any[],
  headers: any,
  keys: any,
  excelName: string,
  extraContent?: any,
  contracts?: any
) => {
  // Prepare the header row
  const headerRow = headers;

  // Prepare the extra content row with reversed keys
  const extraContentRow = extraContent
    ? Object.entries(extraContent).map(([key, value]) => `${value} : ${key.split(' ').reverse().join(' ')}`) // Reverse the key words
    : [];

  // Prepare the data rows
  const dataRows = systems.map((system: any, index: number) => {
    const row = [
      (index + 1).toString(), // Add index + 1 as the first cell
      ...keys.map((key: string) => getValueFromNestedKeys(system, key) || '-'), // Use nested keys to get the value
    ];

    // Determine the الحالة value based on system?.Situation
    const situationValue = system?.Situation === "active" ? "مكتمل" : "غير مكتمل";
    row.push(situationValue); // Add الحالة value to the row

    // If contracts is true and extraContent has length > 0, add مسجل علي value
    if (contracts && extraContent && extraContent.length > 0) {
      const msagalAliValue = extraContent[index]?.RelyOn || '-'; // Default to '-' if value is undefined
      row.push(msagalAliValue); // Add the مسجل علي value to the row
    }

    return row;
  });

  // Combine extra content, header row, and data rows
  const worksheetData = [extraContentRow, headerRow, ...dataRows];

  // Create a worksheet and workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); // aoa_to_sheet converts a 2D array to a worksheet

  // Set RTL (Right-to-Left) direction
  worksheet['!cols'] = headers.map(() => ({ wpx: 100 })); // Set column width (optional)
  worksheet['!dir'] = 'rtl'; // Set the worksheet direction to RTL

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate Excel file
  XLSX.writeFile(workbook, `${excelName}.xlsx`);
};

// Utility function to get nested keys
const getValueFromNestedKeys = (obj: any, key: string) => {
  return key.split('.').reduce((o, k) => (o || {})[k], obj);
};
