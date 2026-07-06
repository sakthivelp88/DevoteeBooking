import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const prepareExportData = (payments = []) =>
    payments.map((payment) => ({
        "Booking No": payment.bookingNumber ?? "-",
        Devotee: payment.devoteeName ?? "-",
        Temple: payment.templeName ?? "-",
        Amount: payment.amount ?? 0,
        Status: payment.status ?? "-",
        "Payment ID": payment.paymentId ?? "-",
        "Order ID": payment.orderId ?? "-",
        Date: payment.paymentDate
            ? new Date(payment.paymentDate).toLocaleDateString("en-IN")
            : "-",
    }));

export const exportPaymentsToExcel = (payments = []) => {
    if (!payments.length) return;

    const worksheet = XLSX.utils.json_to_sheet(
        prepareExportData(payments)
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Payments"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    saveAs(
        new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Payments_${new Date().toISOString().split("T")[0]}.xlsx`
    );
};

export const exportPaymentsToPDF = (payments = []) => {
    if (!payments.length) return;

    const data = prepareExportData(payments);

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Temple Darshan Booking System", 14, 18);

    doc.setFontSize(12);
    doc.text("Payment Report", 14, 26);

    autoTable(doc, {
        startY: 34,
        head: [[
            "Booking No",
            "Devotee",
            "Temple",
            "Amount",
            "Status",
            "Payment ID",
            "Date",
        ]],
        body: data.map((row) => [
            row["Booking No"],
            row.Devotee,
            row.Temple,
            `₹${row.Amount}`,
            row.Status,
            row["Payment ID"],
            row.Date,
        ]),
        styles: {
            fontSize: 9,
        },
        headStyles: {
            fillColor: [249, 115, 22], // Orange theme
        },
    });

    doc.save(
        `Payments_${new Date().toISOString().split("T")[0]}.pdf`
    );
};