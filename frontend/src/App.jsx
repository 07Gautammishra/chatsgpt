import React, { useState } from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'

import Sidebar from './components/Sidebar.jsx'
import Chatbox from './components/Chatbox.jsx'

import Login from './pages/Login.jsx'
import { assets } from './assets/assets.js'
import './prism.css'
import Loading from './pages/Loading.jsx'
import Community from './pages/Community.jsx'
import { useAppContext } from './context/AppContext.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation();
  const {user, loadingUser}=useAppContext()
  if(pathname === '/loading' || loadingUser) return <Loading/>
  return (
    <>
    <Toaster/>
    {!isMenuOpen && <img src={assets.menu_icon} alt="menu_icon" className='w-8 h-8 absolute left-3 top-3 cursor-pointer md:hidden not-dark:invert' onClick={() => setIsMenuOpen(true)} />}
   <div className="dark:bg-gradient-to-b from-[#1e1e1e] to-[#000000] dark:text-white">

    {user ? (

      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<Chatbox/>}/>
          <Route path='/community' element={<Community/>}/>
  
        </Routes>
      </div>
    ):(
      <Login/>
      
    )}
    </div>
    </>
  )
}

export default App
