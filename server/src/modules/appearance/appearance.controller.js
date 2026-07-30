// controllers/user/themeController.js

import User from "#models/User.js";

export const getTheme = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).select("theme");

    res.json({
      theme: user?.theme || "system",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;

    if (!["light", "dark", "system"].includes(theme)) {
      return res.status(400).json({
        message: "Invalid theme",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user.id,
      { theme },
      { returnDocument: "after" }
    );

    res.json({
      message: "Theme updated successfully",
    });
  } catch (err) {
    console.error("UPDATE THEME ERROR");
    console.error(err);
    console.error(err.stack);

    res.status(500).json({
      message: err.message,
    });
  }
};