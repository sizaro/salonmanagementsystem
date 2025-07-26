import React from 'react';

// Helper function to calculate daily salary (e.g., 40% commission)
const calculateSalary = (serviceBreakdown) => {
  const total = serviceBreakdown.reduce((sum, item) => sum + item.amount, 0);
  return total * 0.4;
};

const WorkDailyReport = () => {
  const reportDate = 'Wednesday, July 10, 2025';

  const workers = [
    {
      name: 'Sarah',
      services: [
        { category: 'Bridal Makeup', qty: 2, amount: 40000 },
        { category: 'Hair Styling', qty: 2, amount: 40000 },
      ],
    },
    {
      name: 'Anita',
      services: [
        { category: 'Manicure', qty: 2, amount: 40000 },
        { category: 'Pedicure', qty: 1, amount: 20000 },
      ],
    },
    {
      name: 'Kevin',
      services: [
        { category: 'Hair Styling', qty: 3, amount: 60000 },
        { category: 'Pedicure', qty: 1, amount: 20000 },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Worker Daily Performance</h1>
      <h2 className="text-lg font-medium text-center mb-4 text-gray-600">{reportDate}</h2>

      {workers.map((worker, index) => {
        const totalSalary = calculateSalary(worker.services);
        const totalContribution = worker.services.reduce((sum, s) => sum + s.amount, 0);

        return (
          <section
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-6 border-l-4 border-blue-600"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{worker.name}</h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Service Category</th>
                    <th className="p-2 text-left">Qty</th>
                    <th className="p-2 text-left">Amount (UGX)</th>
                  </tr>
                </thead>
                <tbody>
                  {worker.services.map((service, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{service.category}</td>
                      <td className="p-2">{service.qty}</td>
                      <td className="p-2">{service.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between text-sm font-medium">
              <p>Total Contribution: <span className="text-blue-700">UGX {totalContribution.toLocaleString()}</span></p>
              <p className="text-green-700">Daily Salary (40%): UGX {totalSalary.toLocaleString()}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default WorkDailyReport;

