
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
    <section id="services-section" className="section-container bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
      <h2 className="section-title">Services Rendered</h2>

      {/* Table Scroll Wrapper */}
      <div className="table-wrapper bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
        <div className="table-container bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
          <table id="services-table" className="styled-table bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Service Amount</th>
                <th>Salon Amount</th>
                <th>Barber</th>
                <th>Barber Amount</th>
                <th>Aesthetician</th>
                <th>Aesthetician Amount</th>
                <th>Scrub Aesthetician</th>
                <th>Scrubber Amount</th>
                <th>Black Shampoo Aesthetician</th>
                <th>Black Shampoo Aesthetician Amount</th>
                <th>Black Shampoo Amount</th>
                <th>Super Black Aesthetician</th>
                <th>Super Black Aesthetician Amount</th>
                <th>Super Black Amount</th>
                <th>Black Mask Aesthetician</th>
                <th>Black Mask Aesthetician Amount</th>
                <th>Black Mask Amount</th>
                <th>Time of Service</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.service_amount}</td>
                  <td>{service.salon_amount}</td>
                  <td>{service.barber}</td>
                  <td>{service.barber_amount}</td>
                  <td>{service.barber_assistant || "-"}</td>
                  <td>{service.barber_assistant_amount}</td>
                  <td>{service.scrubber_assistant || "-"}</td>
                  <td>{service.scrubber_assistant_amount}</td>
                  <td>{service.black_shampoo_assistant || "-"}</td>
                  <td>{service.black_shampoo_assistant_amount || "-"}</td>
                  <td>{service.black_shampoo_amount}</td>
                  <td>{service.super_black_assistant || "-"}</td>
                  <td>{service.super_black_assistant_amount || "-"}</td>
                  <td>{service.super_black_amount}</td>
                  <td>{service.black_mask_assistant || "-"}</td>
                  <td>{service.black_mask_assistant_amount || "-"}</td>
                  <td>{service.black_mask_amount}</td>
                  <td>{new Date(service.service_timestamp).toLocaleString()}</td>
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