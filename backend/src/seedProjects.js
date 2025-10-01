const mongoose = require('mongoose');
require('dotenv').config();

// Import the Project model
const Project = require('./models/Project');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Sample projects data (matching the frontend defaults plus additional projects)
const sampleProjects = [
  {
    title: 'Lagos Luxury Villa Complex',
    description: 'An exquisite 5-bedroom luxury villa complex in Victoria Island featuring contemporary Nigerian architecture, smart home systems, infinity pool, and eco-friendly technologies. The project showcases modern luxury living with traditional cultural elements.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Lagos Luxury Villa Complex - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Lagos Luxury Villa Complex - Side View',
        isPrimary: false
      }
    ],
    status: 'completed',
    category: 'Residential',
    location: 'Victoria Island, Lagos',
    client: 'Chief Adebayo Ogundimu',
    startDate: new Date('2022-08-15'),
    endDate: new Date('2023-10-30'),
    isFeature: true,
    order: 1
  },
  {
    title: 'Abuja Tech Hub Complex',
    description: 'A state-of-the-art 12-story technology innovation center in the heart of Abuja. Features flexible co-working spaces, conference facilities, rooftop gardens, and cutting-edge infrastructure designed to foster Nigeria\'s growing tech ecosystem.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Exterior',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Interior',
        isPrimary: false
      }
    ],
    status: 'completed',
    category: 'Commercial',
    location: 'Central Business District, Abuja',
    client: 'Nigerian Tech Innovation Center',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2023-03-15'),
    isFeature: true,
    order: 2
  },
  {
    title: 'Port Harcourt Heritage Restoration',
    description: 'Complete restoration of a historic colonial-era government building, preserving architectural heritage while modernizing for contemporary use. Includes structural reinforcement, climate control, and period-accurate restoration work.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Restored Facade',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Interior',
        isPrimary: false
      }
    ],
    status: 'completed',
    category: 'Renovation',
    location: 'Old GRA, Port Harcourt',
    client: 'Rivers State Government',
    startDate: new Date('2022-01-10'),
    endDate: new Date('2022-11-25'),
    isFeature: true,
    order: 3
  },
  {
    title: 'Kano Industrial Manufacturing Complex',
    description: 'A comprehensive 15,000 sqm industrial facility designed for textile manufacturing. Features include modern production lines, worker amenities, environmental compliance systems, and logistics infrastructure.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1565515636369-8bed5985c2ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Main Factory',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Production Floor',
        isPrimary: false
      }
    ],
    status: 'completed',
    category: 'Industrial',
    location: 'Bompai Industrial Area, Kano',
    client: 'Northern Manufacturing Ltd.',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2023-01-30'),
    isFeature: false,
    order: 4
  },
  {
    title: 'Ibadan Shopping Mall Expansion',
    description: 'Major expansion and renovation of existing shopping center, adding 30,000 sqft of retail space, modern food court, multi-level parking, and upgraded infrastructure including elevators and HVAC systems.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Ibadan Shopping Mall - New Wing',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Ibadan Shopping Mall - Food Court',
        isPrimary: false
      }
    ],
    status: 'completed',
    category: 'Commercial',
    location: 'Ring Road, Ibadan',
    client: 'Oyo Mall Properties',
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-09-30'),
    isFeature: false,
    order: 5
  },
  {
    title: 'Enugu Residential Estate Phase 1',
    description: 'Development of 50-unit residential estate featuring 3 and 4-bedroom detached houses with modern amenities, landscaped gardens, 24/7 security, and community facilities including playground and clubhouse.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Enugu Residential Estate - Model Home',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Enugu Residential Estate - Community Area',
        isPrimary: false
      }
    ],
    status: 'in-progress',
    category: 'Residential',
    location: 'Independence Layout, Enugu',
    client: 'Coal City Developers',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2024-05-30'),
    isFeature: false,
    order: 6
  },
  {
    title: 'Calabar Hotel & Conference Center',
    description: 'Construction of a 4-star hotel and conference facility featuring 120 rooms, multiple conference halls, restaurant, spa, swimming pool, and event spaces designed to boost tourism in Cross River State.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Calabar Hotel - Main Building',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Calabar Hotel - Conference Hall',
        isPrimary: false
      }
    ],
    status: 'in-progress',
    category: 'Hospitality',
    location: 'Calabar Municipality, Cross River',
    client: 'Cross River Tourism Board',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-12-15'),
    isFeature: false,
    order: 7
  },
  {
    title: 'Warri Industrial Park Infrastructure',
    description: 'Development of essential infrastructure for new industrial park including roads, drainage systems, power distribution, water supply, and telecommunications. Designed to attract manufacturing investments to Delta State.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Warri Industrial Park - Infrastructure',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1581092582244-5c796bb05ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Warri Industrial Park - Road Network',
        isPrimary: false
      }
    ],
    status: 'planning',
    category: 'Infrastructure',
    location: 'Warri, Delta State',
    client: 'Delta State Government',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-10-30'),
    isFeature: false,
    order: 8
  }
];

// Seed function
const seedProjects = async () => {
  try {
    console.log('🌱 Starting to seed projects...');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');
    
    // Create new projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} projects:`);
    
    createdProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.category}) - ${project.status}`);
    });
    
    console.log('\n🎉 Projects seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    console.error('Error details:', error.message);
    
    // If it's a validation error, show more details
    if (error.name === 'ValidationError') {
      console.error('Validation errors:');
      Object.values(error.errors).forEach((err) => {
        console.error(`  - ${err.path}: ${err.message}`);
      });
    }
    
    process.exit(1);
  }
};

// Main function
const main = async () => {
  console.log('🚀 Projects Database Seeder');
  console.log('============================\n');
  
  try {
    await connectDB();
    await seedProjects();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Database disconnected');
    process.exit(0);
  }
};

// Run the seeder
main();