import React from 'react';

const ExpensesDailyReport = () => {
  const report = {
    date: 'Wednesday, July 10, 2025',
    totalExpenses: 85000,
    expenses: [
      { name: 'Hair Products', amount: 25000 },
      { name: 'Electricity Units', amount: 30000 },
      { name: 'Water', amount: 15000 },
      { name: 'Snacks for Staff', amount: 15000 },
    ],
    notes: [
      'Power was off from 3 PM to 4 PM.',
      'Restocked shampoo and conditioner.',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Expenses Report</h1>

      {/* Summary Section */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{report.date}</h2>
        <p><span className="font-medium">Total Expenses:</span> UGX {report.totalExpenses}</p>
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
              </tr>
            </thead>
            <tbody>
              {report.expenses.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Notes & Incidents</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {report.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ExpensesDailyReport;
