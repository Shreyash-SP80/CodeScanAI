# CodeScanAi - AI-Powered Code Review Assistant 🤖

 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


CodeScanAi is an intelligent web application that provides AI-powered code reviews to help developers write better, cleaner, and more efficient code.  
It analyzes your code using advanced AI and provides detailed feedback, suggestions, and improvements.

---

## ✨ Features

- 🤖 **AI-Powered Analysis**: Get intelligent code reviews using Google's Gemini AI  
- 📝 **Real-time Editing**: Write and edit code directly in the browser  
- 🎨 **Syntax Highlighting**: Beautiful code highlighting for multiple languages  
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices  
- ⚡ **Fast & Lightweight**: Quick analysis and minimal loading times  
- 🔒 **Secure**: Your code is processed securely and not stored  

---

## 🏗️ Architecture Overview

```bash
code-review-system/
├── 📁 backend/ # Node.js Express server
│ ├── src/
│ │ ├── 📁 controllers/ # Route controllers
│ │ ├── 📁 routes/ # API routes
│ │ ├── 📁 services/ # Business logic & AI integration
│ │ └── app.js # Express app configuration
│ ├── server.js # Server entry point
│ ├── package.json # Backend dependencies
│ └── .env # Environment variables
│
└── 📁 frontend/ # React application
├── src/
│ ├── App.js # Main React component
│ └── App.css # Application styles
├── public/
├── package.json # Frontend dependencies
└── vite.config.js # Build configuration
```


---

## 🔧 Backend Structure

### 📄 `server.js`
The entry point of your backend application that:
- Loads environment variables  
- Imports the Express app  
- Starts the server on the specified port  

### 📄 `src/app.js`
Configures the Express application with:
- CORS middleware for cross-origin requests  
- JSON parsing for request bodies  
- API routes  
- Error handling middleware  
- Health check endpoints  

### 📁 `src/routes/ai.routes.js`
Defines the API endpoints:
- **POST** `/ai/get-review` → Main endpoint for code review requests  

### 📁 `src/controllers/ai.controller.js`
Handles the business logic for:
- Validating incoming requests  
- Calling the AI service  
- Sending responses back to the client  

### 📁 `src/services/ai.services.js`
Contains the AI integration that:
- Connects to Google's Gemini AI API  
- Formats prompts with system instructions  
- Processes AI responses  
- Handles errors from the AI service  

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)  
- npm or yarn  
- Google Gemini API key  

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd code-review-system

```

### 2. Backend Setup
```bash

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Get Google Gemini API Key
- Visit Google AI Studio
- Create a new API key
- Add it to your backend .env file as GEMINI_API_KEY


## 📦 Dependencies Explained

### Backend Dependencies
| Package       | Purpose                                       |
|---------------|-----------------------------------------------|
| express       | Web framework for building the API server     |
| cors          | Enables cross-origin resource sharing         |
| dotenv        | Loads environment variables from `.env`       |
| @google/genai | Official SDK for Google Gemini AI API         |
| helmet        | Security middleware for Express               |
| morgan        | HTTP request logger middleware                |

### Frontend Dependencies
| Package                  | Purpose                                           |
|---------------------------|---------------------------------------------------|
| react                    | JavaScript library for building user interfaces   |
| react-simple-code-editor  | Simple code editor with syntax highlighting       |
| prismjs                  | Syntax highlighting library                       |
| axios                    | HTTP client for making API requests               |
| react-markdown           | Renders Markdown content                          |
| rehype-highlight         | Syntax highlighting for Markdown code blocks      |




