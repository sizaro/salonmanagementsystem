import { saveAdvance } from "../models/advancesModel.js";

export const createAdvance = async (req, res) => {
  try {
    const {
      employee_id,
      amount,
      description
    } = req.body;

    await saveAdvance({
      employee_id,
      amount,
      description
    });

    res.status(201).json({ message: 'Advance saved successfully' });
  } catch (err) {
    console.error('Error saving advance:', err);
    res.status(500).json({ error: 'Failed to save advance' });
  }
};

export default {
  createAdvance,
};
