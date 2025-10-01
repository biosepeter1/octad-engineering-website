# Cloudinary Integration Setup

This project now uses Cloudinary for cloud-based image storage instead of local file storage. This provides better scalability, performance, and reliability for image uploads.

## Features

- ✅ Automatic image optimization
- ✅ Responsive image delivery
- ✅ Global CDN distribution
- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Quality optimization
- ✅ Organized folder structure (`construction-website/`)
- ✅ Secure upload with authentication

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. After registration, go to your [Dashboard](https://cloudinary.com/console)
3. Note down your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Update Environment Variables

Update your `.env` file with your Cloudinary credentials:

```bash
# Cloudinary Configuration (Required for image uploads)
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key  
CLOUDINARY_API_SECRET=your-actual-api-secret
```

**Important:** Replace the placeholder values with your actual Cloudinary credentials.

### 3. Test the Configuration

You can test the Cloudinary integration by:

1. Starting the backend server: `npm start`
2. Logging into the admin panel
3. Try uploading images in the Success Stories section

### 4. Folder Structure

All uploaded images are stored in the `construction-website/` folder in your Cloudinary media library for better organization.

## Technical Details

### Backend Changes

- **Upload Route**: `src/routes/upload.js` now uses `CloudinaryStorage` instead of local disk storage
- **Configuration**: `config/cloudinary.js` handles Cloudinary setup
- **Image Processing**: Automatic quality optimization and format conversion
- **Delete Functionality**: Images are deleted from Cloudinary when removed

### Frontend Compatibility

The frontend upload handlers remain unchanged and work seamlessly with Cloudinary URLs:

- Success story modal image uploads
- Project image uploads (if implemented)
- Any other image upload functionality

### Security

- All uploads require admin authentication
- File type validation (images only)
- Size limits enforced (10MB per file)
- Cloudinary URLs are publicly accessible but secure

## Migration from Local Storage

If you have existing local images, you'll need to manually upload them to Cloudinary and update the database URLs. The old local storage setup is still in place as a fallback during development.

## Troubleshooting

### Common Issues

1. **"unknown api_key" error**
   - Check that your CLOUDINARY_API_KEY is correct
   - Ensure there are no spaces or quotes in the .env file

2. **"Must supply cloud_name" error**
   - Verify CLOUDINARY_CLOUD_NAME is set in .env
   - Restart the server after changing .env

3. **Upload fails silently**
   - Check the browser console for errors
   - Verify all three Cloudinary credentials are set
   - Check server logs for detailed error messages

### Testing Connection

The integration includes error handling and logging. Check the server console when testing uploads for detailed error messages.

## Benefits Over Local Storage

1. **Scalability**: No local disk space limitations
2. **Performance**: Global CDN delivery
3. **Optimization**: Automatic image compression and format selection
4. **Reliability**: Cloud-based storage with backups
5. **Features**: Built-in image transformations and optimizations

## Support

For Cloudinary-specific issues, refer to:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js SDK Guide](https://cloudinary.com/documentation/node_integration)
- [Upload Parameters](https://cloudinary.com/documentation/image_upload_api_reference)