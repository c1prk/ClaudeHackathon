#!/bin/bash

# Canvas Course Chatbot - Startup Script
# This script starts both the frontend and backend servers

echo "=========================================="
echo "🚀 Canvas Course Chatbot Startup"
echo "=========================================="
echo ""

# Check if .env file exists in backend
if [ ! -f "./backend/.env" ]; then
    echo "⚠️  Warning: No .env file found in backend directory"
    echo "Creating .env file from .env.example..."
    if [ -f "./backend/.env.example" ]; then
        cp ./backend/.env.example ./backend/.env
        echo "✅ Created backend/.env file"
        echo "⚠️  Please edit backend/.env and add your ANTHROPIC_API_KEY"
        echo ""
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

echo "=========================================="
echo "Starting servers..."
echo "=========================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 2

# Start frontend (this will block)
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
