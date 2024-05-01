import React from 'react'

export default function RoomChat({user, setCurrentFriend}) {
  return (
    <div className='cursor-pointer flex flex-row pt-2 pl-5 pr-5 pb-2 w-full justify-center'
      onClick={() => setCurrentFriend(user)}
    >
      <div className='flex items-center justify-center w-1/5 grow'>
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      </div>
      <div className='flex flex-col pl-2 w-4/5 grow'>
        <p className='pb-0 pt-2 pl-2 pr-2 font-medium'>{user.name}</p>
        <p className='p-2 overflow-hidden truncate w-9/10'></p>
      </div>
    </div>
  )
}
