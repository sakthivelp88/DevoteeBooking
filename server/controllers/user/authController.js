import bcrypt from "bcryptjs";

import User from "#models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, gender, dob, address, password } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already registered",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone, gender,
      dob,
      address,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or phone already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {

    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
    };

    res.json({
      success: true,
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    res.clearCookie("connect.sid");

    res.json({
      success: true,
      message: "Logged out",
    });
  });
};