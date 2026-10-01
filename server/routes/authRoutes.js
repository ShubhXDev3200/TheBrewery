const express = require('express');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../config/upload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/me')
    .get(protect, getMe)
    .put(protect, upload.single('avatar'), updateProfile);

module.exports = router;
