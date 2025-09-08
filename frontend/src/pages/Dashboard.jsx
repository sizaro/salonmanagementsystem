import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ServiceForm from "../components/ServiceForm";
import ExpenseForm from "../components/ExpenseForm";
import AdvanceForm from "../components/AdvanceForm";
import Button from "../components/Button";
import ClockForm from "../components/ClockForm";
import { useData } from "../context/DataContext.jsx";

export default function Dashboard() {
  const [modalType, setModalType] = useState(null);
  const [salonStatus, setSalonStatus] = useState("closed");

  const { sendFormData, sessions } = useData();

  const handleSalonSession = async (status) => {
    try {
      let formData;

      if (status === "open") {
        formData = {
          openTime: new Date().toISOString(),
          closeTime: null,
          status: "open",
        };

        const res = await sendFormData("openSalon", formData); // ✅ use context
        console.log("Salon opened:", res.data);
        setSalonStatus(status);
      } else if (status === "closed") {
        formData = {
          closeTime: new Date().toISOString(),
          status: "closed",
        };

        const res = await sendFormData("closeSalon", formData); // ✅ use context
        console.log("Salon closed:", res.data);
        setSalonStatus(status);
      }
    } catch (err) {
      console.error("Error handling salon session:", err.response?.data || err.message);
    }
  };

  const closeModal = () => setModalType(null);

  const handleService = async (formData) => {
    try {
      await sendFormData("createService", formData); // ✅ use context
      closeModal();
    } catch (err) {
      console.error("Failed to submit service", err);
    }
  };

  const handleExpense = async (formData) => {
    try {
      await sendFormData("createExpense", formData); // ✅ you might need to add case in DataContext
      closeModal();
    } catch (err) {
      console.error("Failed to submit expense", err);
    }
  };

  const handleAdvance = async (formData) => {
    try {
      await sendFormData("createAdvance", formData); // ✅ use context
      closeModal();
    } catch (err) {
      console.error("Failed to submit advance", err);
    }
  };

  const handleClocking = async (type, formData) => {
    try {
      if (type === "clockin") {
        const res = await sendFormData("createClocking", formData); // ✅ use context
        console.log("Clock in success:", res.data);
      } else if (type === "clockout") {
        const res = await sendFormData("updateClocking", formData); // ✅ add this case in DataContext
        console.log("Clock out success:", res.data);
      } else {
        console.error("Invalid clocking type");
      }
    } catch (err) {
      console.error("Error handling clocking:", err.response?.data || err.message);
    }
  };


 useEffect(() => {
    const fetchStatus = async () => {
      if (sessions && sessions.length > 0) {
        const todaySession = sessions[0];
        console.log("Fetched salon status:", todaySession.status);
        setSalonStatus(todaySession.status);
      } else {
        setSalonStatus("closed");
      }
    };

    fetchStatus();
  }, [sessions]); 

  return (
    <div className="space-y-10">
      <div className="space-y-10">
      {salonStatus === "closed" && (
        <Button className='bg-green-400 hover:bg-green-300' onClick={() => handleSalonSession("open")}>Open Salon</Button>
      )}
      {salonStatus === "open" && (
        <Button onClick={() => handleSalonSession("closed")}>Close Salon</Button>
      )}
    </div>
      <Button onClick={() => setModalType('service')}>Add Service</Button>
      <Button onClick={() => setModalType('expense')}>Add Expense</Button>
      <Button onClick={() => setModalType('advance')}>Add Advance</Button>
      <Button onClick={() => setModalType('clocking')}>Employee Clocking</Button>

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'service' && <ServiceForm onSubmit={handleService} onClose={closeModal} />}
        {modalType === 'expense' && <ExpenseForm onSubmit={handleExpense} onClose={closeModal} />}
        {modalType === 'advance' && <AdvanceForm onSubmit={handleAdvance} onClose={closeModal} />}
        {modalType === 'clocking' && <ClockForm onSubmit={handleClocking} onClose={closeModal} />}
      </Modal>
    </div>
  );
}
