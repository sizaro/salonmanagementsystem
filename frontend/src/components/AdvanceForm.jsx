import { useState, useEffect } from 'react';

export default function AdvanceForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ employee: '', amount: '' });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Replace with real API call
    setEmployees(['Jane', 'John', 'Sarah', 'Paul']);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Give Advance</h2>
      <select name="employee" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {employees.map((emp, i) => (
          <option key={i} value={emp}>{emp}</option>
        ))}
      </select>
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
      <div className="flex gap-4">
        <button type="submit" className="btn">Submit</button>
        <button type="button" onClick={onClose} className="btn cancel">Cancel</button>
      </div>
    </form>
  );
}
