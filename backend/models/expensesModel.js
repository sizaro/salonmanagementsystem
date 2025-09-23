import db from './database.js'

export const saveExpense = async ({
  name,
  amount
}) => {
  const query = `
    INSERT INTO expenses (
      name,
      amount,
      created_at
    ) VALUES ($1, $2, NOW())
  `;

  const values = [
    name,
    amount
  ];

  await db.query(query, values);
};


export const fetchAllExpenses = async () => {
  const query = `SELECT e.*, (e.created_at AT TIME ZONE 'UTC') AS "created_at" FROM expenses e
  WHERE (e.created_at AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE;`;
  const result = await db.query(query);
  console.log("this is what the data from the database for all expenses", result.rows)
  return result.rows
};