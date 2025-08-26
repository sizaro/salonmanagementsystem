import { useState } from 'react';

export default function ExpenseForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ name: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose()
  };

  return (<form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded shadow-md bg-white max-w-md mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Add Expense</h2>

  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 font-medium">Expense Name</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Enter expense name"
      onChange={handleChange}
      required
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="amount" className="mb-1 font-medium">Amount</label>
    <input
      type="number"
      id="amount"
      name="amount"
      placeholder="Enter amount"
      onChange={handleChange}
      required
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div className="flex justify-end gap-4 mt-4">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
    >
      Submit
    </button>
    <button
      type="button"
      onClick={onClose}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow"
    >
      Cancel
    </button>
  </div>
</form>

  );
}
