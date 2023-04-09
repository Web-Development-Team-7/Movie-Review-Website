import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import HomePage from './Components/HomePage'

function App() {

  return (
    <React.Fragment>
    <Routes>
      <Route path = '/' element={<Login />}/>
      <Route path = '/home' element={<HomePage />}/>
    </Routes>
  </React.Fragment>
  )
}

export default App
