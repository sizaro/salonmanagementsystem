import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Placeholder routes */}
          <Route path="/reports/daily" element={<div>Daily Report</div>} />
          <Route path="/reports/weekly" element={<div>Weekly Report</div>} />
          <Route path="/reports/monthly" element={<div>Monthly Report</div>} />
          <Route path="/workers" element={<div>Worker Performance</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
