import bcrypt from "bcryptjs";

import User from "#models/User.js";

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const register = async (req, res) => {
  try {
    const { name, email, phone, gender, dob, address, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      gender,
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

    const normalizedInput = String(emailOrPhone || "").trim();
    const loginPassword = String(password ?? "");
    const normalizedPhone = normalizedInput.replace(/\D/g, "");

    if (!normalizedInput || loginPassword.length === 0) {
      return res.status(400).json({
        message: "Email/phone and password are required",
      });
    }

    let user = await User.findOne({
      email: {
        $regex: new RegExp(`^${escapeRegex(normalizedInput)}$`, "i"),
      },
    });

    // Prefer deterministic exact phone variants first.
    const exactPhoneCandidates = Array.from(
      new Set(
        [
          normalizedInput,
          normalizedPhone,
          normalizedPhone ? `+91${normalizedPhone}` : "",
          normalizedPhone ? `91${normalizedPhone}` : "",
        ].filter(Boolean)
      )
    );

    if (!user && exactPhoneCandidates.length > 0) {
      user = await User.findOne({
        phone: { $in: exactPhoneCandidates },
      });
    }

    if (!user && normalizedPhone) {
      const phoneRegex = new RegExp(`${escapeRegex(normalizedPhone)}$`);
      const phoneMatches = await User.find({
        phone: { $regex: phoneRegex },
      });

      user =
        phoneMatches.find((candidate) => {
          const candidatePhone = String(candidate.phone || "").replace(/\D/g, "");
          return candidatePhone === normalizedPhone;
        }) ||
        phoneMatches.find((candidate) => {
          const candidatePhone = String(candidate.phone || "").replace(/\D/g, "");
          return candidatePhone.endsWith(normalizedPhone);
        }) ||
        null;
    }

    if (!user) {
      return res.status(400).json({
        message: "Account not found. Check your email or phone, or register first.",
      });
    }

    let isMatch = false;
    const isBcryptHash =
      typeof user.password === "string" &&
      /^\$2[aby]\$\d{2}\$/.test(user.password);

    if (isBcryptHash) {
      isMatch = await bcrypt.compare(loginPassword, user.password);
    } else {
      // Backward compatibility: support legacy plaintext passwords and migrate.
      isMatch = user.password === loginPassword;
      if (isMatch) {
        user.password = await bcrypt.hash(loginPassword, 10);
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password. Please try again.",
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
    console.error("Auth login error:", error);
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
