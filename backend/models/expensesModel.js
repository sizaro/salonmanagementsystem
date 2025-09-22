import db from './database.js'

export const saveExpense = async ({
  name,
  amount
}) => {
  const query = `
    INSERT INTO expenses (
      name,
      amount
    ) VALUES ($1, $2)
  `;

  const values = [
    name,
    amount
  ];

  await db.query(query, values);
};


export const fetchAllExpenses = async () => {
  const query = `SELECT e.*, (e.created_at AT TIME ZONE 'Africa/Kampala') AS "created_at" FROM expenses e
  WHERE (e.created_at AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE;`;
  const result = await db.query(query);
  console.log("this is what the data from the database for all expenses", result.rows)
  return result.rows
};