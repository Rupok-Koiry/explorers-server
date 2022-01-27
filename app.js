require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db/database');
const travelRoutes = require('./routes/travel');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/blog', travelRoutes);
app.use('/users', usersRoutes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API endpoint not found. Please check your URL.',
  });
});
db.connectToDatabase().then(function () {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🏃‍♂️`);
  });
});
