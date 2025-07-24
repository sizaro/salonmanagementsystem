import db from './database.js'

export const saveExpense = async ({
  name,
  amount
}) => {
  const query = `
    INSERT INTO expenses (
      expense_name,
      amount
    ) VALUES ($1, $2)
  `;

  const values = [
    name,
    amount
  ];

  await db.query(query, values);
};
