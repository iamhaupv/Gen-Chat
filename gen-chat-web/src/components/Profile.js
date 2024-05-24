import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import InitialIcon from "./InitialIcon";

import getInfor from "../services/users/getInfor";
import socket from "../utils/socketGroup";
import getListFriend from "../services/users/getListFriend";
import findUserByPhoneNumber from "../services/users/findUserByPhoneNumber";

export default function Profile(props) {
  const [users, setUsers] = useState([]);
  const isOpen = props.state;
  const user = props.user;
  const userRoot = props.userRoot;
  const [remainingUsers, setRemainingUsers] = useState([]);

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  const getFriendList = async () => {
    const friendList = await getListFriend(user.admin);

    const friendFound = [];

    for (let i = 0; i < friendList.length; i++) {
      const friend = await findUserByPhoneNumber(friendList[i].friend_id);

      if (user.user.indexOf(friend.data.phoneNumber) == -1)
        friendFound.push(friend.data);
    }

    setRemainingUsers(friendFound);
  };

  const handleCurrentFriend2 = (friend) => {
    props.handleCurrentFriend(friend);
  };

  let comp;

  const handleOpenUserList = async () => {
    const friends = [];

    const admin = await getInfor(user.admin);

    friends.push(admin.data);

    for (let i = 0; i < user.user.length; i++) {
      const friend = await getInfor(user.user[i]);

      friends.push(friend.data);
    }

    setUsers(friends);
    document.getElementById("group_info_modal").showModal();
  };

  const handleAddNewUser = async () => {
    let checkedUsers = getCheckedBoxes("newUser");

    let checkedUsersObject = [];

    for (let i = 0; i < checkedUsers.length; i++) {
      const userObj = await findUserByPhoneNumber(checkedUsers[i]);
      checkedUsersObject.push(userObj.data);
    }

    socket.emit("add-new-user", {
      id: user.id,
      user: user.user,
      admin: user.admin,
      remainingUser: checkedUsers,
      remainingUserPhoneNumber: checkedUsersObject,
    });

    alert("Add new friend successfully!");
  };

  const handleRemoveFriend = async (removedUser) => {
    socket.emit("remove-user-from-group", { user, removedUser });
    alert("Remove friend successfully!");
    document.getElementById("btnCloseModal").click();
  };

  const handleOutGroup = async (user) => {};

  const handleRemoveRoom = async () => {
    handleCurrentFriend2({});
    socket.emit("destroy-room", user);
    document.getElementById("btnCloseModal").click();
  };

  if (!isNaN(user.phoneNumber.charAt(0))) {
    comp = (
      <div
        className={`flex flex-col duration-300 ${isOpen ? "w-3/5" : "hidden"}`}
      >
        <h1 className="text-center font-medium text-xl mt-5 border-b-2 pb-2">
          Information
        </h1>

        <div className="avatar items-center justify-center pt-8">
          <div className="w-16 rounded-full">
            <InitialIcon
              size={16}
              initials={user.name
                .match(/(\b\S)?/g)
                .join("")
                .match(/(^\S|\S$)?/g)
                .join("")
                .toUpperCase()}
            />
          </div>
        </div>

        <div className="flex flex-row mt-5 items-center justify-center gap-4">
          <h1 className="font-medium text-xl">{user.name}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>

        <div className="flex flex-row mt-5 items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <p className="text-sm text-center">Tắt thông báo</p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            <p className="text-sm text-center">Tạo nhóm trò chuyện</p>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <p className="text-sm text-center">Ghim hội thoại</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex p-3 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>Danh sách nhắc hẹn</p>
          </div>

          <div className="flex p-3 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <p>11 nhóm chung</p>
          </div>
          <div
            className="flex p-3 gap-3"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            <circle
              className="h-6 w-6 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200
         rounded-full"
            ></circle>
            <p>Thay đổi chủ đề</p>
          </div>
        </div>
        {/* <dialog id="my_modal_4" className="modal">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>    
            <h3 className='card-title justify-center'>Chủ đề</h3>                  
      <div className="card-body">
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-yellow-100 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>
        <div className='flex flex-row justify-between'>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            <div className='h-20 w-20 bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 rounded-full'/>
            
        </div>

            
      </div>
    </div>
    </dialog> */}
      </div>
    );
  } else {
    comp = (
      <div
        className={`flex flex-col duration-300 ${isOpen ? "w-3/5" : "hidden"}`}
      >
        <h1 className="text-center font-medium text-xl mt-5 border-b-2 pb-2">
          Group Information
        </h1>

        {/* Group Modal */}
        <dialog id="group_info_modal" className="modal" add="true">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="btnCloseModal"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {/* All friend title */}
            <p className="font-bold pb-5">User list</p>

            {/* All friend title */}
            <div className="border-gray-200">
              {users.map((elem, i) => {
                if (userRoot.phoneNumber == user.admin) {
                  if (elem.phoneNumber == user.admin)
                    return (
                      <div key={i} className="flex items-center">
                        <Chat key={i} user={elem} setCurrentFriend={null} />

                        <button
                          className="bg-red-500 rounded-full p-2"
                          onClick={() => handleOutGroup(elem)}
                        >
                          <p className="text-white">Out</p>
                        </button>
                      </div>
                    );
                  else
                    return (
                      <div key={i} className="flex items-center">
                        <Chat key={i} user={elem} setCurrentFriend={null} />

                        <button
                          className="bg-red-500 rounded-full p-2"
                          onClick={() => handleRemoveFriend(elem)}
                        >
                          <p className="text-white">Remove</p>
                        </button>
                      </div>
                    );
                } else {
                  return (
                    <div key={i} className="flex items-center">
                      <Chat key={i} user={elem} setCurrentFriend={null} />
                    </div>
                  );
                }
              })}
            </div>

            <div className="flex justify-center">
              {users.map((elem, i) => {
                if (userRoot.phoneNumber == user.admin) {
                  if (elem.phoneNumber == user.admin) {
                    return (
                      <div className="flex justify-around w-full p-2">
                        <button
                          key={i}
                          className="bg-green-400 text-white p-2 font-bold rounded-full"
                          onClick={() =>
                            document.getElementById("my_modal_2").showModal()
                          }
                        >
                          Add new user
                        </button>
                        <button
                          key={"b" + i}
                          className="bg-red-600 text-white p-2 font-bold rounded-full"
                          onClick={() => handleRemoveRoom()}
                        >
                          Remove room
                        </button>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="btnCloseModal"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {/* All friend title */}
            <p className="font-bold pb-5">Select new user to added to group</p>

            <div className="border-gray-200">
              {remainingUsers.map((elem, i) => {
                if (userRoot.phoneNumber == user.admin) {
                  return (
                    <div key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        name="newUser"
                        value={elem.phoneNumber}
                      ></input>

                      <Chat key={i} user={elem} setCurrentFriend={null} />
                    </div>
                  );
                }
              })}
            </div>

            <button
              className="bg-green-400 text-white p-2 font-bold rounded-full"
              onClick={() => handleAddNewUser()}
            >
              Add new user
            </button>
          </div>
        </dialog>

        <div className="avatar items-center justify-center pt-8">
          <div className="w-16 rounded-full">
            <InitialIcon
              size={16}
              initials={user.name
                .match(/(\b\S)?/g)
                .join("")
                .match(/(^\S|\S$)?/g)
                .join("")
                .toUpperCase()}
            />
          </div>
        </div>

        <div className="flex flex-row mt-5 items-center justify-center gap-4">
          <h1 className="font-medium text-xl">{user.name}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>

        <div className="flex flex-row mt-5 items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <p className="text-sm text-center">Tắt thông báo</p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rounded-full bg-gray-200 p-1 border-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <p className="text-sm text-center">Ghim hội thoại</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex p-3 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <p onClick={handleOpenUserList}>Danh sach thanh vien</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (user.admin != null) getFriendList();
  }, []);

  return comp;
}
