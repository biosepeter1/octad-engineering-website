# 🏗️ Construction Website - Full Stack Application

A modern, responsive construction company website built with **Next.js**, **Node.js/Express**, and **MongoDB**. Features a public-facing site with an admin panel for content management.

## 🚀 Features

### Public Website
- **Responsive Design** - Works on all devices
- **Hero Section** - Engaging landing page with call-to-actions
- **Services Showcase** - Display construction services dynamically
- **Project Gallery** - Featured projects with filtering
- **About Page** - Company information and values
- **Contact Form** - Lead generation with form validation
- **SEO Optimized** - Proper meta tags and structure

### Admin Panel
- **Secure Authentication** - JWT-based login system
- **Dashboard** - Overview of site statistics
- **Service Management** - CRUD operations for services
- **Project Management** - Manage portfolio with image uploads
- **About Page Editor** - Update company information
- **Contact Messages** - View and manage inquiries

### Technical Features
- **REST API** - Well-structured backend endpoints
- **Database** - MongoDB with Mongoose ODM
- **Security** - Rate limiting, input validation, helmet
- **Error Handling** - Comprehensive error management
- **Responsive UI** - Tailwind CSS with custom components

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

## 📁 Project Structure

```
construction-website/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # Mongoose models
│   │   ├── controllers/       # Route controllers
│   │   ├── routes/            # Express routes
│   │   ├── middleware/        # Custom middleware
│   │   └── server.js          # Express app entry
│   ├── package.json
│   └── .env.example
├── frontend/                  # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── admin/        # Admin panel pages
│   │   │   ├── about/        # About page
│   │   │   ├── services/     # Services page
│   │   │   ├── projects/     # Projects page
│   │   │   ├── contact/      # Contact page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Home page
│   │   ├── components/       # Reusable components
│   │   ├── lib/             # API helpers and utilities
│   │   └── styles/          # Global styles
│   ├── package.json
│   └── .env.local.example
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd construction-website
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings:
# MONGODB_URI=mongodb://localhost:27017/construction-website
# JWT_SECRET=your-super-secret-jwt-key
# PORT=5000
# NODE_ENV=development

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your settings:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
# NEXT_PUBLIC_SITE_NAME="Construction Company"

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Database Setup

If using MongoDB locally:
```bash
# Start MongoDB service
mongod

# (Optional) Import sample data
# mongoimport --db construction-website --collection services --file sample-data/services.json
```

For MongoDB Atlas:
1. Create a cluster at https://cloud.mongodb.com
2. Get connection string and update `MONGODB_URI` in backend `.env`

### 5. Create Admin User

You'll need to create an admin user to access the admin panel. You can do this by running a script or manually inserting into the database:

```javascript
// Run this in MongoDB shell or create a script
use construction-website

db.users.insertOne({
  username: "admin",
  password: "$2a$12$hashed_password_here", // Use bcrypt to hash "admin123" or your password
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 📝 API Endpoints

### Public Endpoints
- `GET /api/services` - Get all active services
- `GET /api/projects` - Get projects (with filters)
- `GET /api/projects/featured` - Get featured projects
- `GET /api/about` - Get about information
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get current user profile
- `GET /api/services/admin` - Get all services (including inactive)
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/projects/admin` - Get all projects for admin
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PUT /api/about` - Update about information
- `GET /api/contact` - Get contact messages
- `GET /api/contact/stats` - Get contact statistics

## 🎨 Brand Colors

The website uses a professional color scheme:

- **Primary**: `#236BB5` (Blue) - Main brand color
- **Secondary**: `#00A2D0` (Cyan) - Accent color
- **Neutral**: `#D2D2D1` (Light Gray) - Background/text
- **Accent**: `#6F449B` (Purple) - Highlights

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Create a new web service
2. Connect your repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL for CORS)
4. Deploy from `backend` folder

### Frontend Deployment (Vercel)
1. Connect your repository to Vercel
2. Set root directory to `frontend`
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` (your backend URL)
4. Deploy

### Database (MongoDB Atlas)
1. Create a cluster at MongoDB Atlas
2. Whitelist deployment IP addresses
3. Update connection string in environment variables

## 📱 Features in Detail

### Public Website
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized images and code splitting
- **SEO**: Meta tags, structured data, sitemap
- **Accessibility**: WCAG compliant components

### Admin Panel
- **Authentication**: JWT-based secure login
- **Dashboard**: Statistics and recent activity
- **Content Management**: Easy-to-use forms for all content
- **Image Management**: Upload and organize project images
- **User Experience**: Toast notifications and loading states

## 🛡️ Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent abuse
- **Input Validation** on all endpoints
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Environment Variables** for sensitive data

## 📈 Performance

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **API Caching**: Proper HTTP cache headers
- **Database Indexing**: Optimized MongoDB queries
- **Compression**: Gzip compression enabled

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for the construction industry**