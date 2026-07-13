import Booking from "../models/Booking.js";

export const getSummary = async (filters = {}) => {
    const query = {};

    if (filters.fromDate || filters.toDate) {
        query.createdAt = {};

        if (filters.fromDate) {
            query.createdAt.$gte = new Date(filters.fromDate);
        }

        if (filters.toDate) {
            const toDate = new Date(filters.toDate);
            toDate.setHours(23, 59, 59, 999);
            query.createdAt.$lte = toDate;
        }
    }

    if (filters.paymentStatus) {
        query.paymentStatus = filters.paymentStatus;
    }

    const bookings = await Booking.find(query);

    const totalBookings = bookings.length;

    const completedPayments = bookings.filter(
        booking => booking.paymentStatus === "Paid"
    ).length;

    const pendingPayments = bookings.filter(
        booking => booking.paymentStatus === "Pending"
    ).length;

    const failedPayments = bookings.filter(
        booking => booking.paymentStatus === "Failed"
    ).length;

    const totalRevenue = bookings
        .filter((booking) => booking.paymentStatus === "Paid")
        .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);

    return {
        totalRevenue,
        totalBookings,
        completedPayments,
        pendingPayments,
        failedPayments,
    };
};

export const getRevenueReport = async (filters = {}) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        paymentStatus,
        fromDate,
        toDate,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const query = {};

    // Date Filter
    if (fromDate || toDate) {
        query.createdAt = {};

        if (fromDate) {
            query.createdAt.$gte = new Date(fromDate);
        }

        if (toDate) {
            const endDate = new Date(toDate);
            endDate.setHours(23, 59, 59, 999);
            query.createdAt.$lte = endDate;
        }
    }

    // Payment Status
    if (paymentStatus) {
        query.paymentStatus = paymentStatus;
    }

    const bookings = await Booking.find(query)
        .populate("user", "name")
        .populate("temple", "name")
        .populate("darshanType", "name")
        .sort({
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        });

    // Search
    let filteredRevenue = bookings;

    if (search.trim()) {
        const keyword = search.trim().toLowerCase();

        filteredRevenue = bookings.filter((booking) => (
            booking.bookingNumber?.toLowerCase().includes(keyword) ||
            booking.user?.name?.toLowerCase().includes(keyword) ||
            booking.temple?.name?.toLowerCase().includes(keyword) ||
            booking.darshanType?.name?.toLowerCase().includes(keyword)
        ));
    }

    // Pagination
    const currentPage = Number(page);
    const pageSize = Number(limit);
    const totalRecords = filteredRevenue.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const paginatedRevenue = filteredRevenue.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return {
        revenue: paginatedRevenue.map((booking) => ({
            id: booking._id,
            bookingNumber: booking.bookingNumber,
            devotee: booking.user?.name || "-",
            temple: booking.temple?.name || "-",
            darshanType: booking.darshanType?.name || "-",
            amount: booking.totalAmount,
            paymentStatus: booking.paymentStatus,
            paymentDate: booking.updatedAt,
        })),

        pagination: {
            page: currentPage,
            limit: pageSize,
            totalRecords,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    };
};

export const getBookingReport = async (filters = {}) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        bookingStatus,
        paymentStatus,
        fromDate,
        toDate,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const query = {};

    // Date Filter
    if (fromDate || toDate) {
        query.createdAt = {};

        if (fromDate) {
            query.createdAt.$gte = new Date(fromDate);
        }

        if (toDate) {
            const endDate = new Date(toDate);
            endDate.setHours(23, 59, 59, 999);
            query.createdAt.$lte = endDate;
        }
    }

    // Booking Status
    if (bookingStatus) {
        query.bookingStatus = bookingStatus;
    }

    // Payment Status
    if (paymentStatus) {
        query.paymentStatus = paymentStatus;
    }

    // Fetch Data
    const bookings = await Booking.find(query)
        .populate("user", "name")
        .populate("temple", "name")
        .populate("darshanType", "name")
        .sort({
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        });

    // Search
    let filteredBookings = bookings;

    if (search) {
        const keyword = search.trim().toLowerCase();

        filteredBookings = bookings.filter((booking) => {
            return (
                booking.bookingNumber?.toLowerCase().includes(keyword) ||
                booking.user?.name?.toLowerCase().includes(keyword) ||
                booking.temple?.name?.toLowerCase().includes(keyword) ||
                booking.darshanType?.name?.toLowerCase().includes(keyword)
            );
        });
    }

    // Pagination
    const totalRecords = filteredBookings.length;

    const currentPage = Number(page);
    const pageSize = Number(limit);

    const start = (currentPage - 1) * pageSize;

    const paginatedBookings = filteredBookings.slice(
        start,
        start + pageSize
    );

    return {
        bookings: paginatedBookings.map((booking) => ({
            id: booking._id,
            bookingNumber: booking.bookingNumber,
            devotee: booking.user?.name || "-",
            temple: booking.temple?.name || "-",
            darshanType: booking.darshanType?.name || "-",
            bookingDate: booking.createdAt,
            bookingStatus: booking.bookingStatus,
            paymentStatus: booking.paymentStatus,
            amount: booking.totalAmount,
        })),

        pagination: {
            page: currentPage,
            limit: pageSize,
            totalRecords,
            totalPages: Math.ceil(totalRecords / pageSize),
        },
    };
};

