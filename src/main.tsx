import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterComp from './Router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterComp />
  // </React.StrictMode>
)
