const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route files
const auth = require('./routes/authRoutes');
const menu = require('./routes/menuRoutes');
const reviews = require('./routes/reviewRoutes');
const cart = require('./routes/cartRoutes');
const orders = require('./routes/orderRoutes');
const payment = require('./routes/paymentRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/menu', menu);
app.use('/api/reviews', reviews);
app.use('/api/cart', cart);
app.use('/api/orders', orders);
app.use('/api/payment', payment);

// Basic Route
app.get('/', (req, res) => {
    res.send('The Brewery API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
