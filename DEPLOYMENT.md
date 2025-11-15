# Deployment & Integration Checklist

## 🎯 Pre-Deployment Checklist

### Local Development
- [ ] All dependencies installed (`npm install`)
- [ ] Development server runs (`npm run dev`)
- [ ] No console errors in browser
- [ ] All three views work (Landing, Instructor, Student)
- [ ] File upload UI functional
- [ ] Chat interface responsive

### Backend Integration
- [ ] Backend API endpoints created
- [ ] `.env` file configured with API URL
- [ ] API functions imported from `api.js`
- [ ] Error handling tested
- [ ] CORS configured on backend
- [ ] Test with real Claude API calls

### Testing
- [ ] File upload tested with actual files
- [ ] Chat responses working with real data
- [ ] Course data persists between views
- [ ] Mobile responsive (test on phone)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

## 🚀 Deployment Guide

### Step 1: Build for Production
```bash
npm run build
```

Verify the `dist/` folder is created with:
- `index.html`
- `assets/` folder with JS and CSS

### Step 2: Environment Variables

**For Vercel/Netlify:**
Set these in your dashboard:
```
VITE_API_URL=https://your-backend-api.com
```

**For other platforms:**
Create `.env.production`:
```
VITE_API_URL=https://your-backend-api.com
```

### Step 3: Deploy Frontend

#### Option A: Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Project name? canvas-chatbot
# - Deploy? Yes
```

**Custom domain (optional):**
```bash
vercel --prod
vercel domains add your-domain.com
```

#### Option B: Netlify
```bash
npm i -g netlify-cli
netlify login
netlify deploy

# For production:
netlify deploy --prod
```

**Netlify via Dashboard:**
1. Go to netlify.com
2. Drag and drop `dist/` folder
3. Set environment variables in Site Settings

#### Option C: GitHub Pages
```bash
# Add to package.json:
"homepage": "https://yourusername.github.io/canvas-chatbot",

# Install gh-pages:
npm install --save-dev gh-pages

# Add to scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy:
npm run deploy
```

### Step 4: Backend Deployment

Your backend needs to handle:

**POST /api/process-course**
```python
# Flask example
@app.route('/api/process-course', methods=['POST'])
def process_course():
    course_name = request.form.get('courseName')
    instructor_name = request.form.get('instructorName')
    files = request.files.getlist('files')
    
    # Process with Claude API
    processed_data = process_with_claude(files, course_name)
    
    return jsonify(processed_data)
```

**POST /api/chat**
```python
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    course_data = data['courseData']
    history = data['conversationHistory']
    
    # Call Claude API
    response = get_claude_response(message, course_data, history)
    
    return jsonify({'content': response})
```

**Enable CORS:**
```python
from flask_cors import CORS
CORS(app, origins=['https://your-frontend-url.vercel.app'])
```

### Step 5: Connect Frontend to Backend

Update `.env` with deployed backend URL:
```
VITE_API_URL=https://your-backend.railway.app
```

Redeploy frontend:
```bash
vercel --prod  # or
netlify deploy --prod
```

## 🔒 Security Checklist

- [ ] API keys not in frontend code
- [ ] CORS properly configured
- [ ] Rate limiting on backend
- [ ] File size limits enforced
- [ ] Input validation on backend
- [ ] HTTPS enabled (automatic on Vercel/Netlify)

## 📊 Performance Optimization

### Frontend
- [ ] Images optimized (if any added)
- [ ] Lazy loading implemented for routes
- [ ] Bundle size checked (`npm run build`)
- [ ] Lighthouse score > 90

### Backend
- [ ] Response caching for common questions
- [ ] File upload size limits
- [ ] Claude API rate limiting
- [ ] Database indexing (if using DB)

## 🧪 Testing Post-Deployment

### Functionality Tests
1. **Upload Test**
   - Upload a PDF syllabus
   - Verify processing completes
   - Check JSON download works

2. **Chat Test**
   - Ask about assignment deadlines
   - Ask about grading policy
   - Verify responses use course context

3. **Navigation Test**
   - Landing → Instructor → Student
   - Instructor → Test Chatbot
   - Back buttons work

4. **Mobile Test**
   - Open on mobile device
   - Test file upload
   - Test chat interface
   - Check responsive design

### Load Testing
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test chat endpoint
ab -n 100 -c 10 https://your-api.com/api/chat
```

## 📈 Monitoring

### Frontend Monitoring
- Set up Vercel Analytics (free)
- Monitor build times
- Check error logs

### Backend Monitoring
- Log all API calls
- Monitor Claude API usage
- Track response times
- Set up error alerts

## 🐛 Common Deployment Issues

### Issue: CORS Error
**Solution:**
```python
# Backend - allow your frontend domain
CORS(app, origins=['https://your-frontend.vercel.app'])
```

### Issue: API URL not updating
**Solution:**
1. Clear build cache
2. Rebuild: `rm -rf dist && npm run build`
3. Redeploy

### Issue: File uploads fail
**Solution:**
1. Check backend max file size
2. Verify FormData sending correctly
3. Check backend logs

### Issue: Environment variables not working
**Solution:**
1. Prefix with `VITE_`
2. Restart dev server
3. For production, set in platform dashboard

## 📝 Handoff Documentation

### For Your Team

**Frontend Developer Notes:**
- Main component: `canvas-chatbot.jsx`
- API integration: `api.js`
- Styling: Tailwind CSS utility classes
- State management: React hooks (useState)

**Backend Developer Notes:**
- Expected endpoints in `api.js`
- File upload via FormData
- Chat expects JSON response
- Course data structure in README

**Deployment Notes:**
- Frontend: Vercel (auto-deploy from git)
- Backend: Railway/Render
- Environment variables documented
- CORS configured for production URLs

## ✅ Final Verification

Before presenting:
- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] End-to-end test completed
- [ ] Mobile experience verified
- [ ] Demo script prepared
- [ ] Screenshots taken
- [ ] GitHub README updated

## 🎬 Demo Script

**Introduction (30s)**
"We built an AI-powered Canvas chatbot that helps students get instant answers about course content."

**Instructor Demo (60s)**
1. Show instructor portal
2. Upload sample syllabus
3. Process with Claude
4. Show generated JSON

**Student Demo (60s)**
1. Switch to student chat
2. Ask about deadlines
3. Ask about grading
4. Show relevant responses

**Technical Highlights (30s)**
"Built with React and Claude Sonnet 4.5, deployed on Vercel, with automatic course content parsing."

## 🎉 You're Live!

Your Canvas Course Chatbot is now deployed and ready to demo!

**Quick Links Template:**
```
🔗 Live Demo: https://your-app.vercel.app
📦 GitHub: https://github.com/yourusername/canvas-chatbot
📄 Docs: https://your-app.vercel.app/docs
```

Good luck with your hackathon presentation! 🚀
