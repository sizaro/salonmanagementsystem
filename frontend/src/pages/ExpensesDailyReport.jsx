import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";

const ExpensesDailyReport = () => {
  const { expenses, fetchDailyData } = useData();

  // Default date is today (YYYY-MM-DD)
  const today = new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(today);

  // Fetch data on page load
  useEffect(() => {
    fetchDailyData(selectedDate);
  }, []); // run once on mount

  // Handle date change
  const handleDayChange = (e) => {
    const newDate = e.target.value; // format: YYYY-MM-DD
    setSelectedDate(newDate);
    fetchDailyData(newDate);
  };

  const reportDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log("these are the expenses in the Daily Expenses Page", expenses);

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + (parseInt(exp.amount, 10) || 0),
    0
  );

  if (expenses.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">No expenses recorded yet</h2>

        {/* Date Picker */}
        <div className="mt-4">
          <label className="font-medium mr-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDayChange}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {reportDate} Expenses Report
      </h1>

      {/* Date Picker */}
      <div className="mb-4 text-center">
        <label className="font-medium mr-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDayChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
        <p>
          <span className="font-medium">Total Expenses:</span>{" "}
          {totalExpenses.toLocaleString()} UGX
        </p>
      </section>

      {/* Expenses Table */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Expenses List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-2 text-left">No.</th>
                <th className="p-2 text-left">Expense Name</th>
                <th className="p-2 text-left">Amount (UGX)</th>
                <th className="p-2 text-left">Time of Expense</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{exp.name}</td>
                  <td className="p-2">{parseInt(exp.amount, 10).toLocaleString()}</td>
                  <td className="p-2">{exp.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ExpensesDailyReport;
