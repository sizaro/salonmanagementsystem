import WeeklyModel from "../models/weeklyModel.js";

// Controller to handle requests for weekly reports

export const getWeeklyReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log("Received in the controller startDate:", startDate, "endDate:", endDate);
    const today = new Date();
    const rangeStart = new Date(startDate);
    let rangeEnd = new Date(endDate);

    let scenario = "";

    // Scenario 3: Future week
    if (rangeStart > today) {
      scenario = "future";
      return res.json({
        scenario,
        services: [],
        expenses: [],
        advances: []
      });
    }

    //Scenario 1: Current week (today is inside the selected range)
    if (rangeStart <= today && rangeEnd >= today) {
      scenario = "current";
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(23, 59, 59, 999); // include full yesterday
      rangeEnd = yesterday;
    }

    // Scenario 2: Past week (completely before today)
    if (rangeEnd < today) {
      scenario = "past";
      // no changes to start/end, just use full week
    }

    // Fetch DB data
    const [services, expenses, advances] = await Promise.all([
      WeeklyModel.getServicesByDateRange(rangeStart, rangeEnd),
      WeeklyModel.getExpensesByDateRange(rangeStart, rangeEnd),
      WeeklyModel.getAdvancesByDateRange(rangeStart, rangeEnd)
    ]);

    console.log("weekly services in the controller", services.rows)
    console.log("weekly expenses in the controller", expenses.rows)
    console.log("weekly advances in the controller", advances.rows)

    res.json({
      scenario, // just so you can see in logs which case fired
      services: services.rows,
      expenses: expenses.rows,
      advances: advances.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
