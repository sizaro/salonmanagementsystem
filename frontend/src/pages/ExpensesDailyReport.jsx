import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";
import "../styles/IncomeDailyReport.css";
import {formatEAT} from "../utilities/TimeConverter.jsx"



const ExpensesDailyReport = () => {
  const today = new Date();
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   const reportDate = today.toLocaleDateString('en-US', options);

  const {expenses } = useData(); 

  console.log("these are the expenses in the Daily Expenses Page", expenses)

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseInt(exp.amount, 0), 0 || 0)

  if (expenses.length === 0) {
  return <p>No expenses today yet</p>;
}

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">{reportDate} Expenses Report</h1>

       <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
      <p><span className="font-medium">Total Expenses:</span> {totalExpenses} UGX</p>
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
                  <td className="p-2">{parseFloat(exp.amount,0)}</td>
                  <td className="p-2">{(exp.created_at)}</td>
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
