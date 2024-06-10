const pool = require('../config/db');

exports.getProfile = async (req, res) => {
  const username = req.user.username;
  try {
    
    const [rows] = await pool.query('SELECT username,firstname,lastname,description,photo,email,age,birthday,country,password,isadmin FROM USER WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};