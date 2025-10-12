import { use, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Message from './Message'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { set } from 'mongoose'

const Chatbox = () => {
  const { selectedChat, user, axios, theme, token, setUser} = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
 const [prompt, setPrompt] = useState('')
 const [mode, setMode] = useState('text')
 const [isPublished, setIsPublished] = useState(false)
 const containerRef=useRef(null)
 const handleSubmit = async(e) => {
   try {
      e.preventDefault()
      if(!user){
        return toast("Login to send message")
      }
      setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages(prev=> [...prev, {role: "user", content: promptCopy, timestamp: new Date(), isImage: false}])
      const {data}= await axios.post(`/api/message/${mode}`, { chatId: selectedChat._id, prompt: promptCopy, isPublished}, {
        headers: { Authorization: token }
      })
      if(data.success){
        setMessages(prev=> [...prev, data.reply])
        console.log(data)
      }else{
        toast.error(data.message)
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setPrompt("")
      setLoading(false)
    }
 }
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])
  return (
    <div className='flex flex-1 flex-col justify-between items-center m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-32'>
      {/* chat message */}
      <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
        {
          messages.length === 0 && (
            <div className='h-full flex flex-col gap-2 justify-center '>
              {/* logo */}
              <div className='flex items-center mx-auto  justify-center gap-5 w-full max-w-48'>
                <img src='/favicon.svg' alt="Logo" className='max-w-56 w-full sm:max-w-64' />
                <div>
                  <h1 className='text-2xl font-bold '>ChatsGPT</h1>
                  <p className='text-purple-600 text-[11px] '>Intelligent AI Assistant</p>
                </div>
              </div>

              <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-500 dark:text-white'>Ask me anything.</p>
            </div>
          )
        }

        {messages.map((message, index) => <Message key={index} message={message} />)}
        {/* loading three dots */}
        {
          loading && <div className='loader flex items-center gap-1.5'>
            <div className='w-3 h-3 bg-gray-500 dark:bg-white rounded-full animate-bounce '></div>
            <div className='w-3 h-3 bg-gray-500 dark:bg-white rounded-full animate-bounce '></div>
            <div className='w-3 h-3 bg-gray-500 dark:bg-white rounded-full animate-bounce '></div>
          </div>  
        }
      </div>

      {mode === 'image' && (
        <label className='text-sm mx-auto inline-flex items-center gap-2 mb-3'>
          <p className='text-xs'>Pubish Generated to community</p>
          <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
          </label>
      )}
      {/* prompt input box */}
      <form className='bg-primary/20 dark:bg-[#583C79]/30 backdrop-blur-sm border broder-purple-600
      dark:border-[#80609F]/30 rounded-full p-3 flex items-center gap-3 w-full max-w-2xl' onSubmit={handleSubmit}>
        <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option value="text" className='dark:bg-purple-900  m-2'>Text</option>
          <option value="image" className='dark:bg-purple-900  m-2 '>Image</option>
        </select>
        <input type="text" placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none'  required onChange={(e)=>setPrompt(e.target.value)} value={prompt}/>
        <button disabled={loading || !prompt }>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer'/>
        </button>
      </form>
      
    </div>
  )
}

export default Chatbox
