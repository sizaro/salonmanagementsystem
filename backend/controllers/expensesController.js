import { saveExpense, fetchAllExpenses } from "../models/expensesModel.js";

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

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await fetchAllExpenses();
    console.log("this is in the controller for expenses", expenses)
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

export default {
  createExpense,
};
