import Temple from "#models/Temple.js";

// Create Temple
export const createTemple = async (req, res) => {
  try {
    const templeData = {
      ...req.body,
    };

    if (req.file) {
      templeData.image = `/uploads/temples/${req.file.filename}`;
    }

    const temple = await Temple.create(templeData);

    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Temples
export const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Temple By ID
export const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Temple
export const updateTemple = async (req, res) => {
  try {
    const templeData = {
      ...req.body,
    };

    if (req.file) {
      templeData.image = `/uploads/temples/${req.file.filename}`;
    }

    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      templeData,
      {
        new: true,
      }
    );

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Temple
export const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.json({
      success: true,
      message: "Temple deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};