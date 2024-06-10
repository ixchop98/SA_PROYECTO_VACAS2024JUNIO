const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes'); // Nueva ruta de prueba


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/test', testRoutes); // Nueva ruta de prueba

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});