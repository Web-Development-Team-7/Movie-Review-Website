import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import HomePage from './Components/HomePage'
import SignUp from './Components/signup'

function App() {

  return (
    <React.Fragment>
    <Routes>
      <Route path = '/' element={<Login />}/>
      <Route path = '/home' element={<HomePage />}/>
      <Route path = '/Signup' element={<SignUp />}/>
      
    </Routes>
  </React.Fragment>
  )
}

export default App
