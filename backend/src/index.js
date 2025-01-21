const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const homeRouter = require('./routes/homeRoutes');
app.use("/", homeRouter);

const authRoutes = require('./routes/authRoutes.js');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

const reviewRoutes = require("./routes/reviewRoutes.js");
app.use("/api/review", reviewRoutes);

const weddingCarRoutes = require("./routes/weddingcarRoutes.js");
app.use("/api/wedding-car", weddingCarRoutes);

module.exports = app;