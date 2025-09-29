const Service = require('../models/Service');

// Get all services (public)
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all services for admin (including inactive)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single service
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create service (admin only)
const createService = async (req, res) => {
  try {
    const { title, description, icon, isActive = true, order = 0 } = req.body;

    const service = new Service({
      title,
      description,
      icon,
      isActive,
      order
    });

    const savedService = await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: savedService
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update service (admin only)
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, isActive, order } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { title, description, icon, isActive, order },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete service (admin only)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getServices,
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService
};