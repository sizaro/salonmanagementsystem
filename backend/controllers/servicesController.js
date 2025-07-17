import { saveService } from "../models/servicesModel.js";

export const createService = async (req, res) => {
  try {
    const {
      name,
      service_amount,
      barber,
      barber_amount,
      assistant,
      assistant_amount,
      salon_amount,
    } = req.body;

    await saveService({
      name,
      service_amount,
      barber,
      barber_amount,
      assistant,
      assistant_amount,
      salon_amount,
    });

    res.status(201).json({ message: 'Service saved successfully' });
  } catch (err) {
    console.error('Error saving service:', err);
    res.status(500).json({ error: 'Failed to save service' });
  }
};

export default {
  createService,
};
