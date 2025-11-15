# Component Architecture Guide

## 📐 Application Structure

```
┌─────────────────────────────────────────┐
│              App (Root)                 │
│  - Manages routing between views        │
│  - Holds global courseData state        │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
   ┌────────┐  ┌─────────┐  ┌──────────┐
   │Landing │  │Instructor│  │ Student  │
   │  Page  │  │Dashboard │  │ Chatbot  │
   └────────┘  └─────────┘  └──────────┘
```

## 🎯 Component Breakdown

### 1. App Component (Root)
**Purpose:** Main application wrapper and router

**State:**
- `view`: Current page ('landing' | 'instructor' | 'student')
- `courseData`: Shared course information

**Functions:**
- Routes between different views
- Passes data between components

**Props:**
- None (root component)

---

### 2. LandingPage Component
**Purpose:** Entry point with two main paths

**Features:**
- Beautiful gradient background
- Two large cards for navigation
- Responsive grid layout
- Smooth hover animations

**User Actions:**
- Click "Instructor Portal" → Navigate to instructor view
- Click "Student Chat" → Navigate to student view

**Props:**
- `setView(view)`: Function to change current view

**Styling Notes:**
- Uses Tailwind gradient backgrounds
- Cards use shadow and transform effects
- Icons from Lucide React

---

### 3. InstructorDashboard Component
**Purpose:** File upload and course management interface

**State:**
```javascript
uploadedFiles: []          // Array of uploaded file objects
isProcessing: false        // Processing status
courseName: ''             // Course name input
instructorName: ''         // Instructor name input
processedData: null        // Claude API response
```

**Key Features:**

#### A. Course Information Section
- Input for course name (required)
- Input for instructor name (optional)
- Real-time validation

#### B. File Upload Area
- Drag-and-drop interface
- Click to upload
- Multiple file support
- Accepted formats: PDF, DOCX, TXT, HTML

#### C. Uploaded Files List
- Shows file name and size
- Delete button for each file
- Visual file icons
- Gray background cards

#### D. Status Panel
- Files uploaded count
- Processing status indicator
- Course information summary
- Visual status badges

#### E. Process Button
- Disabled when no files or no course name
- Shows loading spinner during processing
- Triggers Claude API call

#### F. Results Panel (appears after processing)
- Success indicator
- Download JSON button
- Test chatbot button
- Course data preview

**Functions:**
```javascript
handleFileUpload(event)    // Adds files to state
removeFile(id)             // Removes a file
processFiles()             // Calls Claude API
downloadJSON()             // Downloads processed data
```

**Props:**
- `courseData`: Current course data
- `setCourseData(data)`: Update global course data
- `setView(view)`: Navigate to other views

**Backend Integration Point:**
```javascript
// Replace setTimeout in processFiles() with:
const data = await processCourseFiles(courseName, instructorName, uploadedFiles);
```

---

### 4. StudentChatbot Component
**Purpose:** Chat interface for students

**State:**
```javascript
messages: []               // Chat message history
inputMessage: ''           // Current input text
isTyping: false           // AI typing indicator
```

**Message Structure:**
```javascript
{
  id: number,              // Unique ID
  role: 'user' | 'assistant',
  content: string,         // Message text
  timestamp: Date
}
```

**Key Features:**

#### A. Header Section
- Course name display
- Instructor name
- Online status indicator
- Back button

#### B. Messages Area
- Scrollable chat history
- User messages (right-aligned, blue)
- AI messages (left-aligned, gray)
- Timestamps on all messages
- Typing indicator (animated dots)

#### C. Suggested Questions
- Only shows on first message
- Clickable question chips
- Fills input on click
- Disappears after first interaction

#### D. Input Section
- Text input field
- Send button with icon
- Enter key support
- Disabled during AI response
- Disclaimer text

**Functions:**
```javascript
sendMessage()              // Sends user message, gets AI response
scrollToBottom()           // Auto-scrolls to latest message
handleSuggestedQuestion()  // Fills input with suggestion
generateMockResponse()     // Mock AI responses (replace with API)
```

**Props:**
- `courseData`: Course information for context
- `setView(view)`: Navigate to other views

**Backend Integration Point:**
```javascript
// Replace setTimeout in sendMessage() with:
const response = await sendChatMessage(inputMessage, courseData, messages);
```

---

## 🎨 Styling System

