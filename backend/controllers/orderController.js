const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const order = new Order({
      userId: req.session.user._id,
      items,
      totalAmount,
      orderDate: new Date(),
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { placeOrder, getAllOrders };