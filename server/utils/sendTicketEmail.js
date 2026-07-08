import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTicketEmail = async ({
  booking,
  pdfBuffer,
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.contact.email,
    subject: `Temple Ticket - ${booking.bookingNumber}`,
    html: `
      <h2>Booking Confirmed</h2>

      <p>Dear Devotee,</p>

      <p>Your temple booking has been confirmed successfully.</p>

      <table cellpadding="6">
        <tr>
          <td><strong>Booking Number</strong></td>
          <td>${booking.bookingNumber}</td>
        </tr>

        <tr>
          <td><strong>Temple</strong></td>
          <td>${booking.temple.name}</td>
        </tr>

        <tr>
          <td><strong>Darshan Type</strong></td>
          <td>${booking.darshanType.name}</td>
        </tr>

        <tr>
          <td><strong>Date</strong></td>
          <td>${new Date(
            booking.ticket.date
          ).toLocaleDateString()}</td>
        </tr>
      </table>

      <p>Your ticket is attached as a PDF.</p>

      <p>Thank you for using our Temple Devotee Booking System.</p>
    `,
    attachments: [
      {
        filename: `${booking.bookingNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
};