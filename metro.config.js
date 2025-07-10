// metro.config.js - updated for compatibility with pnpm
const { getDefaultConfig } = require('expo/metro-config');
const { resolve } = require('path');

const config = getDefaultConfig(__dirname);

// Add more node_modules folders for Metro to scan
config.resolver.nodeModulesPaths = [
  resolve(__dirname, 'node_modules'),
  resolve(__dirname, '.pnpm')
];

// Add extra modules that Metro should consider as "internal"
config.resolver.extraNodeModules = new Proxy({}, {
  get: (target, name) => {
    return resolve(__dirname, `node_modules/${name}`);
  }
});

// Fix for importLocationsPlugin issue
config.transformer.minifierPath = require.resolve('metro-minify-terser');

// Allow symlinks (which pnpm uses)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Special logic can be added here if needed
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
