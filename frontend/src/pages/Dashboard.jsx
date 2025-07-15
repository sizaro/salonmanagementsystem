import { useState } from 'react';
import Modal from '../components/Modal';
import ServiceForm from '../components/ServiceForm';
import axios from 'axios';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleService = async (formData) => {
    try {
      await axios.post('/api/services', formData);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to submit service', err);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Service</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ServiceForm onSubmit={handleService} onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
}
