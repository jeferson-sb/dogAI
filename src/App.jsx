import React from 'react'
import './App.css'
import logo from './assets/dog.svg'
import FormUpload from './components/FormUpload/FormUpload.jsx'

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo" id="logo" />
      <FormUpload />
    </div>
  )
}

export default App
