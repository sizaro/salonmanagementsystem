import { useState, useEffect } from 'react';

export default function ClockForm({ onSubmit, onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [form, setForm] = useState({
    employeeName: '',
    clockIn: null,
    clockOut: null,
  });

  // update digital clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClockIn = () => {
    setForm({ ...form, clockIn: new Date().toISOString() });
  };

  const handleClockOut = () => {
    setForm({ ...form, clockOut: new Date().toISOString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Digital Clock */}
      <div className="text-center text-2xl font-bold">
        {currentTime.toLocaleTimeString()}
      </div>

      <h2 className="text-xl font-bold">Employee Clock In / Clock Out</h2>

      {/* Employee name */}
      <input
        type="text"
        name="employeeName"
        placeholder="Employee Name"
        onChange={handleChange}
        required
        className="w-full border px-2 py-1"
      />

      {/* Clock in/out buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleClockIn}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Clock In
        </button>
        <button
          type="button"
          onClick={handleClockOut}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clock Out
        </button>
      </div>

      {/* Display recorded times */}
      <div className="space-y-2 text-sm text-gray-700">
        {form.clockIn && (
          <p>Clocked in at: {new Date(form.clockIn).toLocaleTimeString()}</p>
        )}
        {form.clockOut && (
          <p>Clocked out at: {new Date(form.clockOut).toLocaleTimeString()}</p>
        )}
      </div>

      {/* Submit + Cancel */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="btn bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
