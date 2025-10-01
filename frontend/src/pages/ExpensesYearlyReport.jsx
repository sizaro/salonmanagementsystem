import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";

const ExpensesYearlyReport = () => {
  const { expenses, fetchYearlyData } = useData();

  const [year, setYear] = useState(new Date().getFullYear()); // default to current year
  const [reportLabel, setReportLabel] = useState("");

  // ---- Calculate total expenses ----
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (parseInt(e.amount, 10) || 0),
    0
  );

  // ---- Format UTC date strings to EAT ----
  const formatEAT = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-UG", {
      timeZone: "Africa/Kampala",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ---- Handle year change ----
  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    setYear(selectedYear);
    setReportLabel(`Year ${selectedYear}`);
    fetchYearlyData(selectedYear); // context function
  };

  // ---- Generate year options ----
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= currentYear - 10; y--) {
      years.push(y);
    }
    return years;
  };

  // ---- On page load: current year ----
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
    setReportLabel(`Year ${currentYear}`);
    fetchYearlyExpenses(currentYear);
  }, []);

  if (!expenses.length) return <p>No expenses recorded for this year yet.</p>;

  return (
    <div className="income-page max-w-6xl mx-auto p-4 overflow-y-hidden">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Yearly Expenses Report
      </h1>

      {/* Year Picker */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Pick a year:</label>
        <select
          value={year}
          onChange={handleYearChange}
          className="border rounded p-2"
        >
          {generateYearOptions().map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <p className="mt-2 text-gray-600">{reportLabel}</p>
      </div>

      {/* Summary Section */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
        <p>
          <span className="font-medium">Total Expenses:</span>{" "}
          {totalExpenses.toLocaleString()} UGX
        </p>
      </section>

      {/* Expenses Table */}
      <section className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Expenses List
        </h2>
        <div className="w-full overflow-x-auto max-h-[60vh] overflow-y-auto border border-gray-300 rounded">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">No.</th>
                <th className="px-3 py-2 text-left">Expense Name</th>
                <th className="px-3 py-2 text-left">Amount (UGX)</th>
                <th className="px-3 py-2 text-left">Time of Expense</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr
                  key={exp.id || index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{exp.name}</td>
                  <td className="px-3 py-2">{parseInt(exp.amount, 10)}</td>
                  <td className="px-3 py-2">{formatEAT(exp.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ExpensesYearlyReport;
