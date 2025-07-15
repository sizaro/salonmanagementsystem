import { useState } from 'react';

const serviceMap = {
  '7000-service': { salon: 4000, barber: 2000, assistant: 1000 },
  '5000-service': { salon: 3000, barber: 2000, assistant: 0 },
  'child-service': { salon: 2000, barber: 1000, assistant: 0 },
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
      barber,
      assistant: calculation.assistant > 0 ? assistant : null,
      barber_amount: calculation.barber,
      assistant_amount: calculation.assistant > 0 ? calculation.assistant : null,
      salon_amount: calculation.salon,
    };

    try {
      await onSubmit(payload); // delegate actual submission to parent
      onClose(); // close modal only if successful
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
