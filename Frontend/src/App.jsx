import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`)
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiKeyError, setApiKeyError] = useState('')

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey)
    }
  }, [apiKey])

  async function reviewCode() {
    setIsLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { 
        code,
        apiKey: apiKey || undefined // Send API key if available
      })
      
      setReview(response.data)
    } catch (err) {
      if (err.response && err.response.status === 429) {
        // API limit exceeded
        setShowApiKeyDialog(true)
        setError('API limit exceeded. Please enter your own Gemini API key.')
      } else if (err.response && err.response.status === 401) {
        // Invalid API key
        setApiKeyError('Invalid API key. Please check and try again.')
        setShowApiKeyDialog(true)
      } else {
        setError('Failed to fetch review. Please try again.')
        console.error(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      setApiKeyError('API key is required')
      return
    }
    
    setApiKeyError('')
    setShowApiKeyDialog(false)
    // Retry the review with the new API key
    reviewCode()
  }

  const handleCloseDialog = () => {
    setShowApiKeyDialog(false)
    setApiKeyError('')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Code Review Assistant</h1>
        <p>Get AI-powered feedback on your code</p>
      </header>
      
      <main className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>Your Code</h2>
            <button 
              onClick={reviewCode}
              className="review-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
          <div className="code-editor-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                height: "100%",
                width: "100%"
              }}
            />
          </div>
        </div>
        
        <div className="review-panel">
          <div className="panel-header">
            <h2>Code Review</h2>
          </div>
          <div className="review-content">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Analyzing your code...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>{error}</p>
              </div>
            ) : review ? (
              <Markdown 
                rehypePlugins={[rehypeHighlight]}
              >{review}</Markdown>
            ) : (
              <div className="placeholder-state">
                <p>Your code review will appear here</p>
                <p>Click "Review Code" to get feedback</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* API Key Dialog */}
      {showApiKeyDialog && (
        <div className="dialog-overlay">
          <div className="api-key-dialog">
            <h3>Enter Your Gemini API Key</h3>
            <p>Our default API key has reached its limit. Please provide your own Gemini API key to continue using the service.</p>
            
            <div className="input-group">
              <label htmlFor="api-key">Gemini API Key</label>
              <input
                type="password"
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
              {apiKeyError && <span className="error-text">{apiKeyError}</span>}
            </div>
            
            <div className="dialog-actions">
              <button className="btn-secondary" onClick={handleCloseDialog}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleApiKeySubmit}>
                Submit
              </button>
            </div>
            
            <div className="help-text">
              <p>Don't have an API key? Get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.</p>
              <p>Your API key is stored locally in your browser and never sent to our servers.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
