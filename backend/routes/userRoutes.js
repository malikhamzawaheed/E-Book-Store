const express = require('express');
const { registerUser, loginUser, logoutUser, checkAuth } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/checkAuth', checkAuth);

module.exports = router;