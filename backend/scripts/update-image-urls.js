const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/construction-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  status: String,
  category: String,
  location: String,
  client: String,
  startDate: Date,
  endDate: Date,
  isFeature: Boolean,
  order: Number
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

async function updateImageUrls() {
  try {
    console.log('🔍 Looking for projects with localhost URLs...');
    
    // Find all projects that have localhost URLs in their images
    const projects = await Project.find({
      'images.url': { $regex: /localhost:5000/ }
    });

    console.log(`📊 Found ${projects.length} projects with localhost URLs`);

    if (projects.length === 0) {
      console.log('✅ No projects need URL updates!');
      return;
    }

    // Get the production backend URL from environment
    const productionUrl = process.env.NODE_ENV === 'production' 
      ? 'https://octad-engineering-website-2.onrender.com'
      : 'http://localhost:5000';

    let updatedCount = 0;

    for (const project of projects) {
      let hasUpdates = false;

      // Update each image URL
      const updatedImages = project.images.map(img => {
        if (img.url && (img.url.includes('localhost:5000') || img.url.includes('http://localhost:5000'))) {
          hasUpdates = true;
          const newUrl = img.url
            .replace('http://localhost:5000', productionUrl)
            .replace('localhost:5000', productionUrl);
          
          console.log(`🔄 Updating image URL:`);
          console.log(`   FROM: ${img.url}`);
          console.log(`   TO:   ${newUrl}`);
          
          return { ...img.toObject(), url: newUrl };
        }
        return img;
      });

      if (hasUpdates) {
        project.images = updatedImages;
        await project.save();
        updatedCount++;
        console.log(`✅ Updated project: ${project.title}`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} projects!`);
    console.log(`🔗 All image URLs now point to: ${productionUrl}`);
    
  } catch (error) {
    console.error('❌ Error updating image URLs:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

// Run the update
console.log('🚀 Starting image URL update process...');
console.log(`📍 Target backend URL: ${process.env.NODE_ENV === 'production' ? 'https://octad-engineering-website-2.onrender.com' : 'http://localhost:5000'}`);
console.log('');

updateImageUrls();