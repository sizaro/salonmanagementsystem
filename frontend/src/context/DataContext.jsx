import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [advances, setAdvances] = useState([]);
  const [clockings, setClockings] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500/api";

  // Fetch non-session data once or on mutation
  const fetchAllData = async () => {
    try {
      const [servicesRes, advancesRes, expensesRes, clockingsRes, employeeRes] =
        await Promise.all([
          axios.get(`${API_URL}/services`),
          axios.get(`${API_URL}/advances`),
          axios.get(`${API_URL}/expenses`),
          axios.get(`${API_URL}/clockings`),
          axios.get(`${API_URL}/employees`),
         ]);

      setServices(servicesRes.data);
      setAdvances(advancesRes.data);
      setExpenses(expensesRes.data);
      setClockings(clockingsRes.data);
      setEmployees(employeeRes.data);
    } catch (err) {
      console.error("Error fetching static data:", err);
    }
  };

  // Fetch sessions (polling every 1 min)
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/sessions`);
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  // -------------------------
  // NEW: Report Queries
  // -------------------------

  // Daily report
  const fetchDailyData = async (date) => {
    try {
      const res = await axios.get(`${API_URL}/reports/daily?date=${date}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching daily report:", err);
      throw err;
    }
  };

  // Weekly report
    const fetchWeeklyData = async (start, end) => {
  try {
    const formatDate = (date) => date.toISOString().split("T")[0];

    const res = await axios.get(`${API_URL}/reports/weekly`, {
      params: {
        startDate: formatDate(start), // e.g. "2025-09-29"
        endDate: formatDate(end),     // e.g. "2025-10-05"
      },
    });

    const data = res.data; // { services: [...], expenses: [...], advances: [...] }

    // ✅ Set the context state so the frontend receives it
    setServices(data.services);
    setExpenses(data.expenses);
    setAdvances(data.advances);

    console.log("data arriving into the frontend", data);
  } catch (err) {
    console.error("Error fetching weekly report:", err);
  }
};


  // Monthly report
  const fetchMonthlyData = async (year, month) => {
  try {
    const res = await axios.get(`${API_URL}/reports/monthly`, {
      params: { year, month }
    });

    const data = res.data; //

    // ✅ Store in context (just like weekly)
    setServices(data.services);
    setExpenses(data.expenses);
    setAdvances(data.advances);

    console.log("Monthly data arriving into the frontend:", data);

    return data;
  } catch (err) {
    console.error("Error fetching monthly report:", err);
    throw err;
  }
};


  // Yearly report (commented until needed)

  // Yearly report
const fetchYearlyData = async (year) => {
  try {
    const res = await axios.get(`${API_URL}/reports/yearly`, {
      params: { year },
    });

    const data = res.data; // { services, expenses, advances }

    // ✅ Update context state
    setServices(data.services);
    setExpenses(data.expenses);
    setAdvances(data.advances);

    console.log("Yearly data arriving into frontend:", data);

    return data; // optional if a page wants to use it directly
  } catch (err) {
    console.error("Error fetching yearly report:", err);
  }
};


  // -------------------------
  // sendFormData (unchanged)
  // -------------------------
  const sendFormData = async (formIdentifier, formData) => {
    try {
      let res;

      switch (formIdentifier) {
        case "createEmployee":
          res = await axios.post(`${API_URL}/employees`, formData);
          await fetchAllData();
          break;
        case "createService":
          res = await axios.post(`${API_URL}/services`, formData);
          await fetchAllData();
          break;
        case "createAdvance":
          res = await axios.post(`${API_URL}/advances`, formData);
          await fetchAllData();
          break;
        case "createExpense":
          res = await axios.post(`${API_URL}/expenses`, formData);
          await fetchAllData();
          break;
        case "createClocking":
          res = await axios.post(`${API_URL}/clockings`, formData);
          await fetchAllData();
          break;
        case "openSalon":
        case "closeSalon":
          res =
            formIdentifier === "openSalon"
              ? await axios.post(`${API_URL}/sessions`, formData)
              : await axios.put(`${API_URL}/sessions`, formData);
          await fetchSessions(); // only refresh sessions
          break;
        default:
          throw new Error("Unknown form identifier: " + formIdentifier);
      }

      return res.data;
    } catch (err) {
      console.error(`Error in sendFormData for ${formIdentifier}:`, err);
      throw err;
    }
  };

  // Fetch static data once on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Poll sessions every 1 minute
  useEffect(() => {
    fetchSessions(); // initial fetch
    const interval = setInterval(fetchSessions, 60 * 1000); // 1 min

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider
      value={{
        services,
        employees,
        expenses,
        advances,
        clockings,
        sessions,
        loading,
        fetchAllData,
        sendFormData,
        // fetchDailyData,
        fetchWeeklyData,
        fetchMonthlyData,
        fetchYearlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
