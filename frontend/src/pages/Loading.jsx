import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigation = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation('/');

  //   }, 3000)
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <div className='bg-gradient-to-b form-[#531B81] to-[#29184B] backdrop-opacity-60 flex items-center justify-center w-screen h-screen text-white text-2xl dark:from-[#1e1e1e] dark:to-[#000000] dark:text-white'>
      <div className='w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
