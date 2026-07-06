import multer from "multer";
import fs from "fs";
import path from "path";

// Create uploads/profile directory if it doesn't exist
const uploadPath = "uploads/profile";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `profile-${req.session.user.id}-${Date.now()}${ext}`
    );
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WebP images are allowed."));
  }
};

// Multer configuration
const uploadProfile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

export default uploadProfile;