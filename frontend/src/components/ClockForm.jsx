import { useState, useEffect } from "react";

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
];


export default function ClockForm({ onSubmit, onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    employeeName: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmployeeChange = (e) => {
    setFormData((prev) => ({ ...prev, employeeName: e.target.value }));
  };

  const handleClockIn = () => { 
  onSubmit("clockin", formData); 
  onClose();             
};

const handleClockOut = () => {
  setFormData(updatedForm);  
  onSubmit("clockout", formData); 
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
          <option key={emp.id} value={`${emp.first_name} ${emp.last_name}`}>
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
