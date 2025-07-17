import { useState } from 'react';

const serviceMap = {
  '7000-service': { service_amount:7000, salon_amount: 4000, barber_amount: 2000, assistant_amount: 1000 },
  '5000-service': { service_amount:5000, salon_amount: 3000, barber_amount: 2000, assistant_amount: 0 },
  'child-service': { service_amount:3000, salon_amount: 2000, barber_amount: 1000, assistant_amount: 0 },
};

export default function ServiceForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    service: '',
    barber: '',
    assistant: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { service, barber, assistant } = formData;
    const calculation = serviceMap[service];
    if (!calculation) return alert('Invalid service selected');

    const payload = {
      name: service,
      service_amount: calculation.service_amount,
      barber,
      barber_amount: calculation.barber_amount,
      assistant: calculation.assistant_amount > 0 ? assistant : null,
      assistant_amount: calculation.assistant_amount > 0 ? calculation.assistant_amount : null,
      salon_amount: calculation.salon_amount,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select name="service" value={formData.service} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="">Select Service</option>
        <option value="7000-service">7000 Service</option>
        <option value="5000-service">5000 Service</option>
        <option value="child-service">Child Service</option>
      </select>

      <select name="barber" value={formData.barber} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="">Select Barber</option>
        <option value="John">John</option>
        <option value="Jane">Jane</option>
      </select>

      <select
        name="assistant"
        value={formData.assistant}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        disabled={formData.service === '5000-service' || formData.service === 'child-service'}
      >
        <option value="">Select Assistant</option>
        <option value="Kelly">Kelly</option>
        <option value="Sam">Sam</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
