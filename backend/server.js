require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'your-api-key-here',
});

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Process course files endpoint
app.post('/api/process-course', upload.array('files', 10), async (req, res) => {
  try {
    const { courseName, instructorName } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    if (!courseName) {
      return res.status(400).json({ error: 'Course name is required' });
    }

    console.log(`Processing ${files.length} files for course: ${courseName}`);

    // Read file contents
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const content = fs.readFileSync(file.path, 'utf8');
          return {
            name: file.originalname,
            content: content.substring(0, 5000), // Limit to first 5000 chars per file
          };
        } catch (error) {
          console.error(`Error reading file ${file.originalname}:`, error);
          return {
            name: file.originalname,
            content: '[Error reading file]',
          };
        }
      })
    );

    // Combine all file contents
    const combinedContent = fileContents
      .map(f => `=== ${f.name} ===\n${f.content}`)
      .join('\n\n');

    // Use Claude to extract key information from course materials
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `You are analyzing course materials for "${courseName}"${instructorName ? ` taught by ${instructorName}` : ''}.

Extract and structure the following information from these course documents:
1. Course overview/description
2. Key topics covered
3. Assignment deadlines and details
4. Grading policy
5. Important dates
6. Office hours (if mentioned)
7. Course policies

Here are the course materials:

${combinedContent}

Provide a structured JSON response with the extracted information.`
        }
      ]
    });

    const claudeResponse = message.content[0].text;

    // Clean up uploaded files
    files.forEach(file => {
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.error(`Error deleting file ${file.path}:`, err);
      }
    });

    // Return processed data
    const processedData = {
      courseName,
      instructorName: instructorName || 'Not specified',
      files: files.map(f => f.originalname),
      totalFiles: files.length,
      processedAt: new Date().toISOString(),
      extractedInfo: claudeResponse,
      content: {
        rawExtraction: claudeResponse,
      }
    };

    res.json(processedData);
  } catch (error) {
    console.error('Error processing course files:', error);
    res.status(500).json({
      error: 'Error processing files',
      message: error.message
    });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, courseData, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received chat message:', message);

    // Build context from course data
    let systemPrompt = 'You are a helpful course assistant chatbot.';

    if (courseData) {
      systemPrompt = `You are a helpful assistant for the course "${courseData.courseName}"${courseData.instructorName !== 'Not specified' ? ` taught by ${courseData.instructorName}` : ''}.

Course information:
${courseData.extractedInfo || 'No course materials have been processed yet.'}

Answer student questions based on this course information. Be helpful, concise, and accurate. If you don't have information about something, say so clearly.`;
    }

    // Build conversation messages
    const messages = [];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content
          });
        }
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    });

    const aiResponse = response.content[0].text;

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({
      error: 'Error processing chat message',
      message: error.message
    });
  }
});

// Parse individual file endpoint
app.post('/api/parse-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const content = fs.readFileSync(req.file.path, 'utf8');

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      filename: req.file.originalname,
      content: content.substring(0, 10000), // First 10000 chars
      size: req.file.size
    });
  } catch (error) {
    console.error('Error parsing file:', error);
    res.status(500).json({
      error: 'Error parsing file',
      message: error.message
    });
  }
});

// Simple echo endpoint for testing
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body });
});

// Start server
app.listen(port, () => {
  console.log('===========================================');
  console.log('🚀 Canvas Course Chatbot Backend Server');
  console.log('===========================================');
  console.log(`📡 Server running on: http://localhost:${port}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log('===========================================');

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    console.log('⚠️  WARNING: ANTHROPIC_API_KEY not set!');
    console.log('   Create a .env file with your API key');
    console.log('===========================================');
  }
});
