# 🚀 GitHub Integration Guide - Canvas Course Chatbot Frontend

## Step-by-Step Instructions to Add Files to Your Repo

### 📋 Prerequisites
- Git installed on your computer
- GitHub account with access to https://github.com/c1prk/ClaudeHackathon

---

## Option 1: Fresh Frontend Setup (Recommended)

### Step 1: Clone Your Repository
```bash
# Clone your repo
git clone https://github.com/c1prk/ClaudeHackathon.git
cd ClaudeHackathon
```

### Step 2: Create Frontend Directory Structure
```bash
# Create a frontend folder (if your repo will have backend too)
mkdir frontend
cd frontend

# OR if this repo is frontend-only, stay in root
cd ClaudeHackathon
```

### Step 3: Copy All Frontend Files

**If you downloaded all files to a folder (e.g., Downloads):**
```bash
# From your downloads location, copy to repo
# Replace /path/to/downloads with actual path

# Copy all files
cp /path/to/downloads/*.jsx ./
cp /path/to/downloads/*.js ./
cp /path/to/downloads/*.json ./
cp /path/to/downloads/*.html ./
cp /path/to/downloads/*.css ./
cp /path/to/downloads/*.md ./

# OR copy entire folder contents
cp -r /path/to/downloads/* ./
```

**If you have the files in Claude's outputs:**
```bash
# You'll need to download them first from the links I provided
# Then copy them as shown above
```

### Step 4: Verify File Structure

Your repo should now look like this:
```
ClaudeHackathon/
├── README.md
├── START_HERE.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── PROJECT_OVERVIEW.md
├── QUICK_REFERENCE.md
├── FILE_MANIFEST.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── canvas-chatbot.jsx
├── api.js
├── main.jsx
├── index.html
└── styles.css
```

### Step 5: Create .gitignore
```bash
# Create .gitignore file
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

# Build files
*.pid
*.seed
*.pid.lock
EOF
```

### Step 6: Initialize npm and Install Dependencies
```bash
# Install dependencies
npm install

# Test that it works
npm run dev
```

**Expected result:** Browser opens to http://localhost:3000 with your app running!

### Step 7: Commit and Push to GitHub
```bash
# Check what files will be added
git status

# Add all files
git add .

# Commit with a message
git commit -m "Add complete frontend with React, Tailwind, and Claude integration"

# Push to GitHub
git push origin main
# (or git push origin master, depending on your default branch)
```

---

## Option 2: If Repo Already Has Files

### Step 1: Check Current Structure
```bash
git clone https://github.com/c1prk/ClaudeHackathon.git
cd ClaudeHackathon
ls -la
```

### Step 2: Decide on Organization

**Option A: Monorepo Structure** (Recommended if you have backend)
```
ClaudeHackathon/
├── frontend/          ← Put all frontend files here
│   ├── package.json
│   ├── canvas-chatbot.jsx
│   └── ... (all other files)
├── backend/           ← Your backend code
│   └── ...
└── README.md         ← Root README
```

**Option B: Frontend-Only**
```
ClaudeHackathon/
├── package.json
├── canvas-chatbot.jsx
├── api.js
└── ... (all files in root)
```

### Step 3: Move Files Accordingly
```bash
# For Option A (Monorepo):
mkdir frontend
cd frontend
# Copy all frontend files here

# Update root README to point to frontend folder
echo "# Canvas Course Chatbot" > ../README.md
echo "" >> ../README.md
echo "## Frontend" >> ../README.md
echo "See [frontend/START_HERE.md](frontend/START_HERE.md) for setup instructions" >> ../README.md

# For Option B (Frontend-only):
# Just copy files to root as shown in Option 1
```

### Step 4: Commit Changes
```bash
git add .
git commit -m "Add frontend application"
git push origin main
```

---

## Option 3: Manual File Addition (If Git Issues)

### Step 1: Download All Files from Links
Click each link I provided earlier to download:
1. START_HERE.md
2. canvas-chatbot.jsx
3. api.js
4. package.json
5. All other files

### Step 2: Go to GitHub Web Interface
1. Navigate to https://github.com/c1prk/ClaudeHackathon
2. Click "Add file" → "Upload files"
3. Drag and drop all downloaded files
4. Add commit message: "Add frontend application"
5. Click "Commit changes"

