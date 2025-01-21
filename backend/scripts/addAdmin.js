const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const addAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'abc@abc.com';
    const password = 'abc';

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      console.log('Admin already exists');
      mongoose.connection.close();
      return;
    }

    const admin = new Admin({
      email,
      password,
    });

    await admin.save();
    console.log('Admin user created');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding admin user:', error);
    mongoose.connection.close();
  }
};

addAdmin();