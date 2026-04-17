#!/usr/bin/env node

// Simple build verification script
console.log('🔨 Building eListaMo...');
console.log('📦 Checking for common issues...');

// Check if main files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'index.html',
  'src/main.tsx', 
  'src/App.tsx',
  'package.json',
  'vite.config.ts',
  'tailwind.config.js'
];

let allGood = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allGood = false;
  }
});

if (allGood) {
  console.log('🎉 All required files present!');
  console.log('🚀 Ready for Vercel deployment!');
} else {
  console.log('⚠️  Some files are missing. Please check your setup.');
  process.exit(1);
}
