import { useState } from 'react';

export default function ClockForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    employeeName: '',
    clockIn: '',
    clockOut: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Clock In / Clock Out</h2>
      <input
        type="text"
        name="employeeName"
        placeholder="Employee Name"
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="clockIn"
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="clockOut"
        onChange={handleChange}
        required
      />
      <div className="flex gap-4">
        <button type="submit" className="btn">Submit</button>
        <button type="button" onClick={onClose} className="btn cancel">Cancel</button>
      </div>
    </form>
  );
}
