import db from './database.js';

export const saveAdvance = async ({
  employee_id,
  amount,
  description
}) => {
  const query = `
    INSERT INTO advances (
      employee_id,
      amount,
      description
    ) VALUES ($1, $2, $3)
  `;

  const values = [
    employee_id,
    amount,
    description
  ];

  await db.query(query, values);
};
