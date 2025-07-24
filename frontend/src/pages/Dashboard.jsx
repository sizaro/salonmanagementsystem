import { useState } from 'react';
import Modal from '../components/Modal';
import ServiceForm from '../components/ServiceForm';
import ExpenseForm from '../components/ExpenseForm';
import AdvanceForm from '../components/AdvanceForm';
import Button from '../components/Button';
import axios from 'axios';
import ClockForm from '../components/ClockForm';

export default function Dashboard() {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  const handleService = async (formData) => {
    try {
      await axios.post('http://localhost:5500/api/services', formData);
      closeModal();
    } catch (err) {
      console.error('Failed to submit service', err);
    }
  };

  const handleExpense = async (formData) => {
    try {
      await axios.post('http://localhost:5500/api/expenses', formData);
      closeModal();
    } catch (err) {
      console.error('Failed to submit expense', err);
    }
  };

  const handleAdvance = async (formData) => {
    try {
      await axios.post('http://localhost:5500/api/advances', formData);
      closeModal();
    } catch (err) {
      console.error('Failed to submit advance', err);
    }
  };

  const handleClocking = async (formData) => {
    try {
      await axios.post('http://localhost:5500/api/clocking', formData);
      closeModal();
    } catch (err) {
      console.error('Failed to submit advance', err);
    }
  };
  return (
    <div className="space-y-10">
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
