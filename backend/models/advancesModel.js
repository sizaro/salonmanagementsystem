import db from './database.js';

export const saveAdvance = async ({
  employee_name,
  amount,
  description
}) => {
  const query = `
    INSERT INTO advances (
      amount,
      description,
      created_at,
      employee_name
    ) VALUES ($1, $2,NOW(), $3)
  `;

  const values = [
    amount,
    description,
    employee_name,
  ];

  await db.query(query, values);
};

export const fetchAllAdvances = async () => {
  const query = `SELECT a.*, (a.created_at AT TIME ZONE 'Africa/Kampala') AS "created_at" FROM advances a 
  WHERE (a.created_at AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE;`;
  const result = await db.query(query);
  console.log("this is what the data from the database for all advances", result.rows)
  return result.rows
};