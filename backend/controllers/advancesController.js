import { saveAdvance, fetchAllAdvances } from "../models/advancesModel.js";

export const createAdvance = async (req, res) => {
  try {
    const {
      employee_name,
      amount,
      description
    } = req.body;

    await saveAdvance({
      amount,
      description,
      employee_name
    });

    res.status(201).json({ message: 'Advance saved successfully' });
  } catch (err) {
    console.error('Error saving advance:', err);
    res.status(500).json({ error: 'Failed to save advance' });
  }
};

export const getAllAdvances = async (req, res) => {
  try {
    const advances = await fetchAllAdvances();
    console.log("this is in the controller for advances", advances)
    res.status(200).json(advances);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to fetch advances' });
  }
};

export default {
  createAdvance,
};
