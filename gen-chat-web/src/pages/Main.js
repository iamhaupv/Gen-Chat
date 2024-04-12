import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import SidebarChat from '../components/SidebarChat'
import Chats from '../components/Chats'
import { useLocation } from "react-router-dom";

export default function Main() {
  const {state} = useLocation();
  const user = state.user.data; // Read values passed on state
  
  return (
    <div className='flex items-center w-full overflow-hidden'>
      <SidebarMenu user={user}/>
      <SidebarChat user={user}/>
      <Chats user={user}/>
    </div>
  )
}
