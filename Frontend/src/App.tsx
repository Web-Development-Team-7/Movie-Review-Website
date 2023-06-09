import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/login'
import HomePage from './Components/Homepage'
import SignUp from './Components/signup'
import MoviePage from './Components/details'
import AccountPage from './Components/Account'
import Favorite from './Components/Favorite'
import Navbar from './Components/navbar'
import TagsPage from './Components/Tags'
import SearchResults from './Components/search'
import LandingPage from './Components/LandingPage'
function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path = '/' element={<LandingPage/>}/>
        <Route path = '/login' element={<Login />}/>
        <Route path = '/home' element={<HomePage />}/>
        <Route path = '/Signup' element={<SignUp />}/>
        <Route path = '/details' element={<MoviePage />}/>
        <Route path = '/search' element={<SearchResults/>}/>
        <Route path = '/account' element={<AccountPage />}/>
        <Route path = '/favorite' element={<Favorite />}/>
        <Route path = '/tags' element={<TagsPage />}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
