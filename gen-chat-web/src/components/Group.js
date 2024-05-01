import React from 'react'

export default function Group({group, setCurrentRoom}) {
  return (
    <div className='cursor-pointer flex flex-row pt-2 pl-5 pr-5 pb-2 w-full justify-center'
      onClick={() => setCurrentRoom(group)}
    >
      <div className='flex items-center justify-center w-1/5 grow'>
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg"
        alt=""
      />
      </div>
      <div className='flex flex-col pl-2 w-4/5 grow'>
        <p className='pb-0 pt-2 pl-2 pr-2 font-medium'>{group.name}</p>
        <p className='p-2 overflow-hidden truncate w-9/10'></p>
      </div>
    </div>
  )
}
