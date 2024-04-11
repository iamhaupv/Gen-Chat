import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import SidebarChat from '../components/SidebarChat'
import Chats from '../components/Chats'
import Profile from '../components/Profile'

export default function Main() {
  return (
    <div className='flex items-center w-full overflow-hidden'>
      <SidebarMenu/>  
      <SidebarChat/>
      <Chats/>
      <Profile/>
    </div>
  )
}
