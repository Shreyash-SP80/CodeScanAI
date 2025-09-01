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
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)

  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      setError('Failed to fetch review. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CodeScanAi</h1>
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
    </div>
  )
}

export default App
