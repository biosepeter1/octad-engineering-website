const About = require('../models/About');
const { clearCache } = require('../middleware/cache');

// Get about information (public)
const getAbout = async (req, res) => {
  try {
    // Get the first (and should be only) about document
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create or update about information (admin only)
const updateAbout = async (req, res) => {
  try {
    const aboutData = req.body;

    // Try to find existing about document
    let about = await About.findOne();

    if (about) {
      // Update existing document
      about = await About.findByIdAndUpdate(
        about._id,
        aboutData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new document
      about = new About(aboutData);
      await about.save();
    }

    clearCache('about');

    res.json({
      success: true,
      message: 'About information updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update about information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get about stats (admin dashboard)
const getAboutStats = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.json({
        success: true,
        data: {
          hasAboutInfo: false,
          lastUpdated: null
        }
      });
    }

    res.json({
      success: true,
      data: {
        hasAboutInfo: true,
        lastUpdated: about.updatedAt,
        foundedYear: about.foundedYear,
        employeeCount: about.employeeCount,
        valuesCount: about.values ? about.values.length : 0
      }
    });
  } catch (error) {
    console.error('Get about stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAbout,
  updateAbout,
  getAboutStats
};