// models/monthlyModel.js
import db from './database.js';

// Query services for a month (by date range)
async function getServicesByMonth(startDate, endDate) {
  return db.query(
    "SELECT * FROM services WHERE service_timestamp BETWEEN $1 AND $2",
    [startDate, endDate]
  );
}

// Query expenses for a month
async function getExpensesByMonth(startDate, endDate) {
  return db.query(
    "SELECT * FROM expenses WHERE created_at BETWEEN $1 AND $2",
    [startDate, endDate]
  );
}

// Query salary advances for a month
async function getAdvancesByMonth(startDate, endDate) {
  return db.query(
    "SELECT * FROM advances WHERE created_at BETWEEN $1 AND $2",
    [startDate, endDate]
  );
}

export default {
  getServicesByMonth,
  getExpensesByMonth,
  getAdvancesByMonth
};
