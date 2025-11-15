#!/bin/bash
# Canvas Course Chatbot - Frontend Setup Script
# This script automates the GitHub integration process

echo "🚀 Canvas Course Chatbot - Frontend Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Please install Git first: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're already in a git repo
if [ -d .git ]; then
    echo "✅ Already in a Git repository"
    REPO_DIR=$(pwd)
else
    # Ask for repo URL
    echo "📥 Enter your GitHub repository URL:"
    echo "Example: https://github.com/c1prk/ClaudeHackathon.git"
    read -p "URL: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ Error: No URL provided"
        exit 1
    fi
    
    # Clone the repo
    echo ""
    echo "📥 Cloning repository..."
    git clone "$REPO_URL"
    
    # Extract repo name from URL
    REPO_NAME=$(basename "$REPO_URL" .git)
    cd "$REPO_NAME" || exit 1
    REPO_DIR=$(pwd)
fi

echo ""
echo "📂 Working directory: $REPO_DIR"
echo ""

# Ask about structure
echo "📁 How would you like to organize files?"
echo "1) Frontend only (all files in root)"
echo "2) Monorepo (create frontend/ folder)"
read -p "Choose (1 or 2): " STRUCTURE

if [ "$STRUCTURE" = "2" ]; then
    echo "📁 Creating frontend directory..."
    mkdir -p frontend
    cd frontend || exit 1
    echo "✅ Will install files in: $(pwd)"
else
    echo "✅ Will install files in root: $(pwd)"
fi

echo ""
echo "⚠️  IMPORTANT: Place all downloaded frontend files in the current directory"
echo "📍 Current directory: $(pwd)"
echo ""
echo "Files needed:"
echo "  - canvas-chatbot.jsx"
echo "  - api.js"
echo "  - package.json"
echo "  - main.jsx"
echo "  - index.html"
echo "  - styles.css"
echo "  - vite.config.js"
echo "  - tailwind.config.js"
echo "  - postcss.config.js"
echo "  - All .md files"
echo ""
read -p "Have you copied all files to this directory? (y/n): " FILES_READY

if [ "$FILES_READY" != "y" ]; then
    echo "⏸️  Please copy files and run this script again"
    exit 0
fi

# Check for required files
echo ""
echo "🔍 Checking for required files..."
REQUIRED_FILES=("package.json" "canvas-chatbot.jsx" "main.jsx" "index.html")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (missing)"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo ""
    echo "❌ Missing required files. Please add them and try again."
    exit 1
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo ""
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Misc
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*

# Editor
.vscode/*
!.vscode/extensions.json
.idea
EOF
    echo "  ✅ .gitignore created"
else
    echo "  ℹ️  .gitignore already exists"
fi

# Install dependencies
echo ""
read -p "📦 Install npm dependencies now? (y/n): " INSTALL_DEPS

if [ "$INSTALL_DEPS" = "y" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Dependencies installed successfully"
    else
        echo "  ❌ Error installing dependencies"
        exit 1
    fi
fi

# Test the app
echo ""
read -p "🧪 Test the application now? (y/n): " TEST_APP

if [ "$TEST_APP" = "y" ]; then
    echo "🧪 Starting development server..."
    echo "  Press Ctrl+C to stop the server"
    npm run dev
fi

# Git commit
echo ""
read -p "📤 Commit and push to GitHub? (y/n): " PUSH_TO_GIT

if [ "$PUSH_TO_GIT" = "y" ]; then
    echo "📤 Committing changes..."
    
    # Configure git if needed
    if [ -z "$(git config user.name)" ]; then
        read -p "Enter your name for Git: " GIT_NAME
        git config user.name "$GIT_NAME"
    fi
    
    if [ -z "$(git config user.email)" ]; then
        read -p "Enter your email for Git: " GIT_EMAIL
        git config user.email "$GIT_EMAIL"
    fi
    
    # Add files
    git add .
    
    # Commit
    read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="Add complete frontend application with React and Claude integration"
    fi
    
    git commit -m "$COMMIT_MSG"
    
    # Push
    echo "📤 Pushing to GitHub..."
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    git push origin "$BRANCH"
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Pushed successfully to branch: $BRANCH"
    else
        echo "  ❌ Error pushing to GitHub"
        echo "  Try: git push origin $BRANCH"
    fi
fi

echo ""
echo "🎉 Setup Complete!"
echo "==================="
echo ""
echo "📂 Repository: $REPO_DIR"
echo "📝 Next steps:"
echo "  1. Visit your GitHub repo to verify files"
echo "  2. Read START_HERE.md for usage instructions"
echo "  3. Run 'npm run dev' to start development"
echo "  4. Connect your backend using api.js"
echo "  5. Deploy and demo!"
echo ""
echo "🚀 Good luck with your hackathon!"
