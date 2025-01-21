const express = require('express');
const { placeOrder, getAllOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/all', adminProtect, getAllOrders);

module.exports = router;