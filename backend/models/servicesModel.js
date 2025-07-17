import db from '../models/database.js'

export const saveService = async ({
  name,
  service_amount,
  barber,
  barber_amount,
  assistant,
  assistant_amount,
  salon_amount,
}) => {
  const query = `
    INSERT INTO services (
      service_name,
      amount,
      barber,
      barber_amount,
      barber_assistant,
      barber_assistant_amount,
      salon_amount
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const values = [
    name,
    service_amount,
    barber,
    barber_amount,
    assistant,
    assistant_amount,
    salon_amount,
  ];

  await db.query(query, values);
};
