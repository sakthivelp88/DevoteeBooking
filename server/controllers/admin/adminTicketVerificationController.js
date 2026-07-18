import Booking from "#models/Booking.js";

export const verifyTicket = async (req, res) => {
    try {
        const { bookingId, bookingNumber } = req.body;

        const booking = await Booking.findOne({
            _id: bookingId,
            bookingNumber,
        })
            .populate("temple")
            .populate("darshanType")
            .populate("ticket")
            .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        if (booking.paymentStatus !== "Paid") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed.",
            });
        }

        if (booking.bookingStatus !== "Confirmed") {
            return res.status(400).json({
                success: false,
                message: "Booking is not confirmed.",
            });
        }

        if (booking.isVisited) {
            return res.status(400).json({
                success: false,
                message: "Ticket has already been used.",
                booking,
            });
        }

        return res.json({
            success: true,
            booking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const checkInBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("temple")
            .populate("darshanType")
            .populate("ticket")
            .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        if (booking.isVisited) {
            return res.status(400).json({
                success: false,
                message: "Ticket already been used.",
                booking,
            });
        }

        booking.isVisited = true;
        booking.visitedAt = new Date();

        await booking.save();

        res.json({
            success: true,
            message: "Check-in successful.",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};