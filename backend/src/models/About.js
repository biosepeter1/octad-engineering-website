const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  companyInfo: {
    type: String,
    required: [true, 'Company information is required'],
    trim: true,
    maxlength: [3000, 'Company info cannot exceed 3000 characters']
  },
  mission: {
    type: String,
    required: [true, 'Mission statement is required'],
    trim: true,
    maxlength: [1000, 'Mission cannot exceed 1000 characters']
  },
  vision: {
    type: String,
    required: [true, 'Vision statement is required'],
    trim: true,
    maxlength: [1000, 'Vision cannot exceed 1000 characters']
  },
  values: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Value title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Value description cannot exceed 500 characters']
    }
  }],
  foundedYear: {
    type: Number,
    min: [1900, 'Founded year cannot be before 1900'],
    max: [new Date().getFullYear(), 'Founded year cannot be in the future']
  },
  employeeCount: {
    type: Number,
    min: [1, 'Employee count must be at least 1']
  },
  contactInfo: {
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    address: {
      street: {
        type: String,
        trim: true
      },
      city: {
        type: String,
        trim: true
      },
      state: {
        type: String,
        trim: true
      },
      zipCode: {
        type: String,
        trim: true
      },
      country: {
        type: String,
        trim: true,
        default: 'United States'
      }
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);