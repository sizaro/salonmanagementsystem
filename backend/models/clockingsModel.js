import db from './database.js';
// Create (clock in)
export const saveClocking = async (employee_id) => {
  const query = `
    INSERT INTO employee_clocking (employee_id, clock_in, clock_out, created_at, updated_at)
    SELECT $1, NOW(), NULL, NOW(), NULL
    WHERE NOT EXISTS (
      SELECT 1 FROM employee_clocking
      WHERE employee_id = $1 AND clock_out IS NULL
    )
    RETURNING *;
  `;

  const values = [employee_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Update (clock out)
export const updateClockingModel = async (employee_id) => {
  const query = `
    UPDATE employee_clocking
    SET clock_out = NOW(), updated_at = NOW()
    WHERE employee_id = $1
      AND clock_out IS NULL
    RETURNING *;
  `;

  const values = [employee_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};


export const fetchAllClockings = async () => {
  const query = `SELECT * FROM employee_clocking;`;
  const result = await db.query(query);
  console.log("this is what the data from the database for all clockings", result.rows)
  return result.rows
};
