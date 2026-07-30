import User from "#models/User.js";

/* ============================================================
                    Get All Users
============================================================ */

export const getUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            role = "",
            status = "",
        } = req.query;

        const query = {};

        // Search by name, email or phone
        if (search.trim()) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by role
        if (role) {
            query.role = role;
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        const currentPage = Number(page);
        const perPage = Number(limit);

        const totalRecords = await User.countDocuments(query);

        const users = await User.find(query)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        const totalPages = Math.ceil(totalRecords / perPage);

        res.json({
            success:true,
            users,

            pagination: {
                page: currentPage,
                limit: perPage,
                totalRecords,
                totalPages,
                hasPrev: currentPage > 1,
                hasNext: currentPage < totalPages,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* ============================================================
                    Get User By ID
============================================================ */

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* ============================================================
                    Update User
============================================================ */

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, role, status } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and phone are required.",
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const existingPhone = await User.findOne({
            phone,
            _id: { $ne: id },
        });

        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number already exists.",
            });
        }

        user.name = name;
        user.phone = phone;
        user.role = role;
        user.status = status;

        await user.save();

        res.json({
            success: true,
            message: "User updated successfully.",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ============================================================
                    Update User Status
============================================================ */

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["active", "blocked"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user status.",
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Prevent blocking an admin account
        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin account cannot be blocked.",
            });
        }

        user.status = status;

        await user.save();

        res.json({
            success: true,
            message: `User ${status} successfully.`,
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ============================================================
                    Delete User
============================================================ */

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Prevent deleting admin accounts
        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin account cannot be deleted.",
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "User deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};