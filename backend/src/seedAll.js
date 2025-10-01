const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const SuccessStory = require('./models/SuccessStory');

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

// Sample projects data
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

// Sample success stories data
const sampleStories = [
  {
    title: 'Lagos Luxury Villa Complex',
    client: 'Chief Adebayo Ogundimu',
    location: 'Victoria Island, Lagos',
    category: 'Residential',
    duration: '14 months',
    budget: '₦450 Million',
    completionYear: 2023,
    description: 'A stunning 8-bedroom luxury villa with modern Nigerian architectural elements, featuring smart home integration, swimming pool, and eco-friendly systems.',
    challenge: 'Building a world-class luxury home in Lagos\' challenging coastal environment while incorporating traditional Nigerian design elements and modern sustainability features.',
    solution: 'We utilized climate-resistant materials, implemented advanced foundation systems for coastal conditions, and seamlessly blended contemporary design with traditional Yoruba architectural motifs.',
    result: 'Delivered a breathtaking villa that became a landmark in Victoria Island, featuring 98% energy efficiency, zero structural issues after 2 years, and winning the 2023 Nigerian Architecture Excellence Award.',
    testimonial: {
      quote: 'Octad Engineering transformed my vision into reality. Their attention to Nigerian cultural details while maintaining international standards is unmatched. This is not just a house, it\'s a masterpiece.',
      author: 'Chief Adebayo Ogundimu',
      position: 'Chairman, Ogundimu Holdings',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Modern Luxury Villa - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Modern Luxury Villa - Side View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Project Value', value: '₦450M', icon: '💰' },
      { label: 'Completion Time', value: '14 Months', icon: '⏱️' },
      { label: 'Client Satisfaction', value: '100%', icon: '❤️' }
    ],
    isFeatured: true,
    isActive: true,
    order: 1
  },
  {
    title: 'Abuja Tech Hub Complex',
    client: 'Nigerian Tech Innovation Center',
    location: 'Central Business District, Abuja',
    category: 'Commercial',
    duration: '18 months',
    budget: '₦1.2 Billion',
    completionYear: 2023,
    description: 'A state-of-the-art 12-story tech innovation center designed to foster Nigeria\'s growing technology ecosystem, featuring flexible workspaces, conference facilities, and cutting-edge infrastructure.',
    challenge: 'Creating Nigeria\'s most advanced technology hub while meeting strict government regulations and incorporating sustainable design for Abuja\'s climate.',
    solution: 'We implemented smart building technologies, designed flexible modular spaces, incorporated solar power systems, and ensured compliance with all FCT development guidelines.',
    result: 'Successfully delivered Nigeria\'s premier tech hub, now home to 200+ startups, achieving LEED Gold certification, and becoming the model for future innovation centers across Africa.',
    testimonial: {
      quote: 'Octad Engineering didn\'t just build our vision - they enhanced it. This facility has become the heartbeat of Nigeria\'s tech revolution. Their expertise in commercial construction is world-class.',
      author: 'Dr. Amina Hassan',
      position: 'Director, Nigerian Tech Innovation Center',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Project Value', value: '₦1.2B', icon: '💰' },
      { label: 'Floors Built', value: '12 Stories', icon: '🏢' },
      { label: 'Jobs Created', value: '500+', icon: '👥' }
    ],
    isFeatured: false,
    isActive: true,
    order: 2
  },
  {
    title: 'Port Harcourt Heritage Restoration',
    client: 'Rivers State Government',
    location: 'Old GRA, Port Harcourt',
    category: 'Renovation',
    duration: '10 months',
    budget: '₦280 Million',
    completionYear: 2022,
    description: 'Restoration of a historic colonial-era government building, preserving its architectural heritage while modernizing it for contemporary government use.',
    challenge: 'Preserving the historical integrity of a 90-year-old colonial structure while upgrading it to modern standards and making it climate-resilient for the Niger Delta environment.',
    solution: 'We employed specialized heritage restoration techniques, sourced period-appropriate materials, and carefully integrated modern systems without compromising the building\'s historical character.',
    result: 'Successfully restored a piece of Nigerian history, extended the building\'s life by 50+ years, won the National Heritage Preservation Award, and created a model for future restoration projects.',
    testimonial: {
      quote: 'Octad Engineering brought our heritage back to life. Their respect for history combined with modern engineering excellence preserved this treasure for future generations.',
      author: 'Hon. Barr. Ezenwo Nyesom Wike',
      position: 'Former Governor, Rivers State',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Restored View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Heritage Value', value: '90 Years', icon: '⏱️' },
      { label: 'Restoration Cost', value: '₦280M', icon: '💰' },
      { label: 'Awards Won', value: '3 Major', icon: '🏆' }
    ],
    isFeatured: false,
    isActive: true,
    order: 3
  },
  {
    title: 'Kano Industrial Complex',
    client: 'Northern Manufacturing Ltd.',
    location: 'Bompai Industrial Area, Kano',
    category: 'Industrial',
    duration: '12 months',
    budget: '₦800 Million',
    completionYear: 2022,
    description: 'A comprehensive industrial manufacturing facility designed for textile production, featuring modern machinery integration, worker amenities, and environmental compliance systems.',
    challenge: 'Building a large-scale industrial facility in Kano\'s challenging climate while ensuring worker comfort, environmental compliance, and integration with local infrastructure.',
    solution: 'We designed climate-optimized structures, implemented advanced ventilation systems, created worker-friendly amenities, and ensured full compliance with Nigerian environmental regulations.',
    result: 'Delivered a world-class manufacturing facility that boosted local employment by 300%, achieved zero environmental violations, and became the template for industrial development in Northern Nigeria.',
    testimonial: {
      quote: 'Octad Engineering understood our industrial needs perfectly. They built more than a factory - they built the foundation for Northern Nigeria\'s manufacturing renaissance.',
      author: 'Alhaji Musa Abdullahi',
      position: 'Chairman, Northern Manufacturing Ltd.',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1565515636369-8bed5985c2ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Factory Size', value: '15,000 sqm', icon: '🏢' },
      { label: 'Jobs Created', value: '300+', icon: '👥' },
      { label: 'Production Capacity', value: '1M units/month', icon: '🔧' }
    ],
    isFeatured: false,
    isActive: true,
    order: 4
  }
];

// Seed function
const seedAll = async () => {
  try {
    console.log('🌱 Starting to seed all data...\n');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await SuccessStory.deleteMany({});
    console.log('✅ Existing data cleared\n');
    
    // Seed projects
    console.log('📁 Seeding projects...');
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} projects:`);
    createdProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.category}) - ${project.status}`);
    });
    
    // Seed success stories
    console.log('\n📖 Seeding success stories...');
    const createdStories = await SuccessStory.insertMany(sampleStories);
    console.log(`✅ Created ${createdStories.length} success stories:`);
    createdStories.forEach((story, index) => {
      console.log(`   ${index + 1}. ${story.title} (${story.category})`);
    });
    
    console.log('\n🎉 All data seeded successfully!');
    console.log(`📊 Total projects: ${createdProjects.length}`);
    console.log(`📊 Total success stories: ${createdStories.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
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
  console.log('🚀 Complete Database Seeder');
  console.log('============================\n');
  
  try {
    await connectDB();
    await seedAll();
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