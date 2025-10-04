import { useState, useEffect } from 'react';

export default function AdvanceForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ employee_name: '', amount: '', description: '' });
  const [employees, setEmployees] = useState([]);

  const mockEmployees = [
  { id: 1, first_name: "Tagoole", last_name: "Nathan", phone: "705715763" },
  { id: 2, first_name: "Mukungu", last_name: "Ismail", phone: "755686550" },
  { id: 3, first_name: "Direse", last_name: "Arafat", phone: "742259330" },
  { id: 4, first_name: "Nambi", last_name: "Aisha", phone: "753541883" },
  { id: 5, first_name: "Mutesi", last_name: "Shamina", phone: "745930298" },
  { id: 6, first_name: "Nantongo", last_name: "Jazimin", phone: "703093092" },
  { id: 7, first_name: "Nakaibale", last_name: "Sharon", phone: "752272415" },
  { id: 8, first_name: "Kyewayenda", last_name: "Brenda", phone: "752853209" },
  { id: 9, first_name: "Tusubira", last_name: "David tobex", phone: "788517650" },
  { id: 10, first_name: "Kwikiriza", last_name: "Phinnah", phone: "742927521" },
  { id: 11, first_name: "Muzale Grace", last_name: "innocent", phone: "754954054" },
  { id: 12, first_name: "Tendo", last_name: "Mirembe", phone: "750795036" },
  { id: 13, first_name: "Nakato", last_name: "Hilda", phone: "700465015" },
  { id: 14, first_name: "Bazibu", last_name: "Nickolas", phone: "750411158" },
];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose()
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Give Advance</h2>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Employee</label>
        <select
          name="employee_name"
          value={form.employee_name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Employee</option>
          {mockEmployees.map((emp) => (
            <option key={emp.id} value={`${emp.first_name} ${emp.last_name}`}>
              {emp.first_name} {emp.last_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Enter Amount"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Description (Optional)</label>
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Enter description"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Submit</button>
      </div>
    </form>
  );
}
