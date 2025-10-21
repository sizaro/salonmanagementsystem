import db from './database.js';

/**
 * Save a new late fee record
 */
export const saveLateFee = async ({ employee_id, amount, reason }) => {
  const query = `
    INSERT INTO late_fees (
      employee_id,
      amount,
      reason,
      created_at
    )
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [employee_id, amount, reason];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Fetch all late fees created today (Uganda timezone)
 */
export const fetchAllLateFees = async () => {
  const query = `
    SELECT l.*, (l.created_at AT TIME ZONE 'Africa/Kampala') AS created_at
    FROM late_fees l
    WHERE (l.created_at AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE
    ORDER BY id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
};

/**
 * Fetch a single late fee by ID
 */
export const fetchLateFeeById = async (id) => {
  const query = `
    SELECT l.*, (l.created_at AT TIME ZONE 'Africa/Kampala') AS created_at
    FROM late_fees l
    WHERE l.id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

/**
 * Update a late fee record by ID
 */
export const UpdateLateFeeById = async ({ id, employee_id, amount, reason, created_at }) => {
  const query = `
    UPDATE late_fees
    SET 
      employee_id = $1,
      amount = $2,
      reason = $3,
      created_at = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [employee_id, amount, reason, created_at, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Delete a late fee by ID
 */
export const DeleteLateFeeById = async (id) => {
  const query = `DELETE FROM late_fees WHERE id = $1 RETURNING id;`;
  const result = await db.query(query, [id]);
  return result.rowCount > 0;
};

export default {
  saveLateFee,
  fetchAllLateFees,
  fetchLateFeeById,
  UpdateLateFeeById,
  DeleteLateFeeById
};
