#!/bin/bash
# Start script for running Citadel Explore App with pnpm
# This will handle initialization and startup

echo "🚀 Welcome to Citadel Explore App - pnpm edition!"
echo "================================================"

# Check if pnpm is installed
if command -v pnpm &> /dev/null; then
    echo "✅ pnpm is installed: $(pnpm --version)"
else
    echo "❌ pnpm is not installed. Installing it now..."
    npm install -g pnpm
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install pnpm. Please install it manually using 'npm install -g pnpm'"
        exit 1
    fi
    echo "✅ pnpm has been installed: $(pnpm --version)"
fi

# Install specific versions of metro packages to fix compatibility issues
echo "🔧 Installing specific versions of metro packages..."
pnpm add metro@0.76.8 metro-react-native-babel-preset@0.76.8 metro-resolver@0.76.8 metro-runtime@0.76.8 --save-exact
if [ $? -ne 0 ]; then
    echo "⚠️ Some packages couldn't be installed, but we'll try to continue..."
fi

# Clear pnpm cache if needed
echo "🧹 Cleaning pnpm cache..."
pnpm store prune

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
if [ $? -ne 0 ]; then
    echo "⚠️ Some dependencies couldn't be installed, but we'll try to continue..."
fi

# Start the app
echo "🚀 Starting the application (Web version)..."
echo "Press Ctrl+C to stop the application"
echo ""

# Choose the command that works best based on testing
if ! npx expo start --web; then
    echo "⚠️ Failed to start with npx expo, trying with pnpm..."
    pnpm pnpm:web
fi

echo "✅ Application has been stopped"
