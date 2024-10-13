const express = require('express');
const app = express();
const cors = require('cors');
const contestRoutes = require('./routes/contestRoutes');
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const bodyParser = require('body-parser');
const multer=require('multer');
const dbConnect = require('./config/database');

// app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.urlencoded());
const upload=multer();
app.use(upload.none());
app.use(cors());

dbConnect().then(() => console.log("Connected to MongoDB"));

app.use('/api/contests', contestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
