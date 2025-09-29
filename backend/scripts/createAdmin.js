const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema (simplified version)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to MongoDB (no deprecated options needed)
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully!');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { username: 'admin' },
        { email: 'admin@octadengineering.com' },
        { role: 'admin' }
      ]
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   You can use these credentials to log in.');
      
      // Update password if needed
      const newPassword = 'Admin123!';
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      await User.findByIdAndUpdate(existingAdmin._id, {
        password: hashedPassword,
        isActive: true
      });
      
      console.log('🔐 Password has been reset to: Admin123!');
      
    } else {
      // Create new admin user
      console.log('🔄 Creating new admin user...');
      
      const adminPassword = 'Admin123!';
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      const adminUser = new User({
        username: 'admin',
        email: 'admin@octadengineering.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });

      await adminUser.save();
      
      console.log('🎉 Admin user created successfully!');
      console.log('📋 Login Credentials:');
      console.log('   Username: admin');
      console.log('   Email: admin@octadengineering.com');
      console.log('   Password: Admin123!');
    }
    
    console.log('\n🌐 MongoDB Atlas IP Whitelist:');
    console.log('   Your current IP: 105.112.176.39');
    console.log('   Make sure to add this IP to your Atlas cluster whitelist:');
    console.log('   https://cloud.mongodb.com/v2/[PROJECT_ID]#/security/network/accessList');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Add IP 105.112.176.39 to MongoDB Atlas whitelist');
    console.log('   2. Start your backend server: npm run dev');
    console.log('   3. Visit: http://localhost:3000/admin/login');
    console.log('   4. Use the credentials shown above to log in');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔧 Database Connection Issue:');
      console.log('   - Check your MongoDB Atlas credentials');
      console.log('   - Verify your database user has proper permissions');
    }
    
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('\n🌐 IP Whitelist Issue:');
      console.log('   - Add your IP (105.112.176.39) to MongoDB Atlas');
      console.log('   - Or allow access from anywhere (0.0.0.0/0) for development');
    }
    
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed.');
    process.exit(0);
  }
}

createAdminUser();