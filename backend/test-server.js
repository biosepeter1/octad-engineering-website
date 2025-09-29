const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Test server is running',
    timestamp: new Date().toISOString()
  });
});

// Simple upload endpoint without authentication
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Files:', req.files);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    console.log('Uploaded files:', uploadedFiles);

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

const PORT = 5001; // Use a different port to avoid conflicts

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
});