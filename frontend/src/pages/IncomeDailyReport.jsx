
import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";

const IncomeDailyReport = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const reportDate = today.toLocaleDateString("en-US", options);

  const { services, employees, advances, expenses, sessions } = useData();

const session = sessions && sessions.length > 0 ? sessions[0] : null;
const [liveDuration, setLiveDuration] = useState("");

// Format any UTC date string to EAT
const formatEAT = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("en-UG", {
    timeZone: "Africa/Kampala",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Calculate duration in hours and minutes only
const calculateDuration = (openUTC, closeUTC) => {
  if (!openUTC || !closeUTC) return "N/A";

  const diffMs = new Date(closeUTC) - new Date(openUTC);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

useEffect(() => {
  if (!session) return;

  // Initial calculation
  const openUTC = session.open_time;
  const closeUTC = session.close_time || session.server_now;
  setLiveDuration(calculateDuration(openUTC, closeUTC));

  // If salon is open, update duration every 1 minute
  if (!session.close_time) {
    const interval = setInterval(() => {
      setLiveDuration(calculateDuration(openUTC, session.server_now));
    }, 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }
}, [session]);

if (!session) return <p>Salon not open today yet</p>;

return (
  <div className="w-full max-w-4xl p-4 space-y-10 overflow-hidden">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
      {reportDate} Daily Income Report
    </h1>

    {/* Summary */}
    <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">
        {reportDate}
      </h2>

      <p>
        <span className="font-medium">Opened:</span>{" "}
        {formatEAT(session.open_time)}
      </p>
      <p>
        <span className="font-medium">Closed:</span>{" "}
        {session.close_time ? formatEAT(session.close_time) : "N/A"}
      </p>
      <p>
        <span className="font-medium">Duration:</span>{" "}
        {liveDuration} { !session.close_time && "(Counting...)" }
      </p>
    </section>
  {/* Services Table */} {/* Services Table */} 
  <section className="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 className="text-xl font-semibold text-blue-700 mb-4">Services Rendered</h2> 
    {/* Make table horizontally scrollable on small screens */} 
    <div className="overflow-x-auto w-full" > 
      <table className="w-full min-w-max border border-gray-300 text-sm"> 
        <thead className="bg-blue-700 text-white"> <tr> 
          <th className="p-2 text-left">No.</th> 
          <th className="p-2 text-left">Name</th> 
          <th className="p-2 text-left">Service Amount</th> 
          <th className="p-2 text-left">Salon Amount</th> 
          <th className="p-2 text-left">Barber</th> 
          <th className="p-2 text-left">Barber Amount</th> 
          <th className="p-2 text-left">Aesthetician</th> 
          <th className="p-2 text-left">Aesthetician Amount</th> 
          <th className="p-2 text-left">Scrubber Aesthetician</th> 
          <th className="p-2 text-left">Scrubber Amount</th> 
          <th className="p-2 text-left">Black Shampoo Aesthetician</th>
          <th className="p-2 text-left">Black Shampoo Aesthetician Amount</th> 
          <th className="p-2 text-left">Black Shampoo Amount</th> 
          <th className="p-2 text-left">Super Black Aestheticain</th>
          <th className="p-2 text-left">Super Black Aesthetician Amount</th>
          <th className="p-2 text-left">Super Black Amount</th> 
          <th className="p-2 text-left">Black Mask Aesthetician</th> 
          <th className="p-2 text-left">Black Mask Aesthetician Amount</th> 
          <th className="p-2 text-left">Black Mask Amount</th> 
          <th className="p-2 text-left">Time of Service</th> 
          </tr> 
          </thead> 
          <tbody> {services.map((service, index) => ( <tr key={service.id} className="border-b">
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
            <td className="p-2">{service.black_shampoo_assistant_amount || "-"}</td>
            <td className="p-2">{service.black_shampoo_amount}</td> 
            <td className="p-2">{service.super_black_assistant || "-"}</td> 
            <td className="p-2">{service.super_black_assistant_amount || "-"}</td> 
            <td className="p-2">{service.super_black_amount}</td> 
            <td className="p-2">{service.black_mask_assistant || "-"}</td>
            <td className="p-2">{service.black_mask_assistant_amount || "-"}</td> 
            <td className="p-2">{service.black_mask_amount}</td> 
            <td className="p-2"> {new Date(service.service_timestamp).toLocaleString()} </td> 
            </tr> ))} </tbody> </table> 
            </div> 
            </section> 
  </div> ); }; 

export default IncomeDailyReport;