import db from '../models/database.js'

export const fetchAllEmployees = async () => {
  const query = `SELECT e.*,(e.created_at AT TIME ZONE 'UTC') AS "employee time" FROM employees e;`;  
  const result = await db.query(query);
  console.log("this is what the data from the database for all employees", result.rows)
  return result.rows
};