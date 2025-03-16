const express = require('express');
require('dotenv').config();
const database = require('./config/db.js');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

const app = express();
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} `);
});
