// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useData } from "../context/DataContext.jsx"; 

// const IncomeDailyReport = () => {
//   const today = new Date();
//   const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
//   const reportDate = today.toLocaleDateString("en-US", options);

// const { services, employees, advances, expenses, sessions } = useData();

//     const session = sessions[0]

//   // Calculations
//   const grossIncome = services.reduce((sum, s) => sum + (s.service_amount || 0), 0);
//   // const totalAdvances = advances.reduce((sum, a) => sum + (a.amount || 0), 0);
//   // const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
//   // const totalSalaries = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

//   // const netIncome = grossIncome - (totalAdvances + totalExpenses + totalSalaries);

//   console.log("these are all the fetched services", services)
//   console.log("this is the fetched salon session", sessions[0])

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         {reportDate} Daily Income Report
//       </h1>

//       {/* Summary */}
      
//     <section className="bg-white shadow-md rounded-lg p-4 mb-6">
//       <h2 className="text-xl font-semibold text-blue-700 mb-2">{reportDate}</h2>

//       <p>
//         <span className="font-medium">Opened:</span> {new Date(session.open_time).toLocaleTimeString()}
//       </p>
//       <p>
//         <span className="font-medium">Closed:</span>{" "}
//         {session.close_time ? new Date(session.close_time).toLocaleTimeString() : "N/A"}
//       </p>
//       <p>
//         <span className="font-medium">Duration:</span> {liveDuration}
//         {!session.close_time && " (Counting...)"}
//       </p>
//     </section>


//       {/* Income Summary */}
//       {/* <section className="bg-white shadow-md rounded-lg p-4 mb-6">
//         <h2 className="text-xl font-semibold text-blue-700 mb-4">Income Summary</h2>
//         <p><span className="font-medium">Gross Income:</span> UGX {grossIncome}</p>
//         <p><span className="font-medium">Expenses:</span> UGX {totalExpenses}</p>
//         <p><span className="font-medium">Advances:</span> UGX {totalAdvances}</p>
//         <p><span className="font-medium">Salaries:</span> UGX {totalSalaries}</p>
//         <hr className="my-2" />
//         <p className="text-lg font-bold text-green-700">
//           <span className="font-medium">Net Income:</span> UGX {netIncome}
//         </p>
//       </section> */}

//       {/* Services Table */}
//       {/* Services Table */}
// <section className="bg-white shadow-md rounded-lg p-4 mb-6">
//   <h2 className="text-xl font-semibold text-blue-700 mb-4">Services Rendered</h2>

//   {/* Make table horizontally scrollable on small screens */}
//   <div className="overflow-auto w-full space-y-10" >
//     <table className="w-full min-w-max border border-gray-300 text-sm">
//       <thead className="bg-blue-700 text-white">
//         <tr>
//           <th className="p-2 text-left">No.</th>
//           <th className="p-2 text-left">Name</th>
//           <th className="p-2 text-left">Service Amount</th>
//           <th className="p-2 text-left">Salon Amount</th>
//           <th className="p-2 text-left">Barber</th>
//           <th className="p-2 text-left">Barber Amount</th>
//           <th className="p-2 text-left">Assistant</th>
//           <th className="p-2 text-left">Assistant Amount</th>
//           <th className="p-2 text-left">Scrubber Assistant</th>
//           <th className="p-2 text-left">Scrubber Amount</th>
//           <th className="p-2 text-left">Black Shampoo</th>
//           <th className="p-2 text-left">Black Shampoo Amount</th>
//           <th className="p-2 text-left">Super Black</th>
//           <th className="p-2 text-left">Super Black Amount</th>
//           <th className="p-2 text-left">Black Mask</th>
//           <th className="p-2 text-left">Black Mask Amount</th>
//           <th className="p-2 text-left">Time of Service</th>
//         </tr>
//       </thead>
//       <tbody>
//         {services.map((service, index) => (
//           <tr key={service.id} className="border-b">
//             <td className="p-2">{index + 1}</td>
//             <td className="p-2">{service.name}</td>
//             <td className="p-2">{service.service_amount}</td>
//             <td className="p-2">{service.salon_amount}</td>
//             <td className="p-2">{service.barber}</td>
//             <td className="p-2">{service.barber_amount}</td>
//             <td className="p-2">{service.barber_assistant || "-"}</td>
//             <td className="p-2">{service.barber_assistant_amount}</td>
//             <td className="p-2">{service.scrubber_assistant || "-"}</td>
//             <td className="p-2">{service.scrubber_assistant_amount}</td>
//             <td className="p-2">{service.black_shampoo_assistant || "-"}</td>
//             <td className="p-2">{service.black_shampoo_amount}</td>
//             <td className="p-2">{service.super_black_assistant || "-"}</td>
//             <td className="p-2">{service.super_black_amount}</td>
//             <td className="p-2">{service.black_mask_assistant || "-"}</td>
//             <td className="p-2">{service.black_mask_amount}</td>
//             <td className="p-2">
//               {new Date(service.service_timestamp).toLocaleString()}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </section>
// </div>
//   );
// };

