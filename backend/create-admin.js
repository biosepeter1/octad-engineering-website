const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/construction-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    console.log('🔍 Checking for existing admin user...');
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('📋 Admin details:');
      console.log('   Username:', existingAdmin.username);
      console.log('   Role:', existingAdmin.role);
      console.log('   Created:', existingAdmin.createdAt);
      console.log('');
      console.log('🔐 You can login with:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      process.exit(0);
    }

    // Create admin user (password will be auto-hashed by pre-save hook)
    const adminUser = new User({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('');
    console.log('⚠️  Please change the default password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

createAdminUser();