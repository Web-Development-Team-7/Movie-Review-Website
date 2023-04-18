import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import HomePage from './Components/Homepage'
import SignUp from './Components/signup'
import MoviePage from './Components/details'
import AccountPage from './Components/Account'

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path = '/' element={<Login />}/>
        <Route path = '/home' element={<HomePage />}/>
        <Route path = '/Signup' element={<SignUp />}/>
        <Route path = '/details' element={<MoviePage />}/>
        <Route path = '/account' element={<AccountPage />}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
