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
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
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