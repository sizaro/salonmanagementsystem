import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [advances, setAdvances] = useState([]);
  const [clockings, setClockings] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500/api";

  // Fetch non-session data once or on mutation
  const fetchAllData = async () => {
    try {
      const [servicesRes, employeesRes, advancesRes, clockingsRes] = await Promise.all([
        axios.get(`${API_URL}/services`),
        axios.get(`${API_URL}/employees`),
        axios.get(`${API_URL}/advances`),
        axios.get(`${API_URL}/clockings`),
      ]);

      setServices(servicesRes.data);
      setEmployees(employeesRes.data);
      setAdvances(advancesRes.data);
      setClockings(clockingsRes.data);
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
          await fetchStaticData();
          break;
        case "createService":
          res = await axios.post(`${API_URL}/services`, formData);
          await fetchStaticData();
          break;
        case "createAdvance":
          res = await axios.post(`${API_URL}/advances`, formData);
          await fetchStaticData();
          break;
        case "createClocking":
          res = await axios.post(`${API_URL}/clockings`, formData);
          await fetchStaticData();
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
