import './App.css'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'

import Home from './Pages/Home'
import AiChat from './Pages/AiChat'
import CalmZone from './Pages/Calm'
import FeelWall from './Pages/FeelWall'
import Activity from './Pages/Activity'
import Achievements from './Pages/Achievements'
// import Login from './Authentication/login'

const App = () => {
  // const [currentUser, setCurrentUser] = useState(() => {
  //   try {
  //     const raw = localStorage.getItem('feelfree_current_user')
  //     return raw ? JSON.parse(raw) : null
  //   } catch {
  //     return null
  //   }
  // })

  // const handleAuthSuccess = (user) => {
  //   setCurrentUser(user)
  // }

  // const handleLogout = () => {
  //   localStorage.removeItem('feelfree_current_user')
  //   setCurrentUser(null)
  // }

  // if (!currentUser) {
  //   return <Login onAuthSuccess={handleAuthSuccess} />
  // }

  return (
    <div className='p-2 bg-gradient-to-b from-[#ebeeff] via-white to-[#f8dfff] min-h-screen'>
      {/* <Navbar currentUser={currentUser} onLogout={handleLogout} /> */}
        <Navbar />
      <div className='p-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ai-chat' element={<AiChat />} />
          <Route path='/calm-zone' element={<CalmZone />} />
          <Route path='/feel-wall' element={<FeelWall />} />
          <Route path='/activity' element={<Activity />} />
          <Route path='/achievements' element={<Achievements />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
