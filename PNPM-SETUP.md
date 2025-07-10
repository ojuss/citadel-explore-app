# Citadel Explore App - Running with pnpm

This guide will help you run the Citadel Explore App using pnpm package manager.

## Prerequisites

- Node.js (v16+)
- pnpm package manager
- Windows, macOS, or Linux

## Setup Instructions

1. **Install pnpm** (if not already installed):

```bash
npm install -g pnpm
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start the application**:

For web:
```bash
pnpm pnpm:web
```

For Android:
```bash
pnpm pnpm:android
```

For iOS (Mac only):
```bash
pnpm pnpm:ios
```

## Troubleshooting

If you encounter the following error:
```
Error: Cannot find module 'metro/src/ModuleGraph/worker/importLocationsPlugin'
```

Try these solutions:

1. Remove the `node_modules` folder and reinstall:
```bash
rm -rf node_modules
pnpm install
```

2. Install specific metro versions:
```bash
pnpm add metro@0.76.8 metro-react-native-babel-preset@0.76.8 metro-resolver@0.76.8 metro-runtime@0.76.8 --save-exact
```

3. Clear cache and try again:
```bash
pnpm store prune
pnpm install
```

4. Try using `npx` directly:
```bash
npx expo start --web
```

## Project Structure

- `src/components` - React components including the main ExploreScreen
- `src/algorithms` - Contains the ProfileDiscoveryEngine implementation
- `src/data` - Mock user data
- `src/types` - TypeScript type definitions

## Features

- Profile discovery based on interests, academic background, and location
- Liking/disliking profiles to improve recommendations
- Filtering profiles by criteria
- Beautiful UI with animations and smooth interactions
