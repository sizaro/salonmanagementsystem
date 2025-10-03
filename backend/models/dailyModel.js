// models/dailyModel.js
import db from './database.js';

// Query services for a single day
async function getServicesByDay(startOfDay, endOfDay) {
  return db.query(
    "SELECT * FROM services WHERE service_timestamp BETWEEN $1 AND $2",
    [startOfDay, endOfDay]
  );
}

// Query expenses for a single day
async function getExpensesByDay(startOfDay, endOfDay) {
  return db.query(
    "SELECT * FROM expenses WHERE created_at BETWEEN $1 AND $2",
    [startOfDay, endOfDay]
  );
}

// Query salary advances for a single day
async function getAdvancesByDay(startOfDay, endOfDay) {
  return db.query(
    "SELECT * FROM advances WHERE created_at BETWEEN $1 AND $2",
    [startOfDay, endOfDay]
  );
}

export default {
  getServicesByDay,
  getExpensesByDay,
  getAdvancesByDay
};
