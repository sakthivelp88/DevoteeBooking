
import Booking from "#models/Booking.js";

export const getBookingStatusDistribution = async () => {
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