### Step 3: Clone and Setup Locally
```bash
git clone https://github.com/c1prk/ClaudeHackathon.git
cd ClaudeHackathon
npm install
npm run dev
```

---

## 📁 Recommended Final Structure

### For Hackathon Project with Backend:
```
ClaudeHackathon/
│
├── frontend/                    ← All frontend files
│   ├── src/
│   │   ├── canvas-chatbot.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── START_HERE.md
│
├── backend/                     ← Your backend code
│   ├── app.py or server.js
│   ├── requirements.txt or package.json
│   └── ...
│
├── README.md                    ← Root README
├── .gitignore
└── docs/                        ← Optional: Documentation
    └── ...
```

### For Frontend-Only Repo:
```
ClaudeHackathon/
├── canvas-chatbot.jsx
├── api.js
├── main.jsx
├── index.html
├── styles.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── START_HERE.md
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── PROJECT_OVERVIEW.md
├── QUICK_REFERENCE.md
├── FILE_MANIFEST.md
└── .gitignore
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Clone repo
git clone https://github.com/c1prk/ClaudeHackathon.git
cd ClaudeHackathon

# Copy files (adjust path to where you downloaded them)
cp /path/to/frontend/files/* ./

# Install dependencies
npm install

# Create .gitignore
# (Use the .gitignore content from Step 5 above)

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Add complete frontend application"
git push origin main

# Done! ✅
```

---

## 🔧 Troubleshooting

### Issue: "Permission denied" when pushing
```bash
# Make sure you're authenticated
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:c1prk/ClaudeHackathon.git
```

### Issue: "Files too large"
```bash
# Make sure node_modules is in .gitignore
echo "node_modules" >> .gitignore
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

### Issue: "Merge conflicts"
```bash
# Pull latest changes first
git pull origin main --rebase

# Resolve conflicts if any
# Then push
git push origin main
```

---

## 📝 Update Your GitHub README

After uploading files, update your root README.md:

```markdown
# Canvas Course Chatbot

AI-powered chatbot for Canvas LMS courses built with React and Claude Sonnet 4.5

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📚 Documentation

- [Start Here](START_HERE.md) - Complete getting started guide
- [Quick Reference](QUICK_REFERENCE.md) - Essential commands
- [Architecture](ARCHITECTURE.md) - How it works
- [Deployment](DEPLOYMENT.md) - Deploy to production

## 🎯 Features

- **Instructor Portal**: Upload and manage course materials
- **Student Chat**: AI-powered course Q&A
- **Beautiful UI**: Responsive design with Tailwind CSS
- **Production Ready**: Error handling, loading states, mobile support

## 🛠 Tech Stack

- React 18
- Vite
- Tailwind CSS
- Claude Sonnet 4.5
- Lucide React

## 📦 Project Structure

\`\`\`
ClaudeHackathon/
├── canvas-chatbot.jsx    # Main application
├── api.js               # Backend integration
├── package.json         # Dependencies
└── docs/                # Documentation
\`\`\`

## 🏆 Hackathon

Built for the Canvas Course Chatbot Hackathon - Student Success Path

## 📄 License

MIT
```

---

## ✅ Verification Checklist

After uploading, verify:

- [ ] All files visible on GitHub repo page
- [ ] README.md displays correctly
- [ ] .gitignore excludes node_modules
- [ ] package.json is present
- [ ] Can clone and run locally
- [ ] npm install works
- [ ] npm run dev works
- [ ] App runs at localhost:3000

---

## 🎉 You're Done!

Your repo is now set up with:
- ✅ Complete frontend application
- ✅ All documentation
- ✅ Proper Git structure
- ✅ Ready for collaboration
- ✅ Ready to deploy

**Next steps:**
1. Share repo with team
2. Set up GitHub Pages (optional)
3. Connect backend
4. Deploy!

---

## 📞 Need Help?

**Common Git Commands:**
```bash
git status              # Check what changed
git add .               # Stage all files
git commit -m "msg"     # Commit with message
git push                # Push to GitHub
git pull                # Pull latest changes
git log                 # View commit history
```

**Resources:**
- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

Good luck! 🚀
