import React, {useState} from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data';

export default function ChatInput({socketRef, socket, user, currentFriend, idRoom}) {
  const [message, setMessage] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const openInputFile = () => {
    document.getElementById("file").click();
  }

  const openEmojiPicker = () => {
    setPickerVisible(!isPickerVisible);
  }

  const selectEmoji = e => {
    // setPickerVisible(false);
    document.getElementById("message").value += e.native;
    setMessage(document.getElementById("message").value);
  }

  const handleMessage = event => {
    setMessage(event.target.value);
  }

  const handleFile = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    const objectURL = URL.createObjectURL(file);

    reader.onloadend = function () {
      sendFileMessage(file, reader.result, objectURL)
    }

    reader.readAsDataURL(file);
  }

  const sendTextMessage = () => {
    if (message) {
      const msg = {
        sender: user.phoneNumber, 
        sender_name: user.name, 
        receiver: currentFriend.phoneNumber, 
        date: new Date().toLocaleString(),
        content: message, 
        type: "text", 
        status: "ready"
      }
      socketRef.current.emit(user.phoneNumber, msg)

      document.getElementById("message").value = "";
      setMessage("");
    }
  }

  const sendFileMessage = (file, content, link) => {
      // console.log("Called send file message");

      const msg = {
        sender: user.phoneNumber, 
        sender_name: user.name, 
        receiver: currentFriend.phoneNumber, 
        date: new Date().toLocaleString(),
        filename: file.name, 
        type: file.type, 
        link: link, 
        content: content, 
        status: "ready"
      }
      socketRef.current.emit(user.phoneNumber, msg)

      document.getElementById("message").value = "";
      setMessage("");
  }

  const sendMessage = msg => {
    if (message) {
      let content = message;
      let userID = user.phoneNumber;
      let receiverID = currentFriend.phoneNumber;
      let type = 'text';

      socket.emit('chat-message', {
        type: "text", 
        idMessage: "mess" + new Date().valueOf(), 
        date: new Date().toLocaleString(),  
        idRoom, 
        sender: userID,
        sender_name: user.name,
        receiver: receiverID,
        content: content,
        chat_type: type,
        status: "ready"
      });
    }
  };

  return (
    <div className='flex items-center p-5 gap-7 justify-around'>
      <div className={isPickerVisible ? 'absolute top-1/3 left-2/3' : 'hidden'}>
        <Picker data={data} onEmojiSelect={selectEmoji} />
      </div>

      {/* Micro */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>

      {/* Sending file */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"
        onClick={openInputFile}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
      </svg>
      <input type='file' id='file' className='hidden' onChange={handleFile}></input>

      {/* Sending text */}
      <input type='text' id='message' placeholder='Type your message...' className='border-2 rounded-full p-2 grow'
        values={message}
        onChange={handleMessage}
      />

      {/* Emoji Picker */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"
        onClick={openEmojiPicker}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>

      {/* Send button */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 -rotate-45" 
        // onClick={sendTextMessage}
        onClick={sendMessage}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    </div>
  )
}
