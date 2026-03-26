import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Trips from './pages/trips'
import Explore from './pages/explore'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Root/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route path='/trips' element={<Trips/>}/>
        <Route path='/explore' element={<Explore/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
