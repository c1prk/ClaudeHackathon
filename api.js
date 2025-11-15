// API utility functions for backend integration
// Replace the mock responses in the components with these functions

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Process course files with Claude API
 * @param {Object} data - Course data including files
 * @returns {Promise<Object>} Processed course data
 */
export const processCourseFiles = async (courseName, instructorName, files) => {
  const formData = new FormData();
  formData.append('courseName', courseName);
  formData.append('instructorName', instructorName);
  
  files.forEach((fileObj) => {
    formData.append('files', fileObj.file);
  });

  try {
    const response = await fetch(`${API_URL}/api/process-course`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing course files:', error);
    throw error;
  }
};

/**
 * Send a chat message and get AI response
 * @param {string} message - User message
 * @param {Object} courseData - Course context data
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<Object>} AI response
 */
export const sendChatMessage = async (message, courseData, conversationHistory) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        courseData,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Upload and parse a single file with Claude
 * @param {File} file - File to parse
 * @returns {Promise<Object>} Parsed content
 */
export const parseFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/api/parse-file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error parsing file:', error);
    throw error;
  }
};

/**
 * Stream chat response (for real-time responses)
 * @param {string} message - User message
 * @param {Object} courseData - Course context
 * @param {Function} onChunk - Callback for each chunk
 */
export const streamChatMessage = async (message, courseData, onChunk) => {
  try {
    const response = await fetch(`${API_URL}/api/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        courseData,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Error streaming chat message:', error);
    throw error;
  }
};

/**
 * Save course data to backend
 * @param {Object} courseData - Course data to save
 * @returns {Promise<Object>} Save confirmation
 */
export const saveCourseData = async (courseData) => {
  try {
    const response = await fetch(`${API_URL}/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving course data:', error);
    throw error;
  }
};

/**
 * Load course data from backend
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Course data
 */
export const loadCourseData = async (courseId) => {
  try {
    const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading course data:', error);
    throw error;
  }
};

// Export all functions
export default {
  processCourseFiles,
  sendChatMessage,
  parseFile,
  streamChatMessage,
  saveCourseData,
  loadCourseData,
};
