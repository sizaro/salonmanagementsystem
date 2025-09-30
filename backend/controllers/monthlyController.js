import monthlyModel from "../models/monthlyModel.js";

// Controller to handle requests for monthly reports
export const getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query; // e.g. year=2025, month=9
    console.log("Received in the controller year:", year, "month:", month);

    const today = new Date();

    // Construct the month start (1st day) and end (last day)
    const rangeStart = new Date(year, month - 1, 1); // JS months are 0-based
    let rangeEnd = new Date(year, month, 0); // last day of the month

    let scenario = "";

    // Scenario 3: Future month
    if (rangeStart > today) {
      scenario = "future";
      return res.json({
        scenario,
        services: [],
        expenses: [],
        advances: []
      });
    }

    // Scenario 1: Current month
    if (
      rangeStart <= today &&
      rangeEnd >= today // today is inside this month
    ) {
      scenario = "current";
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      rangeEnd = yesterday; // cut off at yesterday
    }

    // Scenario 2: Past month
    if (rangeEnd < today) {
      scenario = "past";
      // no changes, keep full month
    }

    // Fetch DB data
    const [services, expenses, advances] = await Promise.all([
      monthlyModel.getServicesByMonth(rangeStart, rangeEnd),
      monthlyModel.getExpensesByMonth(rangeStart, rangeEnd),
      monthlyModel.getAdvancesByMonth(rangeStart, rangeEnd)
    ]);

    console.log("monthly services in the controller", services.rows);
    console.log("monthly expenses in the controller", expenses.rows);
    console.log("monthly advances in the controller", advances.rows);

    res.json({
      scenario, // useful for debugging
      services: services.rows,
      expenses: expenses.rows,
      advances: advances.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
