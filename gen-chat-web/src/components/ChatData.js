import React from 'react'

export default function ChatData({message}) {
  return (
    // <div className='p-5 flex'>
    //     <div className='size-12'>
    //         <img
    //             className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
    //             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //             alt=""
    //         />
    //     </div>
    //     <div>
    //         <div className='bg-white p-3 rounded-lg'>
    //             <p className='text-gray-700 font-medium'>Le Trong Nghia</p>
    //             <p className=''>cho tui xin code </p>
    //         </div>
    //         <div>
    //             <p className='font-medium text-sm'>4:30 PM</p>
    //         </div>
    //     </div>
    // </div>

    <div className="chat chat-start ml-5">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="chat-header">
        {message.sender}
        <time className="text-xs opacity-50">{message.date}</time>
      </div>
      <div className="chat-bubble bg-white text-black">
        {
          message.type == "text" ? 
            message.content : 
              message.type == "image/png" || 
              message.type == "image/jpeg" || 
              message.type == "image/jpg" ?
                <img src={message.content} width={200}></img> :
                  message.type == "video" ?
                  <video width="400" controls>
                    <source src="C:\Users\Student\Downloads\mov_bbb.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                   :
                  <a download={message.filename} href={message.link} className='underline text-blue-400'>{message.filename}</a>
        }
      </div>
  {/* <div className="chat-footer opacity-50">
    Delivered
  </div> */}
    </div>

  )

    
}
