import React from 'react'

export default function ChatUser({message}) {
  return (
    // <div className='p-5 flex justify-end'>
    //     <div className='flex flex-col items-end'>
    //         <div className='bg-white p-3 rounded-lg'>
    //             <p className='text-gray-700 font-medium'>Le Trong Nghia</p>
    //             <p className=''>cho tui xin code </p>
    //         </div>
    //             <p className='font-medium text-sm'>4:30 PM</p>
    //     </div>
    // </div>

    <div className="chat chat-end">

  <div className="chat-header">
    <time className="text-xs opacity-50">{message.date}</time>
  </div>
  <div className="chat-bubble bg-white text-black">
    {/* {
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
    } */}
  </div>
  {/* <div className="chat-footer opacity-50">
    Seen at 12:46
  </div> */}
</div>
  )
}
