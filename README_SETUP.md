# Canvas Course Chatbot - Complete Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites
- Node.js 16+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### 2. Installation

```bash
# Clone or navigate to the project directory
cd ClaudeHackathon

# Install dependencies
npm install
cd backend && npm install && cd ..
```

### 3. Configure API Key

```bash
# Copy the example env file
cp backend/.env.example backend/.env

# Edit the .env file and add your API key
nano backend/.env  # or use your preferred editor
```

Update this line in `backend/.env`:
```
ANTHROPIC_API_KEY=your-actual-api-key-here
```

### 4. Start the Application

**Option A: Using the startup script (recommended)**
```bash
chmod +x start.sh
./start.sh
```

**Option B: Manual start (two terminals)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## Features

### Instructor Portal
1. Enter course name and instructor information
2. Upload course materials (PDF, DOCX, TXT, HTML)
3. Process files with Claude AI to extract key information
4. Download processed data as JSON
5. Test the chatbot directly

### Student Chat
1. Ask questions about course content
2. Get AI-powered responses based on uploaded materials
3. View conversation history
4. Suggested questions for quick start

## Project Structure

```
ClaudeHackathon/
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── canvas-chatbot.jsx # Main application
│   │   ├── main.jsx           # Entry point
│   │   └── styles.css
│   ├── index.html
│   └── ...config files
├── backend/                   # Express backend
│   ├── server.js              # API server with Claude integration
│   ├── .env                   # Environment variables (create this!)
│   └── package.json
├── start.sh                   # Startup script
└── package.json               # Frontend dependencies
```

## API Endpoints

### POST /api/process-course
Upload and process course files with Claude AI.

**Request:**
- Content-Type: multipart/form-data
- Body:
  - `courseName` (string, required)
  - `instructorName` (string, optional)
  - `files` (files, required)

**Response:**
```json
{
  "courseName": "Introduction to CS",
  "instructorName": "Dr. Smith",
  "files": ["syllabus.pdf"],
  "totalFiles": 1,
  "processedAt": "2025-11-16T...",
  "extractedInfo": "...",
  "content": { ... }
}
```

### POST /api/chat
Send a chat message and get AI response.

**Request:**
```json
{
  "message": "What are the assignment deadlines?",
  "courseData": { ... },
  "conversationHistory": [ ... ]
}
```

**Response:**
```json
{
  "response": "Based on the course materials...",
  "timestamp": "2025-11-16T..."
}
```

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify ANTHROPIC_API_KEY is set in `backend/.env`
- Run `cd backend && npm install` to ensure dependencies are installed

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in the root directory
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### API errors
- Verify backend is running on http://localhost:5000
- Check backend logs for error messages
- Verify your API key is valid and has credits

### File upload issues
- Check file size (max 10MB per file)
- Ensure file types are supported (PDF, DOCX, TXT, HTML)
- Check backend logs for processing errors

## Development

### Frontend Development
```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev         # Start with nodemon (auto-reload)
npm start           # Start normally
```

## Tech Stack

**Frontend:**
- React 18.2.0
- Vite 4.3.9
- Tailwind CSS 3.3.2
- Lucide React (icons)

**Backend:**
- Node.js + Express 4.18.2
- Anthropic Claude Sonnet 4.5 API
- Multer (file uploads)
- CORS enabled

## License

This is a hackathon project. Use freely!

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs for errors
3. Verify all dependencies are installed
4. Ensure API key is correctly configured

---

Built with ❤️ for the Canvas Hackathon
