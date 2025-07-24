import React from 'react';

const IncomeDailyReport = () => {
  const report = {
    date: 'Wednesday, July 10, 2025',
    openTime: '9:00 AM',
    closeTime: '7:30 PM',
    workersOnDuty: ['Sarah', 'Anita', 'Kevin'],
    income: {
      total: 240000,
      cash: 160000,
      mobileMoney: 80000,
      discounts: 10000,
    },
    customers: {
      total: 12,
      new: 4,
      returning: 8,
    },
    popularService: 'Bridal Hair Styling',
    services: [
      { name: 'Hair Styling', qty: 5, total: 100000 },
      { name: 'Manicure', qty: 3, total: 60000 },
      { name: 'Pedicure', qty: 2, total: 40000 },
      { name: 'Bridal Makeup', qty: 2, total: 40000 },
    ],
    notes: [
      'Customer praised Sarah’s bridal makeup.',
      'Hairdryer malfunctioned briefly at 2 PM.',
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Daily Report</h1>

      {/* Summary */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{report.date}</h2>
        <p><span className="font-medium">Opened:</span> {report.openTime}</p>
        <p><span className="font-medium">Closed:</span> {report.closeTime}</p>
        <p><span className="font-medium">Workers on Duty:</span> {report.workersOnDuty.join(', ')}</p>
      </section>

      {/* Income Summary */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Income Summary</h2>
        <p><span className="font-medium">Total:</span> UGX {report.income.total}</p>
        <p>Cash: UGX {report.income.cash}</p>
        <p>Mobile Money: UGX {report.income.mobileMoney}</p>
        <p>Discounts Given: UGX {report.income.discounts}</p>
      </section>

      {/* Customer Overview */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Customer Overview</h2>
        <p><span className="font-medium">Total Customers:</span> {report.customers.total}</p>
        <p>New: {report.customers.new}</p>
        <p>Returning: {report.customers.returning}</p>
        <p><span className="font-medium">Popular Service:</span> {report.popularService}</p>
      </section>

      {/* Services Table */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Services Rendered</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-2 text-left">No.</th>
                <th className="p-2 text-left">Service</th>
                <th className="p-2 text-left">Qty</th>
                <th className="p-2 text-left">Total (UGX)</th>
              </tr>
            </thead>
            <tbody>
              {report.services.map((service, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{service.name}</td>
                  <td className="p-2">{service.qty}</td>
                  <td className="p-2">{service.total}</td>
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

export default IncomeDailyReport;
