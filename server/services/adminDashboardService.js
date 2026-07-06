const Booking = require("../models/booking.model");

const getBookingStatusDistribution = async () => {
    const result = await Booking.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
};

module.exports = {
    // existing services...
    getBookingStatusDistribution,
};