import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import IncomeDailyReport from './pages/IncomeDailyReport';
import ExpensesDailyReport from './pages/ExpensesDailyReport';
import WorkDailyReport from './pages/WorkDailyReport';
function App() {
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-6 pt-18 md:pt-6 md:ml-64 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Placeholder routes */}
          <Route path="/pages/IncomeDailyReport" element={<IncomeDailyReport />} />
          <Route path="/pages/ExpensesDailyReport" element={<ExpensesDailyReport/>} />
          <Route path="/pages/WorkDailyReport" element={<WorkDailyReport/>} />
          <Route path="/workers" element={<div>Worker Performance</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
