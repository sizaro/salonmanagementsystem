import { fetchAllEmployees } from "../models/employeesModel.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await fetchAllEmployees();
    console.log("this is in the controller for employees", employees)
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};