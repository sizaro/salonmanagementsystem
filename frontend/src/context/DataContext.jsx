// src/context/DataContext.jsx
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

  // Fetch everything at once
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [servicesRes, employeesRes, advancesRes, clockingsRes, sessionsRes] = await Promise.all([
        axios.get(`${API_URL}/services`),
        axios.get(`${API_URL}/employees`),
        axios.get(`${API_URL}/advances`),
        axios.get(`${API_URL}/clockings`),
        axios.get(`${API_URL}/sessions`),
      ]);

      setServices(servicesRes.data);
      setEmployees(employeesRes.data);
      setAdvances(advancesRes.data);
      setClockings(clockingsRes.data);
      console.log(sessionsRes.data[0])
      setSessions(sessionsRes.data);
    } catch (err) {
      console.error("Error fetching all data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Decide what axios to run based on identifier
  const sendFormData = async (formIdentifier, formData) => {
    try {
      let res;

      switch (formIdentifier) {
        case "createEmployee":
          res = await axios.post(`${API_URL}/employees`, formData);
          break;
        case "createService":
          res = await axios.post(`${API_URL}/services`, formData);
          break;
        case "createAdvance":
          res = await axios.post(`${API_URL}/advances`, formData);
          break;
        case "createClocking":
          res = await axios.post(`${API_URL}/clockings`, formData);
          break;
        case "openSalon":
          res = await axios.post(`${API_URL}/sessions`, formData);
          break;
        case "closeSalon":
          res = await axios.put(`${API_URL}/sessions`, formData);
          break;
        default:
          throw new Error("Unknown form identifier: " + formIdentifier);
      }

      // refresh all data after mutation
      await fetchAllData();

      return res.data;
    } catch (err) {
      console.error(`Error in sendFormData for ${formIdentifier}:`, err);
      throw err;
    }
  };

  // Fetch everything once on load
  useEffect(() => {
    fetchAllData();
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
