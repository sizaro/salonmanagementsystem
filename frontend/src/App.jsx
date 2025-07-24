import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import IncomeDailyReport from './pages/IncomeDailyReport';
import ExpensesDailyReport from './pages/ExpensesDailyReport';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 pt-18 md:pt-6 md:ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Placeholder routes */}
          <Route path="/pages/IncomeDailyReport" element={<IncomeDailyReport />} />
          <Route path="/pages/ExpensesDailyReport" element={<ExpensesDailyReport/>} />
          <Route path="/reports/monthly" element={<div>Monthly Report</div>} />
          <Route path="/workers" element={<div>Worker Performance</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
