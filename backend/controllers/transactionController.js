const pool = require('../models/db');

exports.addTransaction = async (req, res) => {
  const { customer, service, amount, employee } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO transactions (customer, service, amount, employee, date) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *',
      [customer, service, amount, employee]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch transactions' });
  }
};
