import React from 'react'
import {useState} from 'react'

export default function ChatOption() {

  return (
    <div className='h-screen grow w-5 p-5 border-solid border-l bg-gray-100'>
      <div className='flex items-center justify-center p-2 m-2 border-b border-gray-300'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <p className='font-medium text-xl grow-1'>Info</p>
      </div>
      <div className='flex items-center flex-col justify-center p-8'>
        <img className='aspect-square w-2/3 rounded-full' src='https://lh3.googleusercontent.com/a/ACg8ocLlO1pfA9KPIKdD6CNveeOZ6F7MzO8OPni_FMqOHqjx=s96-c'></img>
        <p className='font-medium text-xl p-3'>Nguyen Thanh Khoa</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-normal'>Media</p>
        <p>See all</p>
      </div>
    </div>



    // <div className="flex">
    //   <div className={` ${open ? "w-72" : "w-20 "} bg-purple h-screen p-5 relative duration-300`} >
    //       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`absolute cursor-pointer -right-3 top-9 w-6 border-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
    //         <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
    //       </svg> */}
        
    //     <div className="flex gap-x-4 items-center">
    //       <img src='' alt='' className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
    //       <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
    //         Designer
    //       </h1>
    //     </div>

    //     <ul className="pt-6 h-screen">
    //       {svgs.map((svg, index) => (
    //         <li
    //           key={index}
    //           className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-xl items-center gap-x-4 
    //           ${svg.gap ? "mt-9" : "mt-2"} ${
    //             index === 0 && "bg-light-white"
    //           } `}
    //         >
    //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    //             { parse (svg.src) }
    //           </svg>
          
    //           <span className={`${!open && "hidden"} origin-left duration-200`}>
    //             {svg.key}
    //           </span>
    //         </li>
    //         ))
    //       }

    //       <li className='flex items-center gap-4 grow mb-0'>
    //         <img className='aspect-square h-10 w-10 rounded-full' src='https://lh3.googleusercontent.com/a/ACg8ocLlO1pfA9KPIKdD6CNveeOZ6F7MzO8OPni_FMqOHqjx=s96-c'></img>
    //         <div>
    //           <p className={`${!open && "hidden"} text-gray-300 font-medium text-xl`}>Nguyen Thanh Khoa</p>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  )
}