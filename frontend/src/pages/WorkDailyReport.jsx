import React, { useMemo } from "react";
import { useData } from "../context/DataContext.jsx";

export default function WorkDailyReport() {
  const { services, employees, advances } = useData();

  const employeeTotals = useMemo(() => {
  if (!services.length) return [];

  return employees.map((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`;

    // Total salary (only add the amounts for roles the employee actually worked in)
    const totalSalary = services.reduce((sum, s) => {
      if (s.barber === fullName) {
        sum += parseInt(s.barber_amount) || 0;
      }
      if (s.barber_assistant === fullName) {
        sum += parseInt(s.barber_assistant_amount) || 0;
      }
      if (s.scrubber_assistant === fullName) {
        sum += parseInt(s.scrubber_assistant_amount) || 0;
      }
      if (s.black_shampoo_assistant === fullName) {
        sum += parseInt(s.black_shampoo_assistant_amount) || 0;
      }
      if (s.super_black_assistant === fullName) {
        sum += parseInt(s.super_black_assistant_amount) || 0;
      }
      if (s.black_mask_assistant === fullName) {
        sum += parseInt(s.black_mask_assistant_amount) || 0;
      }
      return sum;
    }, 0);

    // Total advances for today
    const totalAdvances = advances
      .filter((a) => a.employee_name === fullName)
      .reduce((sum, a) => sum + (parseInt(a.amount) || 0), 0);

    return {
      name: fullName,
      totalSalary,
      totalAdvances,
      netSalary: totalSalary - totalAdvances,
    };
  });
}, [services, advances, employees]);


  if (!services.length) {
    return (
      <section className="p-6">
        <h2 className="text-xl font-bold text-center text-gray-700">
          No Recorded Work Yet
        </h2>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Workers Daily Report
      </h2>

      <div className="overflow-x-auto overflow-y-auto max-h-[60vh] border rounded">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Employee</th>
              <th className="border px-4 py-2 text-right">Total Salary</th>
              <th className="border px-4 py-2 text-right">Advances</th>
              <th className="border px-4 py-2 text-right">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {employeeTotals.map((emp, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2 text-right">
                  {emp.totalSalary.toLocaleString()} UGX
                </td>
                <td className="border px-4 py-2 text-right">
                  {emp.totalAdvances.toLocaleString()} UGX
                </td>
                <td className="border px-4 py-2 text-right font-semibold">
                  {emp.netSalary.toLocaleString()} UGX
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
