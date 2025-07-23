import { useState } from 'react';

export default function ExpenseForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ name: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add Expense</h2>
      <input type="text" name="name" placeholder="Expense Name" onChange={handleChange} required />
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
      <div className="flex gap-4">
        <button type="submit" className="btn">Submit</button>
        <button type="button" onClick={onClose} className="btn cancel">Cancel</button>
      </div>
    </form>
  );
}
