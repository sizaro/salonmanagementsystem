import { useState, useEffect } from "react";

const mockEmployees = [
  { id: 1, first_name: "Jane", last_name: "Doe" },
  { id: 2, first_name: "John", last_name: "Smith" },
  { id: 3, first_name: "Sarah", last_name: "Johnson" },
  { id: 4, first_name: "Paul", last_name: "Brown" },
  { id: 5, first_name: "Emily", last_name: "Davis" },
  { id: 6, first_name: "Michael", last_name: "Wilson" },
  { id: 7, first_name: "Laura", last_name: "Taylor" },
  { id: 8, first_name: "David", last_name: "Anderson" },
  { id: 9, first_name: "Sophia", last_name: "Thomas" },
  { id: 10, first_name: "Daniel", last_name: "Martinez" },
];

export default function ClockForm({ onSubmit, onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    employeeId: "",
    clockIn: null,
    clockOut: null,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmployeeChange = (e) => {
    setFormData((prev) => ({ ...prev, employeeId: e.target.value }));
  };

  const handleClockIn = () => {
  const updatedForm = {
    ...formData,
    clockIn: new Date().toISOString(),
    clockOut: null, 
  };

  setFormData(updatedForm);  
  onSubmit("clockin", updatedForm); 
  onClose();             
};

const handleClockOut = () => {
  const updatedForm = {
    ...formData,
    clockOut: new Date().toISOString(),

  };

  setFormData(updatedForm);  
  onSubmit("clockout", updatedForm); 
  onClose();       
};


  return (
    <div className="space-y-6">
      {/* Digital Clock */}
      <div className="text-center text-2xl font-bold">
        {currentTime.toLocaleTimeString()}
      </div>

      <h2 className="text-xl font-bold">Employee Clock In / Clock Out</h2>

      {/* Employee dropdown */}
      <select
        name="employeeId"
        value={formData.employeeId}
        onChange={handleEmployeeChange}
        required
        className="w-full border px-2 py-1"
      >
        <option value="">Select Employee</option>
        {mockEmployees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.first_name} {emp.last_name}
          </option>
        ))}
      </select>

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

      {/* Cancel */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="btn bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
