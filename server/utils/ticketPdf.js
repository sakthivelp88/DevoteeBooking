import PDFDocument from "pdfkit";

export const generateTicketPDF = (booking) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            margin: 50,
            size: "A4",
        });

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));

        doc.on("end", () => {
            resolve(Buffer.concat(buffers));
        });

        doc.fontSize(22).text("Temple Darshan Ticket", {
            align: "center",
        });

        doc.moveDown();

        doc.fontSize(14);

        doc.text(`Booking Number : ${booking.bookingNumber}`);
        doc.text(`Temple         : ${booking.temple.name}`);
        doc.text(`Darshan Type   : ${booking.darshanType.name}`);

        doc.text(
            `Date: ${new Date(
                booking.ticket.date
            ).toLocaleDateString()}`
        );

        doc.text(
            `Slot: ${booking.ticket.slotStart} - ${booking.ticket.slotEnd}`
        );

        doc.text(`Quantity: ${booking.quantity}`);

        doc.text(`Amount: ₹${booking.totalAmount}`);

        doc.text(`Payment Status : ${booking.paymentStatus}`);
        
        doc.text(`Booking Status : ${booking.bookingStatus}`);

        doc.moveDown();

        doc.fontSize(16).text("Entry QR Code");

        if (booking.qrCode) {
            const base64 = booking.qrCode.replace(
                /^data:image\/png;base64,/,
                ""
            );

            const qrBuffer = Buffer.from(base64, "base64");

            doc.image(qrBuffer, {
                fit: [180, 180],
                align: "center",
            });
        }

        doc.moveDown();

        doc.fontSize(16).text("Contact");

        doc.fontSize(13);

        doc.text(`Mobile : ${booking.contact.mobile}`);
        doc.text(`Email  : ${booking.contact.email}`);
        doc.text(`Address: ${booking.contact.address}`);

        doc.moveDown();

        doc.fontSize(16).text("Devotees");

        booking.devotees.forEach((devotee, index) => {
            doc.text(
                `${index + 1}. ${devotee.name} | ${devotee.age} | ${devotee.gender}`
            );
        });

        doc.moveDown();

        doc.fontSize(16).text("Important Instructions");

        doc.moveDown(0.5);

        doc.fontSize(12);

        doc.text("• Carry a valid government-issued ID proof.");

        doc.text("• Reach the temple at least 30 minutes before your slot.");

        doc.text("• Show this QR code during entry.");

        doc.text("• Keep this ticket until your darshan is completed.");

        doc.text("• This ticket is non-transferable.");

        doc.moveDown();

        doc.fontSize(10);

        doc.text(
            `Generated on ${new Date().toLocaleString()}`,
            {
                align: "right",
            }
        );

        doc.end();
    });
};