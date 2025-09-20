import { saveClocking, updateClockingModel, fetchAllClockings} from '../models/clockingsModel.js';

export const createClocking = async (req, res) => {
  try {
    const { employeeName } = req.body;

    console.log("data coming from the frontend", employeeName)

    // Call the model to save in DB
    await saveClocking(employeeName);

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
    const { employeeName } = req.body

    console.log("data arriving for update", employeeName)
    await updateClockingModel(employeeName);

    res.status(200).json({
      message: "Clocking updated successfully",
    });
  } catch (error) {
    console.error("Error updating clocking:", error);
    res.status(500).json({ message: "Failed to update clocking" });
  }
};

export const getAllClocking = async (req, res) => {
  try {
    const clockings = await fetchAllClockings();
    console.log("this is in the controller for clockings", clockings)
    res.status(200).json(clockings);
  } catch (err) {
    console.error('Error fetching clockings:', err);
    res.status(500).json({ error: 'Failed to fetch clockings' });
  }
};
