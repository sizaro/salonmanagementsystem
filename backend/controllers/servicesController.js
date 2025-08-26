import { saveService } from "../models/servicesModel.js";

export const createService = async (req, res) => {
  try {
    const {
      name,
      service_amount,
      salon_amount,
      barber,
      barber_amount,
      barber_assistant,
      barber_assistant_amount,
      scrubber_assistant,
      scrubber_assistant_amount,
      black_shampoo_assistant,
      black_shampoo_assistant_amount,
      black_shampoo_amount,
      super_black_assistant,
      super_black_assistant_amount,
      super_black_amount,
      black_mask_assistant,
      black_mask_assistant_amount,
      black_mask_amount
    } = req.body;

    console.log("these are the details received from frontend", name,
      service_amount,
      salon_amount,
      barber,
      barber_amount,
      barber_assistant,
      barber_assistant_amount,
      scrubber_assistant,
      scrubber_assistant_amount,
      black_shampoo_assistant,
      black_shampoo_assistant_amount,
      black_shampoo_amount,
      super_black_assistant,
      super_black_assistant_amount,
      super_black_amount,
      black_mask_assistant,
      black_mask_assistant_amount,
      black_mask_amount)

    await saveService({
      name,
      service_amount,
      salon_amount,
      barber,
      barber_amount,
      barber_assistant,
      barber_assistant_amount,
      scrubber_assistant,
      scrubber_assistant_amount,
      black_shampoo_assistant,
      black_shampoo_assistant_amount,
      black_shampoo_amount,
      super_black_assistant,
      super_black_assistant_amount,
      super_black_amount,
      black_mask_assistant,
      black_mask_assistant_amount,
      black_mask_amount
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
