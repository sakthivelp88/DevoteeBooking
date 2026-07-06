import Booking from "../models/Booking.js";

export const getPayments = async () => {
    const bookings = await Booking.find()
        .populate("user", "fullName email")
        .populate("temple", "name")
        .populate("darshanType", "name")
        .populate("ticket", "date slotStart slotEnd")
        .sort({ createdAt: -1 });

    return bookings.map((booking) => ({
        _id: booking._id,

        bookingNumber: booking.bookingNumber,

        devoteeName: booking.user?.fullName,

        templeName: booking.temple?.name,

        darshanType: booking.darshanType?.name,

        ticketId: booking.ticket?._id,

        ticketDate: booking.ticket?.date,

        ticketSlot:
            booking.ticket
                ? `${booking.ticket.slotStart} - ${booking.ticket.slotEnd}`
                : "-",

        amount: booking.totalAmount,

        paymentMethod: "Razorpay",

        paymentId: booking.razorpayPaymentId,

        orderId: booking.razorpayOrderId,

        reference: booking.paymentReference,

        status: booking.paymentStatus,

        paymentDate: booking.updatedAt,

        remarks: booking.remarks,
    }));
};

export const getPaymentById = async (id) => {
    const booking = await Booking.findById(id)
        .populate("user", "fullName email phone")
        .populate("temple", "name")
        .populate("darshanType", "name")
        .populate("ticket", "date slotStart slotEnd");

    if (!booking) {
        throw new Error("Payment not found.");
    }

    return {
        _id: booking._id,

        bookingNumber: booking.bookingNumber,

        devoteeName: booking.user?.fullName,

        devoteeEmail: booking.user?.email,

        devoteePhone: booking.user?.phone,

        templeName: booking.temple?.name,

        darshanType: booking.darshanType?.name,

        ticketId: booking.ticket?._id,

        ticketDate: booking.ticket?.date,

        ticketSlot:
            booking.ticket
                ? `${booking.ticket.slotStart} - ${booking.ticket.slotEnd}`
                : "-",

        quantity: booking.quantity,

        ticketPrice: booking.ticketPrice,

        amount: booking.totalAmount,

        paymentMethod: "Razorpay",

        paymentId: booking.razorpayPaymentId,

        orderId: booking.razorpayOrderId,

        reference: booking.paymentReference,

        status: booking.paymentStatus,

        paymentDate: booking.updatedAt,

        remarks: booking.remarks,
    };
};