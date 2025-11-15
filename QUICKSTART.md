# Quick Start Guide - Canvas Course Chatbot Frontend

Get up and running in 5 minutes! ⚡

## 🚀 Super Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

That's it! The app is now running.

## 📱 What You'll See

### Landing Page
- Two options: **Instructor Portal** and **Student Chat**
- Click either to navigate to the respective interface

### Instructor Portal
1. Enter course name (required)
2. Add instructor name (optional)
3. Upload course files (PDF, DOCX, TXT, HTML)
4. Click "Process with Claude AI"
5. Download JSON or test chatbot

### Student Chat
1. Ask questions about the course
2. Use suggested questions to get started
3. Get AI-powered responses
4. View conversation history

## 🔌 Connect to Your Backend

### Option 1: Quick Integration (Recommended for Hackathon)

Replace the mock functions in `canvas-chatbot.jsx`:

**For File Processing (Line ~280):**
```javascript
// Import at the top
import { processCourseFiles } from './api.js';

// Replace the processFiles function
const processFiles = async () => {
  setIsProcessing(true);
  try {
    const data = await processCourseFiles(courseName, instructorName, uploadedFiles);
    setProcessedData(data);
    setCourseData(data);
  } catch (error) {
    alert('Error processing files: ' + error.message);
  }
  setIsProcessing(false);
};
```

**For Chat Messages (Line ~470):**
```javascript
// Import at the top
import { sendChatMessage } from './api.js';

// Replace the sendMessage function
const sendMessage = async () => {
  // ... existing code for adding user message ...
  
  setIsTyping(true);
  try {
    const response = await sendChatMessage(inputMessage, courseData, messages);
    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: response.content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    alert('Error getting response: ' + error.message);
  }
  setIsTyping(false);
};
```

### Option 2: Use Provided API Functions

The `api.js` file includes ready-to-use functions:
- `processCourseFiles(courseName, instructorName, files)`
- `sendChatMessage(message, courseData, conversationHistory)`
- `parseFile(file)` - for individual file parsing
- `streamChatMessage(message, courseData, onChunk)` - for streaming responses

Just import and use them!

## 🎯 Backend API Endpoints Expected

Your backend should implement these endpoints:

```
POST /api/process-course
- Body: FormData with courseName, instructorName, and files
- Returns: { courseName, instructorName, files, processedAt, content }

POST /api/chat
- Body: { message, courseData, conversationHistory }
- Returns: { content: "AI response" }

POST /api/parse-file (optional)
- Body: FormData with single file
- Returns: { parsed content }
```

## ⚙️ Configuration

Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

## 🎨 Customization Tips

### Change Colors
All colors use Tailwind classes. Main colors:
- Primary: `indigo-600` (blue-purple)
- Secondary: `purple-600` (purple)
- Student chat: `blue-600` (blue)

Find/replace in `canvas-chatbot.jsx` to change theme.

### Add More File Types
In InstructorDashboard, modify:
```javascript
accept=".pdf,.docx,.txt,.html,.pptx,.xlsx"
```

### Modify Suggested Questions
In StudentChatbot component, edit:
```javascript
const suggestedQuestions = [
  "Your question 1",
  "Your question 2",
];
```

## 🐛 Common Issues

**Styles not loading?**
```bash
npm install -D tailwindcss postcss autoprefixer
```

**Port 3000 in use?**
```bash
npm run dev -- --port 3001
```

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Deployment

### Vercel (1 minute)
```bash
npm i -g vercel
vercel
```

### Netlify (1 minute)
```bash
npm i -g netlify-cli
netlify deploy
```

### Manual
```bash
npm run build
# Upload dist/ folder to your host
```

## 🔥 Pro Tips

1. **Test with mock data first** - The app works out of the box with simulated responses
2. **Focus on backend integration** - All UI is done, just connect your API
3. **Use the api.js helpers** - They handle errors and formatting
4. **Check console for errors** - All API calls log errors
5. **Mobile-first** - App is fully responsive, test on phone too!

## 📝 File Structure Quick Reference

```
├── canvas-chatbot.jsx    ← Main app (3 components)
├── api.js               ← Backend integration helpers
├── main.jsx             ← React entry point
├── index.html           ← HTML template
├── styles.css           ← Tailwind directives
├── package.json         ← Dependencies
└── README.md            ← Full documentation
```

## ✅ Verification Checklist

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server
- [ ] Landing page loads at localhost:3000
- [ ] Can navigate to Instructor Portal
- [ ] Can navigate to Student Chat
- [ ] File upload UI works (even without backend)
- [ ] Chat interface shows messages
- [ ] Suggested questions clickable

## 🏆 You're Ready!

Your frontend is complete and production-ready. Now:

1. **Connect to backend** using `api.js` functions
2. **Test end-to-end** with real file uploads
3. **Deploy** to show off your work
4. **Demo** and win that hackathon! 🎉

Need help? Check README.md for detailed docs.

---

**Built for hackathon success** ⚡
