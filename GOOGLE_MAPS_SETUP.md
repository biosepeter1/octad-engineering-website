# 🗺️ Google Maps Setup Instructions

Your contact page now includes a **fully functional Google Maps integration**! Follow these steps to set it up properly.

## 📋 **Setup Steps**

### **1. Get Google Maps API Key**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the **Maps JavaScript API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"
4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### **2. Configure Environment Variables**

1. In your frontend directory, create `.env.local`:
   ```bash
   cd frontend
   copy .env.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### **3. Update Your Location**

Edit the coordinates in `frontend/src/app/contact/page.tsx`:

```javascript
const GOOGLE_MAPS_CONFIG = {
  center: { lat: 40.7128, lng: -74.0060 }, // Replace with your actual coordinates
  zoom: 15,
  address: '123 Construction Ave, Builder City, BC 12345' // Replace with your actual address
}
```

**To find your coordinates:**
1. Go to [Google Maps](https://maps.google.com)
2. Search for your address
3. Right-click on the location
4. Copy the coordinates (first number is lat, second is lng)

### **4. Secure Your API Key (Recommended)**

1. In Google Cloud Console, go to your API key
2. Click "Edit API key"
3. Under "Application restrictions", select "HTTP referrers"
4. Add your domain: `yourdomain.com/*` and `*.yourdomain.com/*`
5. Under "API restrictions", select "Restrict key" and choose "Maps JavaScript API"

## 🎨 **Map Features**

Your map includes:

✅ **Custom Styling** - Professional appearance matching your brand colors
✅ **Custom Marker** - BuildCorp-branded icon with your company colors  
✅ **Info Window** - Shows company name, address, phone, and email
✅ **Interactive Controls** - Zoom in/out buttons
✅ **Get Directions** - Direct link to Google Maps directions
✅ **Loading State** - Beautiful loading animation
✅ **Error Handling** - Fallback to Google Maps link if loading fails
✅ **Mobile Responsive** - Works perfectly on all devices

## 🔧 **Customization Options**

### **Map Styling**
You can customize the map colors by editing the `styles` array in the map configuration.

### **Marker Icon**
The custom marker icon is created using SVG. You can modify the colors and design in the `icon.url` property.

### **Info Window Content**
Customize the popup content by editing the `infoWindow.content` property.

## 🚀 **Testing**

1. Start your development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Visit `http://localhost:3000/contact`
3. Scroll down to the map section
4. You should see an interactive Google Map with your location marked

## 🛠️ **Troubleshooting**

### **Map not loading?**
- Check that your API key is correctly set in `.env.local`
- Verify the Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for error messages
- Make sure you don't have ad blockers blocking the Google Maps script

### **"For development purposes only" watermark?**
- This appears when using a demo/restricted API key
- Add billing to your Google Cloud project
- Configure proper API restrictions

### **Wrong location showing?**
- Update the `lat` and `lng` values in `GOOGLE_MAPS_CONFIG`
- Update the `address` string to match your actual address

## 💰 **Google Maps Pricing**

Google Maps has a **generous free tier**:
- **$200 free credit** per month (covers ~28,000 map loads)
- Most small businesses stay within the free tier
- You only pay if you exceed the free usage limits

## 📞 **Need Help?**

The map will work with demo data even without an API key, but you'll see a "for development purposes only" watermark. For production use, you'll need a proper Google Maps API key.

---

**🎉 Your contact page now has a professional, interactive map that will impress your visitors!**