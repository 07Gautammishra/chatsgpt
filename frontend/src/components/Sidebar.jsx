import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/assets';
import moment from 'moment';
import toast from 'react-hot-toast';
import { set } from 'mongoose';

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUserChats, setToken, token } = useAppContext()
  const [search, setSearch] = useState('');

const deleteChat = async (e, chatId) => {
  try {
    e.stopPropagation();

    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmDelete) return;

    const { data } = await axios.delete(`/api/chat/delete`, {
      data: { chatId },
      headers: { Authorization: token },
    });

    if (data.success) {
      setChats(prev => prev.filter(c => c._id !== chatId));
      await fetchUserChats();
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

 const logOut= async()=>{
  localStorage.removeItem("token")
  setToken(null)
  toast.success("Logged out successfully")
 }
  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 
dark:bg-gradient-to-b from-[#1e1e1e]/90 to-[#000000]/90 
border-r border-[#2e2e2e]/60 backdrop-blur-2xl 
transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`}>
      <div className='flex items-center gap-5 w-full max-w-48'>
        <img src='/favicon.svg' alt="Logo" className='w-[50px]' />
        <div>
          <h1 className='text-xl font-bold mt-2'>ChatsGPT</h1>
          <p className='text-purple-600 text-[12px]'>Intelligent AI Assistant</p>
        </div>
      </div>
      {/* add button */}
      <button className='flex items-center justify-center mt-10 py-2 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-lg text-white text-sm cursor-pointer' onClick={createNewChat}>
        <span className='mr-2 text-xl'>+</span> New Chat
      </button>

      {/* search button */}

      <div className="flex items-center gap-2 p-3 mt-4 border border-b-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} alt="search-icon" className='w-4 not-dark:invert' />
        <input type="text" name="searchBox" placeholder='Search conversations' className='text-xs placeholder:text-gray-400 outline-none' onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>

      {/* chat list */}
      {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
      <div className='flex-1 overflow-y-scroll space-y-3 mt-3 text-sm   '>
        {
          chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat) => (
            <div key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group' onClick={() => {
              setSelectedChat(chat)
              setIsMenuOpen(false)
              navigate('/')
            }}>
              <div>
                <p className="truncate w-full">{chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}</p>
                <p className='text-xm text-gray-500 dart:text-[#B1A6C0]'>{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <img src={assets.bin_icon} alt="bin_icon" className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' onClick={(e)=>toast.promise(deleteChat(e, chat._id), {loading: "deleteing..."})}/>
            </div>
          ))
        }
      </div>


      {/* community */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-300  dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all duration-200' onClick={() => {
         navigate('/community')
         
         setIsMenuOpen(false)}}>
        <img src={assets.gallery_icon} alt="gallery_icon" className='w-4 not-dark:invert' />
        <div className='flex flex-col text-sm'>
          <p>Commuity Image</p>
        </div>
      </div>
    
      {/* dark mode toggle */}


     <div className="flex items-center justify-between gap-2 p-3 mt-4 
  border border-gray-300 dark:border-white/15 rounded-md 
  cursor-pointer hover:scale-105 transition-all duration-200">

  <div className="flex items-center gap-2 text-sm">
    <img src={assets.theme_icon} alt="theme_icon" className="w-4 invert dark:invert-0" />
    <p>{theme === "dark" ? "Light" : "Dark"} Mode</p>
  </div>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={theme === "dark"}
      onChange={() => {setTheme(theme === "dark" ? "light" : "dark")
      setIsMenuOpen(false)
      }}
    />
    <div className="w-9 h-5   bg-gray-500 rounded-full peer-checked:bg-purple-600 transition-all">
    </div>
      <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4 "></span>
  </label>
</div>


{/* User Account */}
<div className='flex items-center gap-3 p-3 mt-4 border border-gray-300  dark:border-white/15 rounded-md cursor-pointer group'>
        <img src={assets.user_icon} alt="user_icon" className='w-7 rounded-full' />
        <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "Login your account"}</p>
        {user && <img src={assets.logout_icon} alt="logout_icon" className='h-5 cursor-pointer max-md:block not-dark:invert hidden group-hover:block' onClick={() => { logOut(); setIsMenuOpen(false) }} />}
      </div>

      <img src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert' alt="" onClick={()=>setIsMenuOpen(false)}/>
    </div>
  )
}

export default Sidebar
