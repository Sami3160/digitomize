const express = require('express');
const app = express();
const cors = require('cors');
// Import routes
const contestRoutes = require('./routes/contestRoutes');
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use('/api/contests', contestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