export const getPaymentReport = async (filters = {}) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        paymentStatus,
        fromDate,
        toDate,
        sortBy = "updatedAt",
        sortOrder = "desc",
    } = filters;

    const query = {};

    // Date Filter
    if (fromDate || toDate) {
        query.createdAt = {};

        if (fromDate) {
            query.createdAt.$gte = new Date(fromDate);
        }

        if (toDate) {
            const endDate = new Date(toDate);
            endDate.setHours(23, 59, 59, 999);
            query.createdAt.$lte = endDate;
        }
    }

    // Payment Status Filter
    if (paymentStatus) {
        query.paymentStatus = paymentStatus;
    }

    const payments = await Booking.find(query)
        .populate("user", "name")
        .populate("temple", "name")
        .populate("darshanType", "name")
        .sort({
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        });

    // Search
    let filteredPayments = payments;

    if (search.trim()) {
        const keyword = search.toLowerCase();

        filteredPayments = payments.filter((payment) => (
            payment.bookingNumber?.toLowerCase().includes(keyword) ||
            payment.user?.name?.toLowerCase().includes(keyword) ||
            payment.temple?.name?.toLowerCase().includes(keyword) ||
            payment.darshanType?.name?.toLowerCase().includes(keyword)
        ));
    }

    // Pagination
    const totalRecords = filteredPayments.length;
    const currentPage = Number(page);
    const pageSize = Number(limit);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return {
        payments: paginatedPayments.map((payment) => ({
            id: payment._id,
            bookingNumber: payment.bookingNumber,
            devotee: payment.user?.name || "-",
            temple: payment.temple?.name || "-",
            darshanType: payment.darshanType?.name || "-",
            amount: payment.totalAmount,
            paymentMethod: payment.paymentMethod,
            paymentStatus: payment.paymentStatus,
            paymentDate: payment.updatedAt,
        })),

        pagination: {
            page: currentPage,
            limit: pageSize,
            totalRecords,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    };
};

export const getAnalyticsDashboard = async () => {
    const [
        revenueResult,
        totalBookings,
        successfulPayments,
        pendingPayments,
        monthlyRevenue,
        paymentStatus,
        topTemples,
    ] = await Promise.all([
        // Total Revenue
        Booking.aggregate([
            { $match: { paymentStatus: "Paid" } },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]),

        // Total Bookings
        Booking.countDocuments(),

        // Successful Payments
        Booking.countDocuments({
            paymentStatus: "Paid",
        }),

        // Pending Payments
        Booking.countDocuments({
            paymentStatus: "Pending",
        }),

        // Monthly Revenue
        Booking.aggregate([
            { $match: { paymentStatus: "Paid" } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    revenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]),

        // Payment Status
        Booking.aggregate([
            {
                $group: {
                    _id: "$paymentStatus",
                    value: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    value: 1,
                },
            },
        ]),

        // Top Temples
        Booking.aggregate([
            {
                $match: {
                    paymentStatus: "Paid",
                },
            },
            {
                $lookup: {
                    from: "temples",
                    localField: "temple",
                    foreignField: "_id",
                    as: "temple",
                },
            },
            {
                $unwind: "$temple",
            },
            {
                $group: {
                    _id: "$temple._id",
                    temple: {
                        $first: "$temple.name",
                    },
                    revenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
            {
                $sort: {
                    revenue: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    temple: 1,
                    revenue: 1,
                },
            },
        ]),
    ]);

    return {
        summary: {
            totalRevenue: revenueResult[0]?.totalRevenue || 0,
            totalBookings,
            successfulPayments,
            pendingPayments,
        },
        monthlyRevenue,
        paymentStatus,
        topTemples,
    };
};
