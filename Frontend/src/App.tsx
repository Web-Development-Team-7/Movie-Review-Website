import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'

function App() {

  return (
    <React.Fragment>
    <Routes>
      <Route path = '/' element={<Login />}/>
      
    </Routes>
  </React.Fragment>
  )
}

export default App
