const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/giftcardRoutes');
const responseTimeLogger = require('./middlewares/timerLoggerMiddleware');
require('dotenv').config();

app.use(express.json());

app.use(responseTimeLogger);

app.use('/api/auth', authRoutes);
productRoutes(app);

const cors = require('cors');
app.use(cors());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


module.exports = app;
