#!/bin/bash

# Vertex Frontend Setup & Start Script

echo "🚀 Starting Vertex Frontend Setup..."

# Go to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing Node dependencies..."
npm install

# Start the dev server
echo "🚀 Starting development server on http://localhost:5173..."
echo ""
npm run dev
