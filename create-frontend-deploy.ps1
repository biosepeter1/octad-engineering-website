# PowerShell script to create frontend-only deployment

Write-Host "🚀 Creating Frontend-Only Deployment..." -ForegroundColor Green

# Create frontend deploy directory
$frontendDir = "../octad-frontend-deploy"
if (Test-Path $frontendDir) {
    Write-Host "⚠️  Directory exists, removing old version..." -ForegroundColor Yellow
    Remove-Item $frontendDir -Recurse -Force
}

Write-Host "📁 Creating frontend directory..." -ForegroundColor Blue
New-Item -ItemType Directory -Path $frontendDir | Out-Null

# Copy frontend files
Write-Host "📋 Copying frontend files..." -ForegroundColor Blue
Copy-Item -Path "./frontend/*" -Destination $frontendDir -Recurse -Force

# Copy important root files
Write-Host "📋 Copying configuration files..." -ForegroundColor Blue
Copy-Item -Path "./README.md" -Destination $frontendDir -Force
Copy-Item -Path "./DEPLOYMENT_GUIDE.md" -Destination $frontendDir -Force
Copy-Item -Path "./.gitignore" -Destination $frontendDir -Force

# Create frontend-specific README
Write-Host "📝 Creating frontend-specific README..." -ForegroundColor Blue
$readmeContent = @"
# 🏗️ Octad Engineering - Frontend

This is the frontend-only deployment version of the Octad Engineering construction website.

## 🚀 Quick Deploy to Vercel

1. Push this repository to GitHub
2. Connect to Vercel
3. Add environment variables:
   - NEXT_PUBLIC_API_URL=https://your-backend-url/api
   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
4. Deploy!

## 📱 Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Nigerian business focus

## 🔧 Environment Variables Required

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📚 Full Documentation

See DEPLOYMENT_GUIDE.md for complete deployment instructions.

---

Made with ❤️ for Nigerian businesses 🇳🇬
"@

Set-Content -Path "$frontendDir/README.md" -Value $readmeContent

# Initialize git repository
Write-Host "🔧 Initializing Git repository..." -ForegroundColor Blue
Set-Location $frontendDir
git init | Out-Null
git add . | Out-Null
git commit -m "Initial frontend-only deployment" | Out-Null

Write-Host "✅ Frontend deployment package created!" -ForegroundColor Green
Write-Host "" 
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. cd ../octad-frontend-deploy"
Write-Host "2. Create GitHub repository: octad-engineering-frontend"  
Write-Host "3. git remote add origin https://github.com/biosepeter1/octad-engineering-frontend.git"
Write-Host "4. git branch -M main"
Write-Host "5. git push -u origin main"
Write-Host "6. Deploy to Vercel using the new repository"
Write-Host ""
Write-Host "📁 Frontend package location: $frontendDir" -ForegroundColor Yellow

# Return to original directory
Set-Location "../construction-website"