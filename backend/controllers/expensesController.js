import { saveExpense } from "../models/expensesModel.js";

export const createExpense = async (req, res) => {
  try {
    const {
      name,
      amount
    } = req.body;

    await saveExpense({
      name,
      amount
    });

    res.status(201).json({ message: 'Expense saved successfully' });
  } catch (err) {
    console.error('Error saving expense:', err);
    res.status(500).json({ error: 'Failed to save expense' });
  }
};

export default {
  createExpense,
};
