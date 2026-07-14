import React from 'react'
import ReactDOM from 'react-dom/client'
import UpdatePost from '../components/UpdatePost.jsx'
import '../index.css'

export function renderUpdatePage(props) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UpdatePost {...props} />
    </React.StrictMode>,
  )
}
