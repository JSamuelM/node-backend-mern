const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// DB
dbConnection();

app.use(cors());

// public
app.use(express.static('public'));

// body parse
app.use(express.json());

// routes
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
