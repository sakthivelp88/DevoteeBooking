import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

let jsPDF = null;
let autoTable = null;

async function loadPdfLibs() {
  if (!jsPDF || !autoTable) {
    const pdfModule = await import("jspdf");
    const autoTableModule = await import("jspdf-autotable");
    jsPDF = pdfModule.default;
    autoTable = autoTableModule.default;
  }
}

const PDF_HEADER_COLOR = [249, 115, 22];

const getFileName = (name, extension) =>
    `${name}_${new Date().toISOString().split("T")[0]}.${extension}`;

/* -------------------------------------------------------------------------- */
/*                               Helper Functions                             */
/* -------------------------------------------------------------------------- */

const exportToExcel = (data, sheetName, fileName) => {
    if (!data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    saveAs(
        new Blob([excelBuffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        getFileName(fileName, "xlsx")
    );
};

const exportToPDF = (
    rows,
    title,
    headers,
    body,
    fileName
) => {
    if (!rows.length) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Temple Darshan Booking System", 14, 18);

    doc.setFontSize(12);
    doc.text(title, 14, 28);

    autoTable(doc, {
        startY: 36,
        head: [headers],
        body,
        headStyles: {
            fillColor: PDF_HEADER_COLOR,
        },
        styles: {
            fontSize: 9,
        },
    });

    doc.save(getFileName(fileName, "pdf"));
};

/* -------------------------------------------------------------------------- */
/*                               Revenue Report                               */
/* -------------------------------------------------------------------------- */

const formatRevenueData = (data = []) =>
    data.map((item) => ({
        "Booking No": item.bookingNumber ?? "-",
        Devotee: item.devotee ?? "-",
        Temple: item.temple ?? "-",
        Darshan: item.darshanType ?? "-",
        Amount: item.amount ?? 0,
        Status: item.paymentStatus ?? "-",
        Date: item.paymentDate
            ? new Date(item.paymentDate).toLocaleDateString("en-IN")
            : "-",
    }));

export const exportRevenueToExcel = (data = []) =>
    exportToExcel(
        formatRevenueData(data),
        "Revenue Report",
        "Revenue_Report"
    );

export const exportRevenueToPDF = (data = []) => {
    const rows = formatRevenueData(data);

    exportToPDF(
        rows,
        "Revenue Report",
        [
            "Booking No",
            "Devotee",
            "Temple",
            "Darshan",
            "Amount",
            "Status",
            "Date",
        ],
        rows.map((row) => [
            row["Booking No"],
            row.Devotee,
            row.Temple,
            row.Darshan,
            `₹${row.Amount}`,
            row.Status,
            row.Date,
        ]),
        "Revenue_Report"
    );
};

/* -------------------------------------------------------------------------- */
/*                               Booking Report                               */
/* -------------------------------------------------------------------------- */

const formatBookingData = (data = []) =>
    data.map((item) => ({
        "Booking No": item.bookingNumber ?? "-",
        Devotee: item.devotee ?? "-",
        Temple: item.temple ?? "-",
        Darshan: item.darshanType ?? "-",
        Amount: item.amount ?? 0,
        "Booking Status": item.bookingStatus ?? "-",
        "Payment Status": item.paymentStatus ?? "-",
        "Booking Date": item.bookingDate
            ? new Date(item.bookingDate).toLocaleDateString("en-IN")
            : "-",
    }));

export const exportBookingToExcel = (data = []) =>
    exportToExcel(
        formatBookingData(data),
        "Booking Report",
        "Booking_Report"
    );

export const exportBookingToPDF = (data = []) => {
    const rows = formatBookingData(data);

    exportToPDF(
        rows,
        "Booking Report",
        [
            "Booking No",
            "Devotee",
            "Temple",
            "Darshan",
            "Amount",
            "Booking Status",
            "Payment Status",
            "Booking Date",
        ],
        rows.map((row) => [
            row["Booking No"],
            row.Devotee,
            row.Temple,
            row.Darshan,
            `₹${row.Amount}`,
            row["Booking Status"],
            row["Payment Status"],
            row["Booking Date"],
        ]),
        "Booking_Report"
    );
};

/* -------------------------------------------------------------------------- */
/*                               Payment Report                               */
/* -------------------------------------------------------------------------- */

const formatPaymentData = (data = []) =>
    data.map((item) => ({
        "Booking No": item.bookingNumber ?? "-",
        Devotee: item.devotee ?? "-",
        Temple: item.temple ?? "-",
        Darshan: item.darshanType ?? "-",
        Amount: item.amount ?? 0,
        Method: item.paymentMethod ?? "-",
        Status: item.paymentStatus ?? "-",
        Date: item.paymentDate
            ? new Date(item.paymentDate).toLocaleDateString("en-IN")
            : "-",
    }));

export const exportPaymentToExcel = (data = []) =>
    exportToExcel(
        formatPaymentData(data),
        "Payment Report",
        "Payment_Report"
    );

export const exportPaymentToPDF = (data = []) => {
    const rows = formatPaymentData(data);

    exportToPDF(
        rows,
        "Payment Report",
        [
            "Booking No",
            "Devotee",
            "Temple",
            "Darshan",
            "Amount",
            "Method",
            "Status",
            "Date",
        ],
        rows.map((row) => [
            row["Booking No"],
            row.Devotee,
            row.Temple,
            row.Darshan,
            `₹${row.Amount}`,
            row.Method,
            row.Status,
            row.Date,
        ]),
        "Payment_Report"
    );
};