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
      const [servicesRes,  advancesRes, expensesRes, clockingsRes, employeeRes] = await Promise.all([
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
      setEmployees(employeeRes.data)
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

  // Decide what axios to run based on identifier
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
          res = formIdentifier === "openSalon"
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
