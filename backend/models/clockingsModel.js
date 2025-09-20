import db from './database.js';

// Create (clock in)
export const saveClocking = async (
  employeeName) => {
  const query = `
    INSERT INTO employee_clocking (
      employee_names,
      clock_in,
      clock_out,
      created_at,
      updated_at
    ) VALUES ($1, NOW(), NULL, NOW(), NULL)
  `;

  const values = [
    employeeName
  ];

  await db.query(query, values);
};

// Update (clock out)
export const updateClockingModel = async (employeeName) => {
  const query = `
    UPDATE employee_clocking
    SET clock_out = NOW(), updated_at = NOW()
    WHERE employee_names = $1
      AND clock_out IS NULL
    RETURNING *
  `;

  const values = [employeeName];

  const { rows } = await db.query(query, values);
  return rows[0]; // returns the updated clocking row
};

export const fetchAllClockings = async () => {
  const query = `SELECT * FROM employee_clocking;`;
  const result = await db.query(query);
  console.log("this is what the data from the database for all clockings", result.rows)
  return result.rows
};
