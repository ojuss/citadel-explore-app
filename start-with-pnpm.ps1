# Start script for running Citadel Explore App with pnpm
# This will handle initialization and startup

Write-Host "🚀 Welcome to Citadel Explore App - pnpm edition!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Check if pnpm is installed
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm is installed: $pnpmVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ pnpm is not installed. Installing it now..." -ForegroundColor Yellow
    npm install -g pnpm
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install pnpm. Please install it manually using 'npm install -g pnpm'" -ForegroundColor Red
        exit 1
    }
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm has been installed: $pnpmVersion" -ForegroundColor Green
}

# Install specific versions of metro packages to fix compatibility issues
Write-Host "🔧 Installing specific versions of metro packages..." -ForegroundColor Cyan
pnpm add metro@0.76.8 metro-react-native-babel-preset@0.76.8 metro-resolver@0.76.8 metro-runtime@0.76.8 --save-exact
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Some packages couldn't be installed, but we'll try to continue..." -ForegroundColor Yellow
}

# Clear pnpm cache if needed
Write-Host "🧹 Cleaning pnpm cache..." -ForegroundColor Cyan
pnpm store prune

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Some dependencies couldn't be installed, but we'll try to continue..." -ForegroundColor Yellow
}

# Start the app
Write-Host "🚀 Starting the application (Web version)..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

# Choose the command that works best based on testing
try {
    npx expo start --web
} catch {
    Write-Host "⚠️ Failed to start with npx expo, trying with pnpm..." -ForegroundColor Yellow
    pnpm pnpm:web
}

Write-Host "✅ Application has been stopped" -ForegroundColor Green
