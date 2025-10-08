import db from './database.js';

/**
 * Save a new expense record
 */
export const saveExpense = async ({ name, amount, description }) => {
  const query = `
    INSERT INTO expenses (
      name,
      amount,
      description,
      created_at
    )
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [name, amount, description];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Fetch all expenses created today (Uganda timezone)
 */
export const fetchAllExpenses = async () => {
  const query = `
    SELECT e.*, (e.created_at AT TIME ZONE 'Africa/Kampala') AS created_at
    FROM expenses e
    WHERE (e.created_at AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE ORDER BY id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
};

/**
 * Fetch a single expense by ID
 */
export const fetchExpenseById = async (id) => {
  const query = `
    SELECT e.*, (e.created_at AT TIME ZONE 'Africa/Kampala') AS created_at
    FROM expenses e
    WHERE e.id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

/**
 * Update an expense record by ID
 */
export const UpdateExpenseById = async ({ id, name, amount, description, created_at }) => {
  const query = `
    UPDATE expenses
    SET 
      name = $1,
      amount = $2,
      description= $3,
      created_at = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [name, amount, description, created_at, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Delete an expense by ID
 */
export const DeleteExpenseById = async (id) => {
  const query = `DELETE FROM expenses WHERE id = $1 RETURNING id;`;
  const result = await db.query(query, [id]);
  return result.rowCount > 0;
};

export default {
  saveExpense,
  fetchAllExpenses,
  fetchExpenseById,
  UpdateExpenseById,
  DeleteExpenseById
};
