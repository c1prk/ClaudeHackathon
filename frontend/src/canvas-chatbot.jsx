import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, Book, MessageSquare, FileText, Trash2, Download, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';

// Main App Component with Router
const App = () => {
  const [view, setView] = useState('landing'); // landing, instructor, student
  const [courseData, setCourseData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {view === 'landing' && <LandingPage setView={setView} />}
      {view === 'instructor' && <InstructorDashboard courseData={courseData} setCourseData={setCourseData} setView={setView} />}
      {view === 'student' && <StudentChatbot courseData={courseData} setView={setView} />}
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ setView }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-4 rounded-2xl">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Canvas Course Chatbot
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            AI-powered assistant for your course content
          </p>
          <p className="text-sm text-gray-500">
            Built with Claude AI & React
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Instructor Card */}
          <button
            onClick={() => setView('instructor')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group"
          >
            <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Instructor Portal
            </h2>
            <p className="text-gray-600 mb-4">
              Upload course materials, manage content, and configure your course chatbot
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
              Get Started <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          {/* Student Card */}
          <button
            onClick={() => setView('student')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Student Chat
            </h2>
            <p className="text-gray-600 mb-4">
              Ask questions about course content, assignments, deadlines, and policies
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
              Start Chatting <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-indigo-600">Claude Sonnet 4.5</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Instructor Dashboard Component
const InstructorDashboard = ({ courseData, setCourseData, setView }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      file: file
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file');
      return;
    }
    if (!courseName.trim()) {
      alert('Please enter a course name');
      return;
    }

    setIsProcessing(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('courseName', courseName);
      formData.append('instructorName', instructorName);

      // Add all files to FormData
      uploadedFiles.forEach(fileObj => {
        formData.append('files', fileObj.file);
      });

      // Call backend API
      const response = await fetch('http://localhost:5000/api/process-course', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process files');
      }

      const processedData = await response.json();

      setProcessedData(processedData);
      setCourseData(processedData);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files: ' + error.message);
      setIsProcessing(false);
    }
  };

  const downloadJSON = () => {
    if (!processedData) return;
    
    const dataStr = JSON.stringify(processedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${courseName.replace(/\s+/g, '_')}_course_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => setView('landing')}
              className="text-indigo-600 hover:text-indigo-700 mb-2 flex items-center gap-1 text-sm font-medium"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-2">Upload and manage your course materials</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Course Info & Upload */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Introduction to Computer Science"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    placeholder="e.g., Dr. Jane Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Course Materials</h2>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PDF, DOCX, TXT, HTML files (Max 10MB each)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.docx,.txt,.html,.doc"
                />
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {uploadedFiles.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={processFiles}
                disabled={isProcessing || uploadedFiles.length === 0 || !courseName.trim()}
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Files...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Process with Claude AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Status & Preview */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Files Uploaded</span>
                  <span className="font-semibold text-gray-900">{uploadedFiles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Processing Status</span>
                  <span className={`text-sm font-semibold ${processedData ? 'text-green-600' : 'text-gray-400'}`}>
                    {processedData ? 'Complete' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Course Name</span>
                  <span className="font-semibold text-gray-900 text-right text-sm">
                    {courseName || 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            {/* Processed Data Preview */}
            {processedData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Processed Data</h3>
                <div className="space-y-3 mb-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">
                      ✓ Course data processed successfully!
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Course:</strong> {processedData.courseName}</p>
                    <p><strong>Instructor:</strong> {processedData.instructorName}</p>
                    <p><strong>Files:</strong> {processedData.totalFiles}</p>
                  </div>
                </div>
                
                <button
                  onClick={downloadJSON}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download JSON
                </button>

                <button
                  onClick={() => setView('student')}
                  className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Test Chatbot
                </button>
              </div>
            )}

            {/* Help Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Quick Guide</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span>Enter your course name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span>Upload syllabus, assignments, and course materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span>Click "Process with Claude AI" to parse content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span>Download JSON or test the chatbot</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Chatbot Component
const StudentChatbot = ({ courseData, setView }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: courseData 
        ? `Welcome to the ${courseData.courseName} chatbot! I'm here to help you with any questions about the course. What would you like to know?`
        : "Welcome! I'm your course assistant. Please note: The instructor hasn't uploaded course materials yet. Ask me anything and I'll do my best to help!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What are the upcoming assignment deadlines?",
    "Can you explain the grading policy?",
    "What topics will be covered in this course?",
    "When are office hours?",
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          courseData: courseData,
          conversationHistory: updatedMessages.filter(m => m.role !== 'system')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);

      // Fallback to mock response if API fails
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: courseData
          ? `Based on the course materials for ${courseData.courseName}, here's what I found:\n\n${generateMockResponse(inputMessage)}`
          : `I'd be happy to help! However, I'm having trouble connecting to the server. Please make sure the backend is running on http://localhost:5000`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }
  };

  const generateMockResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('deadline') || lowerQuestion.includes('due')) {
      return "Here are the upcoming assignment deadlines:\n• Assignment 1: Due Nov 20, 2025\n• Assignment 2: Due Nov 27, 2025\n• Assignment 3: Due Dec 4, 2025\n\nAll assignments are due at 11:59 PM EST.";
    } else if (lowerQuestion.includes('grading') || lowerQuestion.includes('grade')) {
      return "The grading policy for this course is:\n• Assignments: 40%\n• Midterm Exam: 25%\n• Final Exam: 25%\n• Participation: 10%\n\nLate submissions receive a 10% deduction per day.";
    } else if (lowerQuestion.includes('office') || lowerQuestion.includes('hours')) {
      return "Office hours are held:\n• Tuesdays: 2:00 PM - 4:00 PM\n• Thursdays: 3:00 PM - 5:00 PM\n\nLocation: Room 301 or via Zoom (link in syllabus)";
    } else {
      return "I can help you with information about assignments, deadlines, course policies, grading, office hours, and general course content. Could you please be more specific about what you'd like to know?";
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('landing')}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {courseData?.courseName || 'Course Chatbot'}
                </h1>
                {courseData?.instructorName && (
                  <p className="text-sm text-gray-600">Instructor: {courseData.instructorName}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Active</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white px-6 py-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-5 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="bg-white px-6 py-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-sm bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask a question about the course..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by Claude Sonnet 4.5 • Responses may not always be accurate
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
