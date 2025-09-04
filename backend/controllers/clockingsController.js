import { saveClocking, updateClockingModel} from '../models/clockingsModel.js';

export const createClocking = async (req, res) => {
  try {
    const { employeeName, clockIn, clockOut } = req.body;

    console.log("data coming from the frontend", employeeName, clockIn,clockOut)

    // Call the model to save in DB
    await saveClocking(employeeName, clockIn, clockOut);

    res.status(201).json({
      message: "Clocking created successfully",
    });
  } catch (error) {
    console.error("Error creating clocking:", error);
    res.status(500).json({ message: "Failed to create clocking" });
  }
};

export const updateClocking = async (req, res) => {
  try {
    const { employeeName, clockOut } = req.body

    console.log("data arriving for update", employeeName, clockOut)
    await updateClockingModel(employeeId, clockOut);

    res.status(200).json({
      message: "Clocking updated successfully",
    });
  } catch (error) {
    console.error("Error updating clocking:", error);
    res.status(500).json({ message: "Failed to update clocking" });
  }
};
