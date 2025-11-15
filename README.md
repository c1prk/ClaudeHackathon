# Canvas Course Chatbot - Frontend

A modern React-based chatbot application with separate interfaces for instructors and students. Built for the Canvas Course Chatbot hackathon project.

## 🎯 Features

### Instructor Portal
- **Course Information Management**: Set course name and instructor details
- **File Upload System**: Drag-and-drop interface for uploading course materials (PDF, DOCX, TXT, HTML)
- **Claude AI Integration**: Process uploaded files using Claude API to extract course content
- **JSON Export**: Download processed course data as JSON
- **Real-time Status**: Monitor upload and processing status
- **Quick Test**: Directly test the chatbot after processing files

### Student Chat Interface
- **AI-Powered Responses**: Get instant answers about course content
- **Suggested Questions**: Quick-start prompts for common queries
- **Real-time Chat**: Smooth messaging experience with typing indicators
- **Course Context Aware**: Responses tailored to uploaded course materials
- **Clean UI**: Modern, accessible interface built with Tailwind CSS

## 🛠 Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Claude API**: AI-powered responses (Sonnet 4.5)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Claude API key (from hackathon or Anthropic)

### Setup Steps

1. **Clone or download the project files**
```bash
# If you have all files in a directory, navigate to it
cd canvas-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
The app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
canvas-chatbot/
├── index.html              # Main HTML file
├── main.jsx               # React entry point
├── canvas-chatbot.jsx     # Main application component
├── styles.css             # Global styles with Tailwind
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── README.md             # This file
```

## 🎨 Component Architecture

### Main Components

1. **App**: Root component with routing logic
2. **LandingPage**: Initial view with instructor/student selection
3. **InstructorDashboard**: File upload and course management interface
4. **StudentChatbot**: Chat interface for students

### State Management
- Uses React hooks (useState, useRef, useEffect)
- Course data flows from InstructorDashboard to StudentChatbot
- No external state management library needed

## 🔌 Backend Integration Points

The frontend is designed to integrate with your backend. Here are the key integration points:

### 1. File Processing (Instructor Side)
```javascript
// In InstructorDashboard component, processFiles function
// Current: Simulated with setTimeout
// Replace with actual API call:

const processFiles = async () => {
  const formData = new FormData();
  formData.append('courseName', courseName);
  formData.append('instructorName', instructorName);
  uploadedFiles.forEach(f => formData.append('files', f.file));

  const response = await fetch('/api/process-course', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  setProcessedData(data);
  setCourseData(data);
};
```

### 2. Chat Messages (Student Side)
```javascript
// In StudentChatbot component, sendMessage function
// Current: Simulated response
// Replace with actual API call:

const sendMessage = async () => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: inputMessage,
      courseData: courseData,
      conversationHistory: messages
    })
  });
  
  const data = await response.json();
  const aiMessage = {
    id: Date.now(),
    role: 'assistant',
    content: data.response,
    timestamp: new Date()
  };
  setMessages(prev => [...prev, aiMessage]);
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy Options

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy
```

**Manual Deployment**
1. Run `npm run build`
2. Upload contents of `dist/` folder to your hosting service

## 🎯 Usage Guide

### For Instructors

1. **Access Instructor Portal**: Click "Instructor Portal" from landing page
2. **Enter Course Info**: Fill in course name (required) and instructor name
3. **Upload Files**: 
   - Click upload area or drag files
   - Supported: PDF, DOCX, TXT, HTML
   - Upload syllabus, assignments, policies, etc.
4. **Process Files**: Click "Process with Claude AI"
5. **Download/Test**: Download JSON or test the chatbot

### For Students

1. **Access Chat**: Click "Student Chat" from landing page
2. **Ask Questions**: Type questions about course content
3. **Use Suggestions**: Click suggested questions for quick answers
4. **Get Instant Help**: Receive AI-powered responses about:
   - Assignment deadlines
   - Grading policies
   - Course topics
   - Office hours
   - And more!

## 🔧 Customization

### Modify Suggested Questions
In `StudentChatbot` component:
```javascript
const suggestedQuestions = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more...
];
```

### Change Color Scheme
In `tailwind.config.js`, extend the theme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Modify File Upload Limits
In `InstructorDashboard` component:
```javascript
<input
  accept=".pdf,.docx,.txt,.html,.pptx,.xlsx"  // Add more types
  // ...
/>
```

## 📝 Environment Variables

Create a `.env` file for backend API URLs:
```
VITE_API_URL=http://localhost:5000
VITE_CLAUDE_API_KEY=your_api_key_here
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

### Tailwind Styles Not Loading
```bash
# Rebuild with Tailwind
npm run build
```

## 🤝 Contributing

This is a hackathon project! Feel free to:
- Add new features
- Improve UI/UX
- Optimize performance
- Fix bugs

## 📄 License

MIT License - feel free to use for your hackathon projects!

## 🏆 Hackathon Notes

**Track**: Student Success Path  
**Prize**: $300 API Credits  
**Time**: 5-hour sprint  
**Team Role**: Frontend Developer (Person 3)

### Key Deliverables
- ✅ Clean chat interface
- ✅ File upload system
- ✅ Instructor dashboard
- ✅ Student chatbot
- ✅ Mobile responsive
- ✅ Ready for backend integration

## 📞 Support

For questions or issues:
- Check the troubleshooting section
- Review component comments in code
- Test with mock data first before backend integration

---

**Built with ❤️ for the Canvas Course Chatbot Hackathon**
