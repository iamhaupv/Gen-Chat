import React from 'react'

export default function ChatData({message}) {
  return (
    // <div className="chat chat-start ml-5">
    //   <div className="chat-image avatar">
    //     <div className="w-10 rounded-full">
    //       <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    //     </div>
    //   </div>
    //   <div className="chat-header">
    //     {message.sender}
    //     <time className="text-xs opacity-50">{message.date}</time>
    //   </div>
    //   <div className="chat-bubble bg-white text-black">
    //     {
    //       message.type == "text" ? 
    //         message.content : 
    //           message.type == "image/png" || 
    //           message.type == "image/jpeg" || 
    //           message.type == "image/jpg" ?
    //             <img src={message.content} width={200}></img> :
    //               message.type == "video" ?
    //               <video width="400" controls>
    //                 <source src="C:\Users\Student\Downloads\mov_bbb.mp4" type="video/mp4" />
    //                 Your browser does not support HTML video.
    //               </video>
    //                :
    //               <a download={message.filename} href={message.link} className='underline text-blue-400'>{message.filename}</a>
    //     }
    //   </div>
    // </div>

<div class="flex items-start gap-2.5">
   <img class="w-8 h-8 rounded-full" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Jese image" />
   <div class="flex flex-col gap-1">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">{message.name}</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
         {message.date}
         </span>
      </div>

      <div className='flex'>
        <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p class="text-sm font-normal text-gray-900 dark:text-white">
              {message.content}
          </p>
        </div>
        
        <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </button>

        <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
            </li>
          </ul>
        </div>
      </div>
      
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
   
   
</div>

  )

    
}
