const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.route('/:itemId')
    .put(protect, updateCartItem)
    .delete(protect, removeFromCart);

module.exports = router;
