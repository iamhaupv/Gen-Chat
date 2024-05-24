import React, { useState, useRef, useEffect } from "react";
import ChatData from "./ChatData";
import ChatUser from "./ChatUser";
import ChatInput from "./ChatInput";
import Profile from "./Profile";

import socket from "../utils/socketGroup";
import InitialIcon from "./InitialIcon";

import background from "../assets/background.png";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

import { StringeeClient } from "stringee";
import getCallToken from "../services/getCallToken";

import GlobalVariable from "../GlobalVariable";

export default function Chats({ user, currentFriend, handleCurrentFriend }) {
  const [openRight, setOpenRight] = useState(true);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [mess, setMess] = useState([]);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  const socketRef = useRef();
  let idRoom = null;

  const friend = user.listFriend.find((elem) => {
    return elem.friend_id == currentFriend.phoneNumber;
  });

  if (friend != undefined) idRoom = friend.room_id;
  else idRoom = currentFriend.phoneNumber;

  useEffect(() => {
    if (idRoom) {
      socket.emit("join", idRoom);
      socket.emit("init-chat-message", idRoom);
    }
  }, [idRoom]);

  useEffect(() => {
    socket.on("chat-message-2", (msg) => {
      setMess(msg);
    });

    socket.on("rooms", (data) => {
      setMess(data);
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    };
  }, []);

  const renderMess = mess.map((m, index) => {
    let chat;

    if (m.chat_type == "1-1") {
      if (
        (m.sender == user.phoneNumber) &
          (m.receiver == currentFriend.phoneNumber) ||
        (m.receiver == user.phoneNumber) &
          (m.sender == currentFriend.phoneNumber)
      ) {
        chat =
          m.sender == user.phoneNumber ? (
            <ChatUser message={m} key={index} socketRef={socketRef} />
          ) : (
            <ChatData message={m} key={index} socketRef={socketRef} />
          );
      }
    } else if (m.chat_type != "notification") {
      if (
        m.receiver == currentFriend.phoneNumber ||
        (m.receiver == user.phoneNumber) &
          (m.sender == currentFriend.phoneNumber)
      ) {
        chat =
          m.sender == user.phoneNumber ? (
            <ChatUser message={m} key={index} socketRef={socketRef} />
          ) : (
            <ChatData message={m} key={index} socketRef={socketRef} />
          );
      }
    } else {
      chat = <Notification message={m} key={index} />;
    }

    return chat;
  });

  const isExistUserInGroup = () => {
    if (!currentFriend.name)
      if (!isEmpty(currentFriend))
        if (currentFriend.user.indexOf(user.phoneNumber) < 0)
          return currentFriend.admin == user.phoneNumber;
        else return true;

    return true;
  };

  async function getToken() {
    const token = await getCallToken(user.phoneNumber);

    GlobalVariable.client.connect(token.data);

    GlobalVariable.client.on("incomingcall", (incomingcall) => {
      document.getElementById("my_modal_Call").showModal();
    });
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className={`flex w-full`}>
      {currentFriend.name ? (
        <>
          <div className={`h-screen ${open ? "w-full" : "w-full"}`}>
            <nav className="flex items-center justify-between p-2 pl-5 pr-5">
              <div className="flex items-center">
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <InitialIcon
                      size={10}
                      initials={currentFriend.name
                        .match(/(\b\S)?/g)
                        .join("")
                        .match(/(^\S|\S$)?/g)
                        .join("")
                        .toUpperCase()}
                    />
                  </div>
                </div>
                <p className="font-medium text-xl ml-5">{currentFriend.name}</p>
              </div>

              <div className="flex items-center justify-between gap-4 ">
                <div className=""></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={async () => {
                    const token = await getCallToken(user.phoneNumber);

                    GlobalVariable.client.connect(token.data);

                    console.log("-------------------");
                    console.log({
                      id: user.phoneNumber,
                      calleeId: currentFriend.phoneNumber,
                      token: token.data,
                      request: "call",
                    });

                    navigate("/CallScreen", {
                      state: {
                        id: user.phoneNumber,
                        calleeId: currentFriend.phoneNumber,
                        token: token.data,
                        request: "call",
                      },
                    });
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <dialog id="my_modal_Call" className="modal">
                  <div className="card card-compact w-80 bg-base-100 shadow-xl">
                    <form method="dialog">
                      <button
                        id="close_call"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>
                    </form>

                    <div className="card-body justify-center w-full">
                      <div className="rounded-full border-2 border-white justify-center flex">
                        <InitialIcon
                          size={24}
                          initials={user.name
                            .match(/(\b\S)?/g)
                            .join("")
                            .match(/(^\S|\S$)?/g)
                            .join("")
                            .toUpperCase()}
                        />
                      </div>
                      <h2 className="text-center font-bold">{user.name}</h2>

                      <div className="card-actions justify-center">
                        {/* deny */}
                        <svg
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 122.88"
                          className="w-10 h-10"
                        >
                          <defs></defs>
                          <path
                            class="cls-1"
                            fill="#ff3b30"
                            fillRule="evenodd"
                            d="M104.89,104.89a61.47,61.47,0,1,1,18-43.45,61.21,61.21,0,0,1-18,43.45ZM74.59,55.72a49.79,49.79,0,0,0-12.38-2.07A41.52,41.52,0,0,0,48,55.8a1.16,1.16,0,0,0-.74.67,4.53,4.53,0,0,0-.27,1.7,16.14,16.14,0,0,0,.2,2c.42,3,.93,6.8-2.42,8l-.22.07-12,3.24-.12,0A4.85,4.85,0,0,1,28,70a11.44,11.44,0,0,1-2.68-4.92,11,11,0,0,1,.42-6.93A23.69,23.69,0,0,1,29,52.39,21.52,21.52,0,0,1,36.55,46a42.74,42.74,0,0,1,10.33-3.6l.29-.07C49,42,51,41.48,53.08,41.17a62.76,62.76,0,0,1,25.14,1.59c6.87,2,13,5.43,16.8,10.7a13.88,13.88,0,0,1,2.92,9.59,12.64,12.64,0,0,1-4.88,8.43,1.34,1.34,0,0,1-1.26.28L78.6,68.38A3.69,3.69,0,0,1,75.41,66a7.73,7.73,0,0,1-.22-4,15.21,15.21,0,0,1,.22-1.6c.3-1.89.63-4.06-.89-4.72Z"
                            onClick={() => {
                              document.querySelector("#close_call").click();
                            }}
                          />
                        </svg>

                        {/* acccept */}
                        <svg
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 122.88"
                          className="w-10 h-10"
                          style={{
                            transform: "rotate(-135deg)",
                          }}
                        >
                          <path
                            class="cls-1"
                            fill="green"
                            fillRule="evenodd"
                            d="M104.89,104.89a61.47,61.47,0,1,1,18-43.45,61.21,61.21,0,0,1-18,43.45ZM74.59,55.72a49.79,49.79,0,0,0-12.38-2.07A41.52,41.52,0,0,0,48,55.8a1.16,1.16,0,0,0-.74.67,4.53,4.53,0,0,0-.27,1.7,16.14,16.14,0,0,0,.2,2c.42,3,.93,6.8-2.42,8l-.22.07-12,3.24-.12,0A4.85,4.85,0,0,1,28,70a11.44,11.44,0,0,1-2.68-4.92,11,11,0,0,1,.42-6.93A23.69,23.69,0,0,1,29,52.39,21.52,21.52,0,0,1,36.55,46a42.74,42.74,0,0,1,10.33-3.6l.29-.07C49,42,51,41.48,53.08,41.17a62.76,62.76,0,0,1,25.14,1.59c6.87,2,13,5.43,16.8,10.7a13.88,13.88,0,0,1,2.92,9.59,12.64,12.64,0,0,1-4.88,8.43,1.34,1.34,0,0,1-1.26.28L78.6,68.38A3.69,3.69,0,0,1,75.41,66a7.73,7.73,0,0,1-.22-4,15.21,15.21,0,0,1,.22-1.6c.3-1.89.63-4.06-.89-4.72Z"
                            onClick={async () => {
                              const token = await getCallToken(
                                user.phoneNumber
                              );

                              navigate("/CallScreen", {
                                state: {
                                  id: user.phoneNumber,
                                  calleeId: currentFriend.phoneNumber,
                                  token: token.data,
                                  request: "listen",
                                },
                              });
                            }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </dialog>

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
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setOpenRight(!openRight)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </nav>

            <div className="h-4/5 overflow-y-scroll bg-gradient-to-b from-blue-50 via-blue-100 to-pink-200 ">
              {renderMess.map((elem, i) => {
                return elem;
              })}
            </div>

            {isExistUserInGroup() ? (
              <ChatInput
                socketRef={socketRef}
                socket={socket}
                user={user}
                currentFriend={currentFriend}
                idRoom={idRoom}
              />
            ) : (
              <div className="flex items-center p-5 gap-7 justify-around">
                <p className="text-xl text-red-400">
                  You had been kicked out of this group
                </p>
              </div>
            )}
          </div>

          <Profile
            state={openRight}
            user={currentFriend}
            userRoot={user}
            handleCurrentFriend={handleCurrentFriend}
          />
        </>
      ) : (
        <img src={background} className="h-screen w-full"></img>
      )}
    </div>
  );
}
