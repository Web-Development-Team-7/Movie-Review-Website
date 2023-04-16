import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import HomePage from './Components/Homepage'
import SignUp from './Components/signup'
import MoviePage from './Components/details'

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path = '/' element={<Login />}/>
        <Route path = '/home' element={<HomePage />}/>
        <Route path = '/Signup' element={<SignUp />}/>
        <Route path = '/details' element={<MoviePage />}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
