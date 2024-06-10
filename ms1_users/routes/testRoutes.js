const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/test-db-connection', async (req, res) => {
  try {
    console.log(pool.getConnection())
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connection successful', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

module.exports = router;