### Color Palette
```
Primary (Indigo):    #4F46E5 (indigo-600)
Secondary (Purple):  #9333EA (purple-600)
Student (Blue):      #2563EB (blue-600)
Success (Green):     #059669 (green-600)
Error (Red):         #DC2626 (red-600)
Gray Scale:          50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

### Responsive Breakpoints (Tailwind)
```
sm:  640px   - Small devices
md:  768px   - Medium devices
lg:  1024px  - Large devices
xl:  1280px  - Extra large devices
2xl: 1536px  - 2XL devices
```

### Common Utilities Used
- `rounded-xl`: 12px border radius
- `rounded-2xl`: 16px border radius
- `shadow-lg`: Large box shadow
- `p-6`: 1.5rem padding
- `gap-4`: 1rem gap
- `transition-all`: Smooth transitions

---

## 🔄 Data Flow

### Instructor Flow
```
1. User enters course info
   └─> State: courseName, instructorName

2. User uploads files
   └─> State: uploadedFiles[]

3. User clicks "Process with Claude AI"
   └─> API Call: processCourseFiles()
   └─> State: processedData
   └─> Global: setCourseData()

4. User downloads JSON or tests chatbot
   └─> Downloads file or navigates to student view
```

### Student Flow
```
1. Component loads with courseData
   └─> Displays welcome message

2. User types question
   └─> State: inputMessage

3. User sends message
   └─> Add to messages[]
   └─> API Call: sendChatMessage()
   └─> AI response added to messages[]

4. User continues conversation
   └─> Repeat step 2-3
```

---

## 🔌 API Integration Points

### File Processing
**Location:** InstructorDashboard.processFiles()
```javascript
// Current: Mock with setTimeout
// Replace with:
const data = await processCourseFiles(courseName, instructorName, uploadedFiles);
```

### Chat Messaging
**Location:** StudentChatbot.sendMessage()
```javascript
// Current: Mock response
// Replace with:
const response = await sendChatMessage(inputMessage, courseData, messages);
```

### Optional: Streaming
**Location:** StudentChatbot.sendMessage()
```javascript
// For real-time responses:
await streamChatMessage(inputMessage, courseData, (chunk) => {
  // Update message content incrementally
});
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked navigation cards
- Full-width components
- Larger touch targets
- Simplified headers

### Tablet (768px - 1024px)
- 2-column grid for landing cards
- Sidebar collapses
- Adjusted padding
- Optimized file list

### Desktop (> 1024px)
- 3-column layout in instructor view
- Side-by-side panels
- Maximum width containers
- Enhanced hover effects

---

## 🎯 Key User Interactions

### Instructor Portal
1. **File Upload**
   - Click or drag files
   - Visual feedback on upload
   - File list with remove option

2. **Processing**
   - Loading state with spinner
   - Disabled during processing
   - Success/error feedback

3. **Results**
   - Download JSON
   - Navigate to test chatbot
   - View processing summary

### Student Chat
1. **Asking Questions**
   - Type in input field
   - Press Enter or click Send
   - See message appear instantly

2. **Receiving Responses**
   - Typing indicator appears
   - AI response streams in
   - Timestamp added
   - Auto-scroll to bottom

3. **Using Suggestions**
   - Click suggested question
   - Input filled automatically
   - Ready to send

---

## 🛠 Customization Guide

### Adding New File Types
```javascript
// In InstructorDashboard
<input
  accept=".pdf,.docx,.txt,.html,.pptx,.xlsx"  // Add here
  // ...
/>
```

### Changing Theme Colors
```javascript
// Find and replace these classes:
'indigo-600'  → 'blue-600'    // Primary color
'purple-600'  → 'pink-600'    // Secondary color
'bg-gradient-to-br from-blue-50 to-indigo-100' // Background
```

### Modifying Suggested Questions
```javascript
// In StudentChatbot
const suggestedQuestions = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more...
];
```

### Adding New Status Indicators
```javascript
// In InstructorDashboard status card
<div className="flex items-center justify-between">
  <span className="text-sm text-gray-600">Your Label</span>
  <span className="font-semibold text-gray-900">Your Value</span>
</div>
```

---

## 🔍 Debugging Tips

### Component Not Rendering?
1. Check console for errors
2. Verify state values
3. Check conditional rendering logic
4. Ensure props are passed correctly

### Styles Not Applying?
1. Check Tailwind classes are correct
2. Verify PostCSS is running
3. Clear cache and rebuild
4. Check for conflicting styles

### API Not Working?
1. Check network tab in DevTools
2. Verify API URL in .env
3. Check CORS on backend
4. Look for error logs

---

## 📚 Dependencies Used

- **react**: Core framework
- **react-dom**: DOM rendering
- **lucide-react**: Icon library
- **tailwindcss**: Utility CSS framework
- **vite**: Build tool

All icons used (from Lucide):
- Upload, Send, Book, MessageSquare
- FileText, Trash2, Download
- GraduationCap, ChevronRight, Sparkles

---

This architecture is designed for:
✅ Easy maintenance
✅ Quick customization
✅ Simple backend integration
✅ Scalable structure
✅ Excellent UX
