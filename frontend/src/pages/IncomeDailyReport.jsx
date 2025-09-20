
import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";
import "../styles/IncomeDailyReport.css";

const IncomeDailyReport = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const reportDate = today.toLocaleDateString("en-US", options);

  const { services, employees, advances, expenses, sessions } = useData();

const session = sessions && sessions.length > 0 ? sessions[0] : null;
const [liveDuration, setLiveDuration] = useState("");


// Calculate totals
const calculateTotals = (services, expenses, advances) => {
  // Gross Income
  const grossIncome = services.reduce(
    (sum, s) => sum + (parseInt(s.service_amount, 10) || 0),
    0
  );

  // Employees Salary from all roles
  const employeesSalary = services.reduce((sum, s) => {
    return sum +
      (parseInt(s.barber_amount, 10) || 0) +
      (parseInt(s.barber_assistant_amount, 10) || 0) +
      (parseInt(s.scrubber_assistant_amount, 10) || 0) +
      (parseInt(s.black_shampoo_assistant_amount, 10) || 0) +
      (parseInt(s.super_black_assistant_amount, 10) || 0) +
      (parseInt(s.black_mask_assistant_amount, 10) || 0);
  }, 0);

  // Expenses
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (parseInt(e.amount, 10) || 0),
    0
  );

  // Advances
  const totalAdvances = advances.reduce(
    (sum, a) => sum + (parseInt(a.amount, 10) || 0),
    0
  );

  const netEmployeeSalary = employeesSalary - totalAdvances

  // Net Income
  const netIncome = grossIncome - (totalExpenses + employeesSalary - totalAdvances);

  return { grossIncome, employeesSalary, totalExpenses, totalAdvances, netEmployeeSalary, netIncome };
};

const { grossIncome, employeesSalary, totalExpenses, totalAdvances, netEmployeeSalary, netIncome } =
  calculateTotals(services, expenses, advances);

// Format any UTC date string to EAT
const formatEAT = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("en-UG", {
    timeZone: "Africa/Kampala",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Calculate duration in hours and minutes only
const calculateDuration = (openUTC, closeUTC) => {
  if (!openUTC || !closeUTC) return "N/A";

  const diffMs = new Date(closeUTC) - new Date(openUTC);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

useEffect(() => {
  if (!session) return;

  // Initial calculation
  const openUTC = session.open_time;
  const closeUTC = session.close_time || session.server_now;
  setLiveDuration(calculateDuration(openUTC, closeUTC));

  // If salon is open, update duration every 1 minute
  if (!session.close_time) {
    const interval = setInterval(() => {
      setLiveDuration(calculateDuration(openUTC, session.server_now));
    }, 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }
}, [session]);

if (!session) return <p>Salon not open today yet</p>;

return (
    <div className="income-page max-w-4xl mx-auto p-4" >
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 break-words max-w-full">
    {reportDate} Daily Income Report
  </h1>

  {/* Summary Section */}
  <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
    <h2 className="text-xl font-semibold text-blue-700 mb-2">{reportDate}</h2>
    <p><span className="font-medium">Opened:</span> {formatEAT(session.open_time)}</p>
    <p><span className="font-medium">Closed:</span> {session.close_time ? formatEAT(session.close_time) : "N/A"}</p>
    <p><span className="font-medium">Duration:</span> {liveDuration} {!session.close_time && "(Counting...)"}</p>
  </section>

  <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
      <p><span className="font-medium">Gross Income:</span> {grossIncome.toLocaleString()} UGX</p>
      <p><span className="font-medium">Employees Salary:</span> {employeesSalary.toLocaleString()} UGX</p>
      <p><span className="font-medium">Expenses:</span> {totalExpenses.toLocaleString()} UGX</p>
      <p><span className="font-medium">Advances:</span> {totalAdvances.toLocaleString()} UGX</p>
      <p><span className="font-medium">Net Employees Salary:</span> {netEmployeeSalary.toLocaleString()} UGX</p>
      <p><span className="font-medium">salon Net Income:</span> {netIncome.toLocaleString()} UGX</p>
  </section>

    {/* Services Table Section */}
    <section className="w-full max-w-screen-xl mx-auto bg-white shadow-md rounded-lg p-4">
  <h2 className="text-xl font-semibold text-blue-700 mb-4">Services Rendered</h2>

  {/* Table Scroll Wrapper */}
  <div className="overflow-x-auto">
    <div className="max-h-[50vh] overflow-y-auto border border-gray-300 rounded">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-blue-700 text-white sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 text-left">No.</th>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Service Amount</th>
            <th className="px-3 py-2 text-left">Salon Amount</th>
            <th className="px-3 py-2 text-left">Barber</th>
            <th className="px-3 py-2 text-left">Barber Amount</th>
            <th className="px-3 py-2 text-left">Aesthetician</th>
            <th className="px-3 py-2 text-left">Aesthetician Amount</th>
            <th className="px-3 py-2 text-left">Scrub Aesthetician</th>
            <th className="px-3 py-2 text-left">Scrubber Amount</th>
            <th className="px-3 py-2 text-left">Black Shampoo Aesthetician</th>
            <th className="px-3 py-2 text-left">Black Shampoo Aesthetician Amount</th>
            <th className="px-3 py-2 text-left">Black Shampoo Amount</th>
            <th className="px-3 py-2 text-left">Super Black Aesthetician</th>
            <th className="px-3 py-2 text-left">Super Black Aesthetician Amount</th>
            <th className="px-3 py-2 text-left">Super Black Amount</th>
            <th className="px-3 py-2 text-left">Black Mask Aesthetician</th>
            <th className="px-3 py-2 text-left">Black Mask Aesthetician Amount</th>
            <th className="px-3 py-2 text-left">Black Mask Amount</th>
            <th className="px-3 py-2 text-left">Time of Service</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr
              key={service.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-3 py-2">{index + 1}</td>
              <td className="px-3 py-2">{service.name}</td>
              <td className="px-3 py-2">{service.service_amount}</td>
              <td className="px-3 py-2">{service.salon_amount}</td>
              <td className="px-3 py-2">{service.barber}</td>
              <td className="px-3 py-2">{service.barber_amount}</td>
              <td className="px-3 py-2">{service.barber_assistant || "-"}</td>
              <td className="px-3 py-2">{service.barber_assistant_amount}</td>
              <td className="px-3 py-2">{service.scrubber_assistant || "-"}</td>
              <td className="px-3 py-2">{service.scrubber_assistant_amount}</td>
              <td className="px-3 py-2">{service.black_shampoo_assistant || "-"}</td>
              <td className="px-3 py-2">{service.black_shampoo_assistant_amount || "-"}</td>
              <td className="px-3 py-2">{service.black_shampoo_amount}</td>
              <td className="px-3 py-2">{service.super_black_assistant || "-"}</td>
              <td className="px-3 py-2">{service.super_black_assistant_amount || "-"}</td>
              <td className="px-3 py-2">{service.super_black_amount}</td>
              <td className="px-3 py-2">{service.black_mask_assistant || "-"}</td>
              <td className="px-3 py-2">{service.black_mask_assistant_amount || "-"}</td>
              <td className="px-3 py-2">{service.black_mask_amount}</td>
              <td className="px-3 py-2">
                {new Date(service.service_timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>


</div>

 ); }; 

export default IncomeDailyReport;