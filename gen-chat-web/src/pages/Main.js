import React, { useRef, useState } from 'react'
import SidebarMenu from '../components/SidebarMenu'
import SidebarChat from '../components/SidebarChat'
import Chats from '../components/Chats'
import { useLocation } from "react-router-dom";
import host from '../GlobalVariable';

import socketIOClient from "socket.io-client";

export default function Main() {
  const {state} = useLocation();
  const user = state.user.data; // Read values passed on state

  const [currentFriend, setCurrentFriend] = useState({})

  const socketRef = useRef();
  socketRef.current = socketIOClient.connect(host.socket_host);

  const handleCurrentFriend = friend => {
    console.log("Called handle current friend");
    setCurrentFriend(friend);
  }
  
  return (
    <div className='flex items-center w-full overflow-hidden'>
      <SidebarMenu user={user} />
      <SidebarChat user={user} handleCurrentFriend={handleCurrentFriend} socketRef={socketRef}/>
      <Chats user={user} currentFriend={currentFriend} />
    </div>
  )
}
