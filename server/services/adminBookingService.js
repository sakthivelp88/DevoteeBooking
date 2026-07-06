import mongoose from "mongoose";
import Booking from "../models/Booking.js";

/* =======================
   Admin - Booking List
======================= */
export const getBookings = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    bookingStatus,
    paymentStatus,
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const pipeline = [
    // User
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },

    // Temple
    {
      $lookup: {
        from: "temples",
        localField: "temple",
        foreignField: "_id",
        as: "temple",
      },
    },

    // Darshan Type
    {
      $lookup: {
        from: "darshantypes",
        localField: "darshanType",
        foreignField: "_id",
        as: "darshanType",
      },
    },

    // Ticket
    {
      $lookup: {
        from: "tickets",
        localField: "ticket",
        foreignField: "_id",
        as: "ticket",
      },
    },

    // Reservation
    {
      $lookup: {
        from: "reservations",
        localField: "reservation",
        foreignField: "_id",
        as: "reservation",
      },
    },

    // Unwind
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$temple",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$darshanType",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$ticket",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$reservation",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const match = {};

  if (search) {
    match.$or = [
      { bookingNumber: { $regex: search, $options: "i" } },
      { "user.name": { $regex: search, $options: "i" } },
      { "user.email": { $regex: search, $options: "i" } },
      { "temple.name": { $regex: search, $options: "i" } },
      { "darshanType.name": { $regex: search, $options: "i" } },
    ];
  }

  if (bookingStatus) {
    match.bookingStatus = bookingStatus;
  }

  if (paymentStatus) {
    match.paymentStatus = paymentStatus;
  }

  if (Object.keys(match).length) {
    pipeline.push({ $match: match });
  }

  pipeline.push(
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        bookings: [
          {
            $skip: (pageNumber - 1) * limitNumber,
          },
          {
            $limit: limitNumber,
          },
        ],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    }
  );

  const [result] = await Booking.aggregate(pipeline);

  const bookings = result.bookings;
  const total = result.totalCount[0]?.count || 0;

  return {
    bookings,
    total,
    page: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
  };
};

/* =======================
   Admin - Booking Details
======================= */
export const getBookingById = async (id) => {
  return Booking.findById(id)
    .populate("user")
    .populate("temple")
    .populate("darshanType")
    .populate("ticket")
    .populate("reservation");
};

/* =======================
   Admin - Update Status
======================= */
export const updateBookingStatus = async (id, payload) => {
  const { bookingStatus, remarks } = payload;

  return Booking.findByIdAndUpdate(
    id,
    {
      bookingStatus,
      remarks,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};