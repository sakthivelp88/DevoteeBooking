import DarshanType from "#models/DarshanType.js";

// Get all darshan types
export const getDarshanTypes = async (req, res) => {
  try {
    const darshanTypes = await DarshanType.find()
      .populate("temple", "name");

    res.json(darshanTypes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDarshanTypesByTemple = async (req, res) => {
  try {
    const darshanTypes = await DarshanType.find({
      temple: req.params.templeId,
    });

    res.json(darshanTypes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDarshanTypeById = async (req, res) => {
  try {
    const darshanType = await DarshanType.findById(
      req.params.id
    );

    if (!darshanType) {
      return res.status(404).json({
        message: "Darshan type not found",
      });
    }

    res.json(darshanType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create
export const createDarshanType = async (req, res) => {
  try {
     console.log(req.body);
    const darshanType = await DarshanType.create(req.body);

    res.status(201).json(darshanType);
  } catch (error) {
  console.error("Create DarshanType Error:", error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Update
export const updateDarshanType = async (req, res) => {
  try {
    const darshanType = await DarshanType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(darshanType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
export const deleteDarshanType = async (req, res) => {
  try {
    await DarshanType.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};