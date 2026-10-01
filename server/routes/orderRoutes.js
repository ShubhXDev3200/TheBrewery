const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getUserOrders);

module.exports = router;
