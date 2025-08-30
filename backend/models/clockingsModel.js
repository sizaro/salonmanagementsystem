import db from './database.js';

// Create (clock in)
export const saveClocking = async (
  employeeId,
  clockIn,
  clockOut) => {
  const query = `
    INSERT INTO employee_clocking (
      employee_id,
      clock_in,
      clock_out
    ) VALUES ($1, $2, $3)
  `;

  const values = [
    employeeId,
    clockIn,
    clockOut
  ];

  await db.query(query, values);
};

// Update (clock out)
export const updateClockingModel = async (employeeId, clockOut) => {
  const query = `
    UPDATE employee_clocking
    SET clock_out = $1, updated_at = NOW()
    WHERE employee_id = $2
      AND clock_out IS NULL
    RETURNING *
  `;

  const values = [clockOut, employeeId];

  const { rows } = await db.query(query, values);
  return rows[0]; // returns the updated clocking row
};

