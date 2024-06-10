const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username,firstname,lastname,description,photo,email,age,birthday,country,password } = req.body;


  const hashedPassword = await bcrypt.hash(password, 10);
  const currentDate = new Date(birthday);
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  try {
    
    const [result] = await pool.query(
      'INSERT INTO USER (username,firstname,lastname,description,photo,email,age,birthday,country,password,isadmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [username,firstname,lastname,description,photo,email,age,formattedDate,country,hashedPassword,0]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM USER WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id,username:username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};