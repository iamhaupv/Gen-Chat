import React from 'react'

import acceptFriend from '../services/users/acceptFriend';
import removeRequestGet from '../services/users/removeRequestGet';
import removeRequestSend from '../services/users/removeRequestSend';
import findUserByPhoneNumber from '../services/users/findUserByPhoneNumber';
import InitialIcon from './InitialIcon';
export default function FriendRequest({userRoot, user, handleUser}) {
  
  const handleAccept = async () => {
    await acceptFriend(userRoot.phoneNumber, user.phoneNumber);
    await removeRequestGet(userRoot.phoneNumber, user.phoneNumber);
    await removeRequestSend(user.phoneNumber, userRoot.phoneNumber);
    alert("Added friend successfully!")
    console.log("------ new user after added friend ---------");
    const new_user = await findUserByPhoneNumber(userRoot.phoneNumber);
    handleUser(new_user.data);
  }

  const handleReject = async () => {
    await removeRequestGet(userRoot.phoneNumber, user.phoneNumber);
    await removeRequestSend(user.phoneNumber, userRoot.phoneNumber);
    alert("Remove friend request successfully!")
  }

  return (
    <div className='flex flex-row pt-5 pl-5 pr-5 pb-0 w-full justify-center'>
      <div className='flex items-center justify-center w-1/5 grow'>
        <InitialIcon size={10} initials={user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} />

      </div>
      <div className='flex flex-row pl-2 w-4/5 grow items-center'>
        <p className='pl-2 pr-2 font-medium'>{user.name}</p>
        {/* <div className='flex items-center justify-center'>
          
        </div> */}
        <div className=''>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-8 h-8" onClick={handleAccept}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-8 h-8" onClick={handleReject}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
