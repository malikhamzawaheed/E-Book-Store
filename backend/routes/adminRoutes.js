const express = require('express');
const { registerAdmin, loginAdmin, logoutAdmin, checkAdminAuth } = require('../controllers/AdminController');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/checkAuth', checkAdminAuth);

module.exports = router;