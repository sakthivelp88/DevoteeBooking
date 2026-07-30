import mongoose from "mongoose";

import Ticket from "#models/Ticket.js";
import { buildSearch } from "#utils/ticketSearch.js";
import { getPagination } from "#utils/pagination.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);

    res.status(201).json({
      success: true,
      message: "Ticket created successfully.",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const {
      search = "",
      sortBy = "date",
      sortOrder = "asc",
      page = 1,
      limit = 10,
      templeId,
      darshanTypeId,
    } = req.query;

    const { currentPage, pageSize, skip } = getPagination(page, limit);

    const pipeline = [
      {
        $lookup: {
          from: "temples",
          localField: "temple",
          foreignField: "_id",
          as: "temple",
        },
      },
      { $unwind: "$temple" },
      {
        $lookup: {
          from: "darshantypes",
          localField: "darshanType",
          foreignField: "_id",
          as: "darshanType",
        },
      },
      { $unwind: "$darshanType" },
    ];

    const match = {};

    if (templeId) {
      match.temple = new mongoose.Types.ObjectId(templeId);
    }

    if (darshanTypeId) {
      match.darshanType = new mongoose.Types.ObjectId(darshanTypeId);
    }

    if (Object.keys(match).length > 0) {
      pipeline.unshift({
        $match: match,
      });
    }

    const searchStage = buildSearch(search);

    if (searchStage) {
      pipeline.push(searchStage);
    }

    const sortField = {
      date: "date",
      createdAt: "createdAt",
      price: "price",
    }[sortBy] || "date";

    pipeline.push({
      $facet: {
        tickets: [
          {
            $sort: {
              [sortField]: sortOrder === "asc" ? 1 : -1,
            },
          },
          { $skip: skip },
          { $limit: pageSize },
        ],
        totalCount: [{ $count: "count" }],
      },
    });

    const [{ tickets, totalCount }] = await Ticket.aggregate(pipeline);

    const total = totalCount[0]?.count || 0;

    res.status(200).json({
      success: true,
      tickets,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasPrev: currentPage > 1,
        hasNext: currentPage < Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error(error);   // <-- Keep this
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    const bookedSeats = ticket.totalSeats - ticket.availableSeats;

    if (
      req.body.totalSeats &&
      req.body.totalSeats < bookedSeats
    ) {
      return res.status(400).json({
        success: false,
        message: "Total seats cannot be less than booked seats.",
      });
    }

    Object.assign(ticket, req.body);

    if (req.body.totalSeats) {
      ticket.availableSeats =
        req.body.totalSeats - bookedSeats;
    }

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket updated successfully.",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("temple", "name")
      .populate("darshanType", "name");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    ticket.status = status;

    await ticket.save();

    res.json({
      success: true,
      message: `Ticket ${status.toLowerCase()} successfully.`,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    ticket.status = "Closed";

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket closed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
