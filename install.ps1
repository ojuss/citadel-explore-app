# Explore App Installation Script for Windows
# This script sets up the React Native/Expo Explore App

Write-Host "🚀 Welcome to the Explore App Setup!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Visit: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the explore-app directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
try {
    npm install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Check if Expo CLI is installed globally
try {
    $expoVersion = expo --version
    Write-Host "✅ Expo CLI is already installed: $expoVersion" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Expo CLI not found. Installing globally..." -ForegroundColor Yellow
    try {
        npm install -g expo-cli
        Write-Host "✅ Expo CLI installed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to install Expo CLI" -ForegroundColor Red
        exit 1
    }
}

# Run a quick test to verify the algorithm works
Write-Host "🧪 Running algorithm tests..." -ForegroundColor Cyan
try {
    node tests/algorithmTest.js
    Write-Host "✅ Algorithm tests passed" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Algorithm tests failed, but continuing..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup complete! You can now run the app with:" -ForegroundColor Green
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "📱 Then you can:" -ForegroundColor Cyan
Write-Host "   - Press 'a' to run on Android emulator" -ForegroundColor White
Write-Host "   - Press 'i' to run on iOS simulator" -ForegroundColor White
Write-Host "   - Press 'w' to run on web" -ForegroundColor White
Write-Host "   - Scan the QR code with Expo Go app" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
