#!/bin/bash

# Explore App Installation Script
# This script sets up the React Native/Expo Explore App

echo "🚀 Welcome to the Explore App Setup!"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the explore-app directory"
    exit 1
fi

echo "✅ Found package.json"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "⚠️  Expo CLI not found. Installing globally..."
    npm install -g expo-cli
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Expo CLI"
        exit 1
    fi
    
    echo "✅ Expo CLI installed successfully"
else
    echo "✅ Expo CLI is already installed: $(expo --version)"
fi

# Run a quick test to verify the algorithm works
echo "🧪 Running algorithm tests..."
node tests/algorithmTest.js

if [ $? -ne 0 ]; then
    echo "⚠️  Algorithm tests failed, but continuing..."
else
    echo "✅ Algorithm tests passed"
fi

echo ""
echo "🎉 Setup complete! You can now run the app with:"
echo "   npm start"
echo ""
echo "📱 Then you can:"
echo "   - Press 'a' to run on Android emulator"
echo "   - Press 'i' to run on iOS simulator"
echo "   - Press 'w' to run on web"
echo "   - Scan the QR code with Expo Go app"
echo ""
echo "Happy coding! 🚀"
