import { useState, useEffect } from 'react';

export default function AdvanceForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ employee_id: '', amount: '', description: '' });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Replace with API call to fetch employees from database
    setEmployees([
      { id: 1, first_name: 'Jane', last_name: 'Doe' },
      { id: 2, first_name: 'John', last_name: 'Smith' },
      { id: 3, first_name: 'Sarah', last_name: 'Johnson' },
      { id: 4, first_name: 'Paul', last_name: 'Brown' },
      { id: 5, first_name: 'Emily', last_name: 'Davis' },
      { id: 6, first_name: 'Michael', last_name: 'Wilson' },
      { id: 7, first_name: 'Laura', last_name: 'Taylor' },
      { id: 8, first_name: 'David', last_name: 'Anderson' },
      { id: 9, first_name: 'Sophia', last_name: 'Thomas' },
      { id: 10, first_name: 'Daniel', last_name: 'Martinez' },
    ]);
  }, []);

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
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
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
