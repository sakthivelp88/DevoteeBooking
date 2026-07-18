import fs from "fs";
import path from "path";
import User from "#models/User.js";


/* ============================================================
                        Profile
============================================================ */

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    user.name = name;
    user.phone = phone;

    await user.save();

    req.session.user = {
      ...req.session.user,
      name: user.name,
      phone: user.phone,
    };

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
                    Change Password
============================================================ */

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
                    Profile Photo
============================================================ */

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (user.profileImage) {
      const oldImagePath = path.join(
        process.cwd(),
        user.profileImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    user.profileImage = `/uploads/admin/profile/${req.file.filename}`;

    await user.save();

    req.session.user = {
      ...req.session.user,
      profileImage: user.profileImage,
    };

    res.json({
      success: true,
      message: "Profile photo uploaded successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
                    Remove Profile Photo
============================================================ */

export const removeProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (user.profileImage) {
      const imagePath = path.join(
        process.cwd(),
        user.profileImage
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    user.profileImage = "";

    await user.save();

    req.session.user = {
      ...req.session.user,
      profileImage: "",
    };

    res.json({
      success: true,
      message: "Profile photo removed successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};