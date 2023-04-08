import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import SignUp from './Components/signup'
import Home from './Components/Homepage'

function App() {

  return (
    <React.Fragment>
    <Routes>
      <Route path = '/' element={<Login />}/>
      <Route path = '/Signup' element={<SignUp />}/>
      <Route path = '/Movie' element={<Home />}/>
      
    </Routes>
  </React.Fragment>
  )
}

export default App
