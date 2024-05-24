import React from 'react'
import InitialIcon from './InitialIcon'

export default function RoomChat({user, setCurrentFriend}) {
  return (
    <div className='cursor-pointer flex flex-row pt-2 pl-5 pr-5 pb-2 w-full justify-center'
      onClick={() => setCurrentFriend(user)}
    >
      <div className='flex items-center justify-center w-1/5 grow'>
        <InitialIcon size={10} initials={user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} />
      </div>
      <div className='flex flex-col pl-2 w-4/5 grow'>
        <p className='pb-0 pt-2 pl-2 pr-2 font-medium'>{user.name}</p>
        <p className='p-2 overflow-hidden truncate w-9/10'></p>
      </div>
    </div>
  )
}
