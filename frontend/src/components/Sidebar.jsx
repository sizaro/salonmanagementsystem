import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [workersOpen, setWorkersOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition-colors ${
      isActive(path) ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'
    }`;

  return (
    <nav className="w-64 h-screen bg-gray-900 text-white fixed overflow-y-auto">
      <div className="p-6 font-bold text-xl">Salon Dashboard</div>
      <ul className="space-y-1 px-2 text-sm">

        {/* Dashboard */}
        <li>
          <Link to="/" className={linkClass('/')}>
            Dashboard
          </Link>
        </li>

        {/* Income Reports */}
        <li>
          <div
            className="px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors flex justify-between"
            onClick={() => setIncomeOpen(!incomeOpen)}
          >
            <span>Income Reports</span>
            <span>{incomeOpen ? '▾' : '▸'}</span>
          </div>
          {incomeOpen && (
            <ul className="ml-4 space-y-1 mt-1">
              <li><Link to="/reports/daily" className={linkClass('/reports/daily')}>Daily</Link></li>
              <li><Link to="/reports/weekly" className={linkClass('/reports/weekly')}>Weekly</Link></li>
              <li><Link to="/reports/monthly" className={linkClass('/reports/monthly')}>Monthly</Link></li>
            </ul>
          )}
        </li>

        {/* Expenses */}
        <li>
          <div
            className="px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors flex justify-between"
            onClick={() => setExpensesOpen(!expensesOpen)}
          >
            <span>Expenses</span>
            <span>{expensesOpen ? '▾' : '▸'}</span>
          </div>
          {expensesOpen && (
            <ul className="ml-4 space-y-1 mt-1">
              <li><Link to="/expenses/daily" className={linkClass('/expenses/daily')}>Daily</Link></li>
              <li><Link to="/expenses/weekly" className={linkClass('/expenses/weekly')}>Weekly</Link></li>
              <li><Link to="/expenses/monthly" className={linkClass('/expenses/monthly')}>Monthly</Link></li>
            </ul>
          )}
        </li>

        {/* Worker Performance */}
        <li>
          <div
            className="px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors flex justify-between"
            onClick={() => setWorkersOpen(!workersOpen)}
          >
            <span>Worker Performance</span>
            <span>{workersOpen ? '▾' : '▸'}</span>
          </div>
          {workersOpen && (
            <ul className="ml-4 space-y-1 mt-1">
              <li><Link to="/workers/daily" className={linkClass('/workers/daily')}>Daily</Link></li>
              <li><Link to="/workers/weekly" className={linkClass('/workers/weekly')}>Weekly</Link></li>
              <li><Link to="/workers/monthly" className={linkClass('/workers/monthly')}>Monthly</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
