const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

// Create contact message (public)
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress
    });

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: savedContact._id,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all contacts (admin only)
const getContacts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      isRead, 
      priority, 
      sortBy = 'createdAt', 
      order = 'desc' 
    } = req.query;
    
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (isRead !== undefined) filter.isRead = isRead === 'true';
    if (priority) filter.priority = priority;

    // Build sort
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(filter);
    const unreadCount = await Contact.countDocuments({ isRead: false });

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
        unreadCount
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single contact (admin only)
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update contact (admin only)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead, isReplied, priority } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isRead, isReplied, priority },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark as read (admin only)
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact marked as read',
      data: contact
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark contact as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete contact (admin only)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark as replied (admin only)
const markAsReplied = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isReplied: true, isRead: true }, // Auto mark as read when replied
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact marked as replied',
      data: contact
    });
  } catch (error) {
    console.error('Mark as replied error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark contact as replied',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Send reply email (admin only)
const sendReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;

    // Validate input
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    // Get the contact
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Send reply email
    const emailResult = await emailService.sendReply({
      to: contact.email,
      subject: subject,
      message: message,
      originalMessage: contact.message
    });

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send reply email',
        error: emailResult.error
      });
    }

    // Mark contact as replied and read
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { 
        isReplied: true, 
        isRead: true,
        repliedAt: new Date(),
        replySent: true
      },
      { new: true }
    );

    const responseMessage = emailResult.demo ? 
      'Reply processed successfully (Demo Mode - Gmail SMTP not configured)' : 
      'Reply sent successfully';

    res.json({
      success: true,
      message: responseMessage,
      data: {
        contact: updatedContact,
        emailInfo: {
          messageId: emailResult.messageId,
          to: contact.email,
          subject: subject,
          demo: emailResult.demo || false
        }
      }
    });
  } catch (error) {
    console.error('Send reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get contact stats (admin dashboard)
const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ isRead: false });
    const replied = await Contact.countDocuments({ isReplied: true });
    const thisMonth = await Contact.countDocuments({
      createdAt: { 
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) 
      }
    });

    const priorityStats = await Contact.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        unread,
        replied,
        thisMonth,
        priority: priorityStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  markAsRead,
  markAsReplied,
  sendReply,
  deleteContact,
  getContactStats
};
