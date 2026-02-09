import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="root-wrap">
      <div className="iphone-frame">
        <App />
      </div>
    </div>
  </React.StrictMode>,
)
