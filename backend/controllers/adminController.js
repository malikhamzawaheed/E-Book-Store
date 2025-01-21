const Admin = require('../models/Admin');

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      email,
      password,
    });

    const createdAdmin = await admin.save();
    res.status(201).json(createdAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register admin' });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password !== admin.password) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.admin = admin;
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error during admin login:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

const checkAdminAuth = (req, res) => {
  if (req.session && req.session.admin) {
    res.json({ isAuthenticated: true });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin, checkAdminAuth };