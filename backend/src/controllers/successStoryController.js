const SuccessStory = require('../models/SuccessStory');

// Get all success stories (public) - for the frontend page
const getSuccessStories = async (req, res) => {
  try {
    const { limit = 10, page = 1, category, featured } = req.query;
    const skip = (page - 1) * limit;

    // Build query filter
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const stories = await SuccessStory.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await SuccessStory.countDocuments(filter);

    res.json({
      success: true,
      data: stories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get success stories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch success stories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get featured success story (public) - for the main featured story display
const getFeaturedSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findOne({ 
      isFeatured: true, 
      isActive: true 
    });

    if (!story) {
      // If no featured story, get the most recent one
      const latestStory = await SuccessStory.findOne({ isActive: true })
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        data: latestStory
      });
    }

    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    console.error('Get featured success story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured success story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all success stories for admin (including inactive ones)
const getAllSuccessStories = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const stories = await SuccessStory.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await SuccessStory.countDocuments();

    res.json({
      success: true,
      data: stories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all success stories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch success stories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single success story
const getSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      });
    }

    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    console.error('Get success story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch success story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create success story (admin only)
const createSuccessStory = async (req, res) => {
  try {
    const {
      title,
      client,
      location,
      category,
      duration,
      budget,
      completionYear,
      description,
      challenge,
      solution,
      result,
      testimonial,
      images = [],
      metrics = [],
      isFeatured = false,
      isActive = true,
      order = 0
    } = req.body;

    // Ensure at least one image has isPrimary set to true
    if (images.length > 0 && !images.some(img => img.isPrimary)) {
      images[0].isPrimary = true;
    }

    const story = new SuccessStory({
      title,
      client,
      location,
      category,
      duration,
      budget,
      completionYear,
      description,
      challenge,
      solution,
      result,
      testimonial,
      images,
      metrics,
      isFeatured,
      isActive,
      order
    });

    const savedStory = await story.save();

    res.status(201).json({
      success: true,
      message: 'Success story created successfully',
      data: savedStory
    });
  } catch (error) {
    console.error('Create success story error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create success story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update success story (admin only)
const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure at least one image has isPrimary set to true if images are provided
    if (updateData.images && updateData.images.length > 0) {
      if (!updateData.images.some(img => img.isPrimary)) {
        updateData.images[0].isPrimary = true;
      }
    }

    const story = await SuccessStory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      });
    }

    res.json({
      success: true,
      message: 'Success story updated successfully',
      data: story
    });
  } catch (error) {
    console.error('Update success story error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update success story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete success story (admin only)
const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await SuccessStory.findByIdAndDelete(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      });
    }

    res.json({
      success: true,
      message: 'Success story deleted successfully'
    });
  } catch (error) {
    console.error('Delete success story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete success story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Toggle featured status (admin only)
const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await SuccessStory.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      });
    }

    story.isFeatured = !story.isFeatured;
    await story.save(); // This will trigger the pre-save hook to unfeatured others

    res.json({
      success: true,
      message: `Success story ${story.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: story
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Toggle active status (admin only)
const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await SuccessStory.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      });
    }

    story.isActive = !story.isActive;
    
    // If deactivating a featured story, unfeatured it
    if (!story.isActive && story.isFeatured) {
      story.isFeatured = false;
    }
    
    await story.save();

    res.json({
      success: true,
      message: `Success story ${story.isActive ? 'activated' : 'deactivated'} successfully`,
      data: story
    });
  } catch (error) {
    console.error('Toggle active error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle active status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getSuccessStories,
  getFeaturedSuccessStory,
  getAllSuccessStories,
  getSuccessStory,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  toggleFeatured,
  toggleActive
};