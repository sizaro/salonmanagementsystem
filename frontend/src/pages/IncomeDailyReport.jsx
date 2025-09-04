import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeDailyReport = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const reportDate = today.toLocaleDateString("en-US", options);

  // States
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [advances, setAdvances] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [session, setSession] = useState(null); 

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, employeesRes, advancesRes, expensesRes, sessionRes] = await Promise.all([
          axios.get("http://localhost:5500/api/services/"),
          axios.get("http://localhost:5500/api/employees"),
          axios.get("http://localhost:5500/api/advances/"),
          axios.get("http://localhost:5500/api/expenses/"),
          axios.get("http://localhost:5500/api/sessions/"),
        ]);

        setServices(servicesRes.data);
        setEmployees(employeesRes.data);
        setAdvances(advancesRes.data);
        setExpenses(expensesRes.data);
        setSession(sessionRes.data);
      } catch (err) {
        console.error("Failed to fetch daily report data:", err);
      }
    };

    fetchData();
  }, []);

  // Calculations
  const grossIncome = services.reduce((sum, s) => sum + (s.service_amount || 0), 0);
  // const totalAdvances = advances.reduce((sum, a) => sum + (a.amount || 0), 0);
  // const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  // const totalSalaries = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

  // const netIncome = grossIncome - (totalAdvances + totalExpenses + totalSalaries);

  console.log("these are all the fetched services", services)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {reportDate} Daily Income Report
      </h1>

      {/* Summary */}
      <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{reportDate}</h2>
        <p>
          <span className="font-medium">Opened:</span>{" "}
          {session?.openTime ? new Date(session.openTime).toLocaleTimeString() : "N/A"}
        </p>
        <p>
          <span className="font-medium">Closed:</span>{" "}
          {session?.closeTime ? new Date(session.closeTime).toLocaleTimeString() : "N/A"}
        </p>
        {/* <p>
          <span className="font-medium">Workers on Duty:</span>{" "}
          {employees.map((e) => e.name).join(", ")}
        </p> */}
      </section>

      {/* Income Summary */}
      {/* <section className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Income Summary</h2>
        <p><span className="font-medium">Gross Income:</span> UGX {grossIncome}</p>
        <p><span className="font-medium">Expenses:</span> UGX {totalExpenses}</p>
        <p><span className="font-medium">Advances:</span> UGX {totalAdvances}</p>
        <p><span className="font-medium">Salaries:</span> UGX {totalSalaries}</p>
        <hr className="my-2" />
        <p className="text-lg font-bold text-green-700">
          <span className="font-medium">Net Income:</span> UGX {netIncome}
        </p>
      </section> */}

      {/* Services Table */}
      {/* Services Table */}
<section className="bg-white shadow-md rounded-lg p-4 mb-6">
  <h2 className="text-xl font-semibold text-blue-700 mb-4">Services Rendered</h2>

  {/* Make table horizontally scrollable on small screens */}
  <div className="overflow-auto w-full space-y-10" >
    <table className="w-full min-w-max border border-gray-300 text-sm">
      <thead className="bg-blue-700 text-white">
        <tr>
          <th className="p-2 text-left">No.</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Service Amount</th>
          <th className="p-2 text-left">Salon Amount</th>
          <th className="p-2 text-left">Barber</th>
          <th className="p-2 text-left">Barber Amount</th>
          <th className="p-2 text-left">Assistant</th>
          <th className="p-2 text-left">Assistant Amount</th>
          <th className="p-2 text-left">Scrubber Assistant</th>
          <th className="p-2 text-left">Scrubber Amount</th>
          <th className="p-2 text-left">Black Shampoo</th>
          <th className="p-2 text-left">Black Shampoo Amount</th>
          <th className="p-2 text-left">Super Black</th>
          <th className="p-2 text-left">Super Black Amount</th>
          <th className="p-2 text-left">Black Mask</th>
          <th className="p-2 text-left">Black Mask Amount</th>
          <th className="p-2 text-left">Time of Service</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service, index) => (
          <tr key={service.id} className="border-b">
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{service.name}</td>
            <td className="p-2">{service.service_amount}</td>
            <td className="p-2">{service.salon_amount}</td>
            <td className="p-2">{service.barber}</td>
            <td className="p-2">{service.barber_amount}</td>
            <td className="p-2">{service.barber_assistant || "-"}</td>
            <td className="p-2">{service.barber_assistant_amount}</td>
            <td className="p-2">{service.scrubber_assistant || "-"}</td>
            <td className="p-2">{service.scrubber_assistant_amount}</td>
            <td className="p-2">{service.black_shampoo_assistant || "-"}</td>
            <td className="p-2">{service.black_shampoo_amount}</td>
            <td className="p-2">{service.super_black_assistant || "-"}</td>
            <td className="p-2">{service.super_black_amount}</td>
            <td className="p-2">{service.black_mask_assistant || "-"}</td>
            <td className="p-2">{service.black_mask_amount}</td>
            <td className="p-2">
              {new Date(service.service_timestamp).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
</div>
  );
};

export default IncomeDailyReport;
