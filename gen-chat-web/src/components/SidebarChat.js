import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import Chat from './Chat'
import FriendRequest from './FriendRequest'
import UserProfile from './UserProfile';
import RoomChat from './RoomChat';

import getListFriend from '../services/users/getListFriend';
import getRequestGet from '../services/users/getRequestGet';
import getRequestSend from '../services/users/getRequestSend';
import findUserByPhoneNumber from '../services/users/findUserByPhoneNumber';
import addRequestGet from '../services/users/addRequestGet';
import addRequestSend from '../services/users/addRequestSend';

import socket from "../utils/socketGroup"
import InitialIcon from './InitialIcon';

export default function SidebarChat({user, handleCurrentFriend, handleUser}) {
  const [showListFriendRequest, setShowListFriendRequest] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsRequestGet, setFriendsRequestGet] = useState([]);
  const [friendsRequestSend, setFriendsRequestSend] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentFriend, setCurrentFriend] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [roomName, setRoomName] = useState("New Room");
  const [rooms, setRooms] = useState([]);

  const getFriendsRequestGet = async () => {
    const friends_request_get = await getRequestGet(user.phoneNumber);
    
    let friends_request_get_list = [];
    for (let i = 0; i < friends_request_get.data.length; i++) {
      const friend = await findUserByPhoneNumber(friends_request_get.data[i]);
      friends_request_get_list.push(friend.data);
    }
    
    setFriendsRequestGet(friends_request_get_list);
  }

  const getFriendsRequestSend = async () => {
    const friends_request_send = await getRequestSend(user.phoneNumber);
    
    let friends_request_send_list = [];
    for (let i = 0; i < friends_request_send.data.length; i++) {
      const friend = await findUserByPhoneNumber(friends_request_send.data[i]);
      friends_request_send_list.push(friend.data);
    }
    
    setFriendsRequestSend(friends_request_send_list);
  }

  const socketGroupRef = useRef();

  const handleCurrentFriend2 = friend => {
    setCurrentFriend(friend);
    handleCurrentFriend(friend);
  }

  const handleShowListFriendRequest = async () => {
    let listRequestGet = await getRequestGet(user.phoneNumber);
    setShowListFriendRequest(!showListFriendRequest)
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
  
  const handleCreateGroup = async () => {
    let checkedUsers = getCheckedBoxes("userInGroup");

    try {
      let idRoom = "room" + new Date().valueOf();
      socket.emit("join-room", {
        id: idRoom, 
        phoneNumber: idRoom, 
        name: roomName, 
        admin: user.phoneNumber, 
        user: checkedUsers, 
        messages: []
      });
      alert("Create room successfully!");
      socket.emit("init-room", user.phoneNumber);
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
      const friend = await findUserByPhoneNumber(friendList[i].friend_id);
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
    // console.log("Called add friend");
    await addRequestSend(user.phoneNumber, currentUser.phoneNumber);
    await addRequestGet(user.phoneNumber, currentUser.phoneNumber);

    alert("Added friend successfully!")
    document.querySelector("#close_modal_1").click();
  }

  const searchUserByPhone = async () => {
    handleShowSearchResult();

    if (searchPhoneNumber) {
      try {
        const userFound = await findUserByPhoneNumber(searchPhoneNumber);
        setSearchedUser(userFound.data);
        // console.log("Searched user");
        // console.log(userFound.data);
        // console.log(searchedUser);
      } catch (error) {
        console.error("Error finding user: " + error);
        setSearchedUser(null);        
      }
    }
    
    setShowSearchResult(true);
  }

  useEffect(() => {
    getFriendsRequestSend();
    getFriendsRequestGet();
  }, [searchedUser]);
  
  useEffect(() => {
    getFriendList();
  }, [socketGroupRef]);

  useEffect(() => {}, [friendsRequestGet]);
  useEffect(() => {}, [friendsRequestSend]);

  const loadRoom = data => {
    setRooms(data);
  }

  useEffect(() => {
    socket.emit("init-room", user.phoneNumber);

    socket.on("rooms2", data => {
      console.log("----------- Called rooms2");
      console.log(data);
      setRooms(data);
    });

    return () => {
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }, []);

  const isSearchedUserFriendWithUser = () => {
    if (searchedUser) {
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].phoneNumber == searchedUser.phoneNumber) {
          return true;
        }
      }

      for (let i = 0; i < friendsRequestSend.length; i++) {
        if (friendsRequestSend[i].phoneNumber == searchedUser.phoneNumber) {
          return true;
        }
      }
    }

    return false;
  }

  return (
    <div className={`h-screen bg-white duration-300 ${!open ? 'w-96' : "w-0"}`}>
      <dialog id="my_modal_1" className="modal">

        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure>

          <div className="avatar -top-3 left-2">
            <div className="w-24 rounded-full border-2  border-white ">
              <InitialIcon size={24} initials={
                searchedUser != null ? 
                  searchedUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() :
                  "Null"
              } />
            </div>
            <h2 className="card-title ">{searchedUser != null ? searchedUser.name : ""}</h2> 
          </div>

          <form method="dialog">
            <button id='close_modal_1' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="card-body">
            <h3 className="card-title">Thông tin cá nhân</h3>
              
            <p>Phone number: {searchedUser != null ? searchedUser.phoneNumber : ""}</p>
              
            <div className="card-actions justify-end">
              {
                isSearchedUserFriendWithUser() ?
                  <></>
                    : 
                  <button className="btn btn-primary" onClick={handleAddFriend}>Kết bạn</button>
              }
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
                <Chat user={elem} setCurrentFriend={() => handleCurrentFriend2(elem)} loadRoom={loadRoom}/>
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

    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={`absolute cursor-pointer -right-3 top-9 w-6 border-blue-400 border-2 rounded-full ${!open && "rotate-180"} bg-blue-400`} onClick={() => setOpen(!open)}>
      <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
    </svg> */}

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
              <UserProfile user={searchedUser} openModel={() => openUserModal(searchedUser)} /> : 
              <p className='ml-4'>Phone number does not exists</p>
          }
        </div>
      </> :
      !showListFriendRequest ? (
        <>
          <div className='flex items-center justify-center pt-5 cursor-pointer'
            onClick={handleShowListFriendRequest}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 ml-4 rounded-lg bg-blue-400 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>

            <p className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'>Friend Request</p>
          </div>

          <h1 className='pt-6 pl-5 pr-5 font-medium'>All Message</h1>

          <div className='h-4/5 overflow-y-scroll'>
            {
              friends.map((elem, i) => <Chat key={i} userRoot={user} user={elem} setCurrentFriend={() => handleCurrentFriend2(elem)} handleUser={handleUser}/>)
            }
            {
              rooms.map((elem, i) => <RoomChat key={i} userRoot={user} user={elem} setCurrentFriend={() => handleCurrentFriend2(elem)} />)
            }

          </div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-center pt-5 cursor-pointer'
            onClick={handleShowListFriendRequest}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 ml-4 rounded-lg bg-blue-400 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

            <p className='p-2 ml-4 mr-4 mb-0 w-5/6 rounded-full'>All Message</p>
          </div>

          <h1 className='pt-6 pl-5 pr-5 font-medium'>Friend Requests</h1>

          <div className='h-4/5 overflow-y-scroll'>
            {
              friendsRequestGet.map((elem, i) => {
                return <FriendRequest key={i} userRoot={user} user={elem} handleUser={handleUser} />
              })
            }
          </div>
        </>
      )
    }
   </div>
  )
}