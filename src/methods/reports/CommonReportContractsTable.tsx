import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Registering custom fonts
Font.register({
  family: "Amiri",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://raw.githubusercontent.com/Youssif-Salama/amiri-font/main/Amiri-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Amiri",
    textAlign: "right",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000", // Outer border color for the table
    marginBottom: 15,
    fontSize: 8,
  },
  tableHeaderRow: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  tableHeaderCell: {
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
  },
  tableDataCell: {
    padding: 8,
    textAlign: "center",
    width: 150,
  },
  rowGroup: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000", // Outer border for the group
    marginBottom: -1, // Remove gap between grouped rows
  },
  row: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  blueHeader: {
    backgroundColor: "#0077bc",
    color: "white",
  },
  greenHeader: {
    backgroundColor: "#28a745",
    color: "white",
  },
  blueRow: {
    backgroundColor: "#e3f2fd",
    borderBottomWidth: 0, // Remove border between blue and green rows
  },
  greenRow: {
    backgroundColor: "#e8f5e9",
    borderTopWidth: 0, // Remove border between green and blue rows
  },
});

const CommonReportContractsTable = ({ allContracts }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableHeaderRow, styles.blueHeader]}>
            {/* First row of the header */}
            {["الرمز", "الاسم", "الهويه", "الجوال", "جوال اخر", "الصفه", "العقار المرتبط", "الحساب البنكي"].map(
              (header, index) => (
                <Text style={[styles.tableHeaderCell, styles.blueHeader]} key={index}>
                  {header}
                </Text>
              )
            )}
          </View>
          <View style={[styles.tableHeaderRow, styles.greenHeader]}>
            {/* Second row of the header */}
            {["المدينه", "الممثل", "جوال الممثل", "رقم الوكاله", "رقم العقد", "بدايه العقد", "نهايه العقد", "مسجل علي"].map(
              (header, index) => (
                <Text style={[styles.tableHeaderCell, styles.greenHeader]} key={index}>
                  {header}
                </Text>
              )
            )}
          </View>

          {/* Table Data */}
          {allContracts.map((contract: any, index: number) => (
            <View key={index} style={styles.rowGroup}>
              {/* First row of data (Blue) */}
              <View style={[styles.row, styles.blueRow]}>
                <Text style={styles.tableDataCell}>{index + 1 || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.Name || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.IdNumber || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.Mobile || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.AdditionalPhone || "-"}</Text>
                <Text style={styles.tableDataCell}>
                  {contract?.Type === "Tenant" ? "مؤجر" : "مستأجر"}
                </Text>
                <Text style={styles.tableDataCell}>{contract?.estate?.EstateName || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.BankAccount || "-"}</Text>
              </View>
              {/* Second row of data (Green) */}
              <View style={[styles.row, styles.greenRow]}>
                <Text style={styles.tableDataCell}>{contract?.AddressId?.City || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.Agent || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.MobileNumber || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.DocumentNumber || "-"}</Text>
                <Text style={styles.tableDataCell}>{contract?.ContractNumber || "-"}</Text>
                <Text style={styles.tableDataCell}>
                  {contract?.ContractReleaseDate ? contract?.ContractReleaseDate.slice(0, 10) : "-"}
                </Text>
                <Text style={styles.tableDataCell}>
                  {contract?.ContractEndDate ? contract?.ContractEndDate.slice(0, 10) : "-"}
                </Text>
                <Text style={styles.tableDataCell}>{contract?.RelyOn || "-"}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CommonReportContractsTable;
