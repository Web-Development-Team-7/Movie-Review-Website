import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import SignUp from './Components/signup'

function App() {

  return (
    <React.Fragment>
    <Routes>
      <Route path = '/' element={<Login />}/>
      <Route path = '/Signup' element={<SignUp />}/>
      
    </Routes>
  </React.Fragment>
  )
}

export default App
