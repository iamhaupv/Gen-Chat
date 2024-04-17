import React from 'react'

export default function ChatData({message}) {
  return (
    <div className="flex items-start gap-2.5">
      <img className="w-8 h-8 rounded-full" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Jese image" />
      <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.name}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {message.date}
            </span>
          </div>

          <div className='flex'>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {
                  message.type == "text" ? 
                    message.content : 
                      message.type == "image/png" || 
                      message.type == "image/jpeg" || 
                      message.type == "image/jpg" ?
                        <img src={message.content} width={200}></img> :
                        // message.type == "video" ?
                        // <video width="400" controls>
                        //   <source src="C:\Users\Student\Downloads\mov_bbb.mp4" type="video/mp4" />
                        //   Your browser does not support HTML video.
                        // </video>
                        // :
                        <a download={message.filename} href={message.link} className='underline text-blue-400'>{message.filename}</a>
                }
              </p>
            </div>

            <details className="dropdown bg-transparent border-0">
              <summary className="m-1 btn bg-transparent border-0">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-auto">
                <li><a>Reply</a></li>
                <li><a>Forward</a></li>
              </ul>
            </details>
          </div>
          
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
      </div>
    </div>
  )
}
