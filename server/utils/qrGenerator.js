import QRCode from "qrcode";

export const generateBookingQR = async (booking) => {
  const qrData = JSON.stringify({
    bookingId: booking._id,
    bookingNumber: booking.bookingNumber,
  });

  const qrCode = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 250,
  });

  return qrCode;
};