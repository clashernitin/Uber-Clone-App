const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');



connectToDb();

app.use(cors());
app.use(cookieParser());    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;