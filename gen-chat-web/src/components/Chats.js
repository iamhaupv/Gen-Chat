import React, {useState} from 'react';
import ChatData from './ChatData'
import ChatUser from './ChatUser'
import ChatInput from './ChatInput'

export default function Chats() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`flex w-full`}>

      <div className={`h-screen ${open ? "w-full" : "w-full"}`}>
        <nav className='flex items-center justify-between p-2 pl-5 pr-5'>
          {/* // Old */}
          
          {/* <div className='flex items-center gap-4 grow'>
            <img className='aspect-square h-10 w-10 rounded-full' src='https://lh3.googleusercontent.com/a/ACg8ocLlO1pfA9KPIKdD6CNveeOZ6F7MzO8OPni_FMqOHqjx=s96-c'></img>
            <div>
              <p className='font-medium text-xl'>Nguyen Thanh Khoa</p>
              <p className='font-normal'>Online</p>
            </div>
          </div> */}

          {/* New */}

          <div className='flex items-center'>
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <p className='font-medium text-xl ml-5'>Nguyen Thanh Khoa</p>
          </div>

          {/* <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div> */}

          <div className='flex items-center justify-between gap-4 '>
            <div className=''></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6`}  onClick={() => setOpen(!open)}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

          </div>
        </nav>

        <div className='h-4/5 overflow-y-scroll bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 '>
          <ChatData/>
          <ChatUser/>
          <ChatData/>
          <ChatUser/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
          <ChatData/>
        </div>

        <ChatInput />

      </div>

      {/* <div className={`h-screen ${open ? "w-1/4" : "w-0"}`}>
        <div className=' bg-purple h-screen p-5 relative duration-300' >

        </div>
      </div> */}

    </div>
  )
}