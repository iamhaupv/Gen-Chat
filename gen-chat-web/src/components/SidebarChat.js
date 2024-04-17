import React, { useState, useEffect, useRef } from 'react'

import Chat from './Chat'
import FriendRequest from './FriendRequest'
import UserProfile from './UserProfile';

import getListFriend from '../services/users/getListFriend';
import findUserByPhoneNumber from '../services/users/findUserByPhoneNumber';
import addRequestGet from '../services/users/addRequestGet';
import addRequestSend from '../services/users/addRequestSend';

// import host from '../GlobalVariable';

// import socketIOClient from "socket.io-client";

import sockets from '../utils/socketGroup';

export default function SidebarChat({user, handleCurrentFriend}) {
  const [showListFriendRequest, setShowListFriendRequest] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentFriend, setCurrentFriend] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [roomName, setRoomName] = useState("New Room");

  // const socketGroupRef = useRef();
  const socketGroup = sockets.socketGroup;

  const handleCurrentFriend2 = friend => {
    console.log("Called handle current friend 2");
    setCurrentFriend(friend);
    handleCurrentFriend(friend);
  }

  const handleRoomName = e => {
    setRoomName(e.target.value)
  }

  const openUserModal = user => {
    setCurrentUser(user);
    document.getElementById('my_modal_1').showModal()
  }

  const openCreateGroupModal = user => {
    document.getElementById('group_modal').showModal()
  }

  useEffect(() => {
    // socketGroupRef.current = socketIOClient.connect(host.socket_host_Group);

    getFriendList();

    return () => {
      // socketGroupRef.current.disconnect();
      socketGroup.disconnect();
    };
  }, []);

  const handleCreateGroup = async () => {
    let checkedUsers = getCheckedBoxes("userInGroup");
    console.log("Checked user");
    console.log(checkedUsers);

    try {
      // await createRoom(checkedUsers, new Date().valueOf());
      // socketGroupRef.current.emit("createRoom", {name: roomName, admin: user.phoneNumber, user: checkedUsers});
      socketGroup.emit("createRoom", {name: roomName, admin: user.phoneNumber, user: checkedUsers});
      alert("Create room successfully!");
      document.getElementById("btnCloseModal").click();
    } catch (error) {
      console.log("Error create room: " + error);
    }
  }

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  const getFriendList = async () => {
    const friendList = await getListFriend(user.phoneNumber);

    const friendFound = []

    for (let i = 0; i < friendList.length; i++) {
      const friend = await findUserByPhoneNumber(friendList[i]);
      friendFound.push(friend.data);
    }

    setFriends(friendFound);
  }

  const handleSearchPhoneNumber = e => {
    setSearchPhoneNumber(e.target.value);
  }

  const handleShowSearchResult = e => {
    setSearchPhoneNumber("");
    setShowSearchResult(!showSearchResult);
  }

  const handleAddFriend = async () => {
    console.log("Called add friend");
    await addRequestSend(user.phoneNumber, currentUser.phoneNumber);
    await addRequestGet(user.phoneNumber, currentUser.phoneNumber);
  }

  const searchUserByPhone = async () => {
    handleShowSearchResult();

    if (searchPhoneNumber) {
      try {
        const userFound = await findUserByPhoneNumber(searchPhoneNumber);
        setSearchedUser(userFound)
      } catch (error) {
        console.error("Error finding user: " + error);
        setSearchedUser(null);        
      }
    }
    
    console.log(searchedUser != null);
    setShowSearchResult(true);
  }

  return (
    <div className={`h-screen bg-white duration-300 ${!open ? 'w-96' : "w-0"}`}>

    <dialog id="my_modal_1" className="modal" add="true" >
      <div className="modal-box">


      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

        

      <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{currentUser.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.phoneNumber}</span>
          <div className="flex mt-4 md:mt-6">
              <p className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddFriend}
              >Add friend</p>
              {/* <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a> */}
          </div>
      </div>



      </div>
    </dialog>

    {/* Group Modal */}
    <dialog id="group_modal" className="modal" add="true" >
      <div className="modal-box">

        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button id='btnCloseModal' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h1 className='pb-5 font-bold'>Create group</h1>

        {/* Group name */}
        <input className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'placeholder='Group name'
          type='text'
          value={roomName}
          onChange={handleRoomName}
        />

        {/* Search user by name */}
        <div className='flex items-center justify-center pt-5 pb-5 border-b-2 border-gray-200'>
          <input className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'placeholder='Search Message'
            type='tel'
            value={searchPhoneNumber}
            onChange={handleSearchPhoneNumber}
          />

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mr-4"
            onClick={searchUserByPhone}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> 
        </div>

        {/* All friend title */}
        <p className='font-bold pb-5'>Friend list</p>

        {/* All friend title */}
        <div className='border-b-2 border-gray-200'>
          {
            friends.map((elem, i) => 
              <div key={i} className='flex items-center'>
                <input type='checkbox' name='userInGroup' value={elem.phoneNumber}></input>
                <Chat user={elem} setCurrentFriend={() => handleCurrentFriend2(elem)} />
              </div>
            )
          }
        </div>

        {/* Create group */}
        <div className='flex justify-end'>
          <button className="btn-primary bg-blue-400 p-2 m-5 rounded-md btn text-white"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </div>
      </div>
    </dialog>


    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={`absolute cursor-pointer -right-3 top-9 w-6 border-blue-400 border-2 rounded-full ${!open && "rotate-180"} bg-blue-400`} onClick={() => setOpen(!open)}>
      <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
    </svg>

    {/* Message title */}
    <div className='flex flex-row p-5 justify-between border-solid border-b border-gray-200 font-medium text-xl' >
      <h1 className={`text-xl ${!open ? 'w-auto' : "hidden"}`}>Message</h1>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"
        onClick={openCreateGroupModal}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    </div>

    {/* Search Phone Number */}
    <div className='flex items-center justify-center pt-5'>
      <input className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'placeholder='Search Message'
        type='tel'
        value={searchPhoneNumber}
        onChange={handleSearchPhoneNumber}
      />

      {
        !showSearchResult ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mr-4"
          onClick={searchUserByPhone}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg> :

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black"  className="w-10 h-10 mr-4"
          onClick={handleShowSearchResult}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      }
    </div>

    {
      showSearchResult ? <>
        <div className='flex items-center justify-center pt-5 cursor-pointer'
          onClick={() => setShowListFriendRequest(!showListFriendRequest)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 ml-4 rounded-lg bg-blue-400 p-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>

          <p className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'>Search Result</p>
        </div>

        <h1 className='pt-6 pl-5 pr-5 font-medium'>All Result</h1>

        <div className='h-4/5 overflow-y-scroll'>
          {
            searchedUser != null ?
              <UserProfile user={searchedUser.data} openModel={() => openUserModal(searchedUser.data)} /> : 
              <p className='ml-4'>Phone number does not exists</p>
          }
        </div>
      </> :
      !showListFriendRequest ? (
        <>
          <div className='flex items-center justify-center pt-5 cursor-pointer'
            onClick={() => setShowListFriendRequest(!showListFriendRequest)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 ml-4 rounded-lg bg-blue-400 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>

            <p className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'>Friend Request</p>
          </div>

          <h1 className='pt-6 pl-5 pr-5 font-medium'>All Message</h1>

          <div className='h-4/5 overflow-y-scroll'>

            {
              friends.map((elem, i) => <Chat key={i} user={elem} setCurrentFriend={() => handleCurrentFriend2(elem)} />)
            }

          </div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-center pt-5 cursor-pointer'
            onClick={() => setShowListFriendRequest(!showListFriendRequest)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 ml-4 rounded-lg bg-blue-400 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

            <p className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'>All Message</p>
          </div>

          <h1 className='pt-6 pl-5 pr-5 font-medium'>Friend Requests</h1>

          <div className='h-4/5 overflow-y-scroll'>
            <FriendRequest />
          </div>
        </>
      )
    }
   </div>
  )
}