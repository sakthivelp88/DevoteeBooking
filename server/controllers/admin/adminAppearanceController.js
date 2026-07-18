import User from "#models/User.js";

export const getTheme = async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id).select("theme");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            theme: user.theme,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateTheme = async (req, res) => {
    try {
        const { theme } = req.body;

        if (!["light", "dark", "system"].includes(theme)) {
            return res.status(400).json({
                success: false,
                message: "Invalid theme",
            });
        }

        await User.findByIdAndUpdate(
            req.session.user.id,
            { theme },
            { new: true }
        );

        res.json({
            success: true,
            theme,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};