// export default IncomeDailyReport;




import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext.jsx";

const IncomeDailyReport = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const reportDate = today.toLocaleDateString("en-US", options);

  const { services, employees, advances, expenses, sessions } = useData();

  const session = sessions && sessions.length > 0 ? sessions[0] : null;
  const [liveDuration, setLiveDuration] = useState("");

  // Live duration calculation
  useEffect(() => {
    if (!session) return;

    const calculateDuration = () => {
      const open = new Date(session.open_time);
      const close = session.close_time ? new Date(session.close_time) : new Date();
      const diffMs = close - open;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    if (!session.close_time) {
      // Salon is open — update every second
      setLiveDuration(calculateDuration()); // initial call
      const interval = setInterval(() => {
        setLiveDuration(calculateDuration());
      }, 1000);
      return () => clearInterval(interval); // cleanup
    } else {
      // Salon is closed — static duration
      setLiveDuration(calculateDuration());
    }
  }, [session]);

  // Calculations
  const grossIncome = services.reduce((sum, s) => sum + (s.service_amount || 0), 0);

  if (!session) return <p>salon not open today yet</p>;

  return (
  <div className="w-full max-w-4xl mx-auto p-4 space-y-10 sm:overflow-x-hidden bg-color-red">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 ">
    {reportDate} Daily Income Report
  </h1>

  {/* Summary */}
  <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-full overflow-x-hidden">
    <h2 className="text-xl font-semibold text-blue-700 mb-2 text-sm">{reportDate}</h2>

    <p>
      <span className="font-medium">Opened:</span>{" "}
      {session ? new Date(session.open_time).toLocaleTimeString() : "N/A"}
    </p>
    <p>
      <span className="font-medium">Closed:</span>{" "}
      {session && session.close_time
        ? new Date(session.close_time).toLocaleTimeString()
        : "N/A"}
    </p>
    <p>
      <span className="font-medium">Duration:</span>{" "}
      {session ? liveDuration : "N/A"}{" "}
      {session && !session.close_time && " (Counting...)"}
    </p>
  </section>

  {/* Income Summary */} {/* <section className="bg-white shadow-md rounded-lg p-4 mb-6"> <h2 className="text-xl font-semibold text-blue-700 mb-4">Income Summary</h2> <p><span className="font-medium">Gross Income:</span> UGX {grossIncome}</p>
  <p><span className="font-medium">Expenses:</span> UGX {totalExpenses}</p>
  <p><span className="font-medium">Advances:</span> UGX {totalAdvances}</p> 
  <p><span className="font-medium">Salaries:</span> UGX {totalSalaries}</p> 
  <hr className="my-2" /> <p className="text-lg font-bold text-green-700"> <span className="font-medium">Net Income:</span> UGX {netIncome} </p> 
  </section> */} {/* Services Table */} {/* Services Table */} 
  <section className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-full overflow-x-hidden">
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