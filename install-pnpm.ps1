# Explore App Installation Script for Windows using pnpm
# This script sets up the React Native/Expo Explore App with pnpm

Write-Host "🚀 Welcome to the Explore App Setup with pnpm!" -ForegroundColor Green
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

# Check if pnpm is installed
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm is installed: $pnpmVersion" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ pnpm is not installed. Attempting to install it now..." -ForegroundColor Yellow
    try {
        npm install -g pnpm
        $pnpmVersion = pnpm --version
        Write-Host "✅ pnpm has been installed: $pnpmVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to install pnpm. Please install it manually:" -ForegroundColor Red
        Write-Host "npm install -g pnpm" -ForegroundColor Yellow
        exit 1
    }
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the explore-app directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies with pnpm..." -ForegroundColor Cyan
try {
    pnpm install
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
    Write-Host "⚠️ Expo CLI is not installed globally. Installing it now..." -ForegroundColor Yellow
    try {
        pnpm add -g expo-cli
        Write-Host "✅ Expo CLI installed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "⚙️ Using npx instead of global installation" -ForegroundColor Yellow
    }
}

# Setup complete
Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "To start the app, run:" -ForegroundColor Green
Write-Host "  pnpm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run on a specific platform:" -ForegroundColor Green
Write-Host "  pnpm android" -ForegroundColor Cyan
Write-Host "  pnpm ios" -ForegroundColor Cyan
Write-Host "  pnpm web" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 👩‍💻👨‍💻" -ForegroundColor Green
