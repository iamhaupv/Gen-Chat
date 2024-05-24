import React, { useEffect, useLayoutEffect } from 'react'
import GlobalVariable from "../GlobalVariable";
import { useNavigate, useLocation } from "react-router-dom";
import { StringeeClient, StringeeCall } from "stringee";

export default function CallScreen() {
  const {state} = useLocation();
  const navigate = useNavigate();

  console.log("lmaoae");
  
  const {id, calleeId, token, request} = state;
  console.log("------------- state");
  console.log(state);

  let currentCall = null;

  useLayoutEffect(() => {
    const STRINGEE_SERVER_ADDRS = [
      "wss://v1.stringee.com:6899/",
      "wss://v2.stringee.com:6899/"
    ];
    const client = new StringeeClient(STRINGEE_SERVER_ADDRS);
    
    client.connect(token);

    client.on('authen', (res) => {
      console.log(`Stringee Authenticate: `, res);
    });

    const remoteVideo = document.querySelector("#remoteVideo");
    const localVideo = document.querySelector("#localVideo");

    console.log(remoteVideo);
    console.log(localVideo);

    client.on("incomingcall", (incomingcall) => {
      console.log("----------- Incoming call");
      console.log(incomingcall);
      currentCall = incomingcall;
      settingCallEvent(currentCall);
      console.log("Call JS: ", incomingcall);
    });

    function answerACallIncoming() {
      console.log("------- answer call");
      currentCall.answer((res) => {
        console.log(`answer res ${res}`);
      });
    }

    function settingCallEvent(callObject) {
      callObject.on('addremotestream', function (stream) {
        console.log('addremotestream');
        remoteVideo.srcObject = null;
        remoteVideo.srcObject = stream;
      });

      callObject.on('addlocalstream', function (stream) {
        console.log('addlocalstream, khong xu ly event nay, xu ly o event: addlocaltrack');
        localVideo.srcObject = null;
        localVideo.srcObject = stream;
      });

      callObject.on('addlocaltrack', function (stream) {
        console.log('addlocaltrack');
        localVideo.srcObject = null;
        localVideo.srcObject = stream;
      });

      callObject.on('signalingstate', function (state) {
        console.log('signalingstate ', state);
        if (state.code === 6 || state.code === 5) {
          localVideo.srcObject = null;
          remoteVideo.srcObject = null;
          currentCall.hangup((res) => {
            console.log(`Hangup res: ${res}`);
          })
          navigate(-1);
        }
      });
      callObject.on('mediastate', function (state) {
        console.log('mediastate ', state);
      });
      callObject.on('info', function (info) {
        console.log('++++info ', info);
      });
      }

    function createCall() {
      console.log(`Make Call Callback`);
      // currentCall = new StringeeCall(client, "id" + id, "id" + calleeId, true);
      currentCall = new StringeeCall(client, "nghia", "long", true);
      settingCallEvent(currentCall);
      currentCall.makeCall((res) => {
        console.log(`Make Call Callback: ${JSON.stringify(res)}`);
        if (res.message === 'SUCCESS') {
          document.dispatchEvent(new Event('connect_ok'))
        }
      })
    }

    setTimeout(() => {
      if (request == "call") {
        createCall();
        console.log("Make Call");
      } else if (request == "listen") {
        answerACallIncoming();
        console.log("Answer Success");
      }
    }, 3000);
  }, );

  return (
    <div className='w-screen h-screen bg-slate-500 flex flex-col gap-10 items-center justify-center'>

      <div className='w-screen h-screen flex flex-col'>
          <div id='tv' class="relative w-screen flex border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl flex-1 justify-around">
            <video id="localVideo" autoPlay={true} muted className=' bg-blue-600 self-center'></video>
            <video id="remoteVideo" autoPlay={true} className=' bg-green-600 self-center'></video>
          </div>
          
          <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-full">
            <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
          </div>

      </div>

      <svg id="btnEndCall" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" className='w-32 h-32'><defs></defs><path class="cls-1" fill='#ff3b30' fillRule='evenodd' d="M104.89,104.89a61.47,61.47,0,1,1,18-43.45,61.21,61.21,0,0,1-18,43.45ZM74.59,55.72a49.79,49.79,0,0,0-12.38-2.07A41.52,41.52,0,0,0,48,55.8a1.16,1.16,0,0,0-.74.67,4.53,4.53,0,0,0-.27,1.7,16.14,16.14,0,0,0,.2,2c.42,3,.93,6.8-2.42,8l-.22.07-12,3.24-.12,0A4.85,4.85,0,0,1,28,70a11.44,11.44,0,0,1-2.68-4.92,11,11,0,0,1,.42-6.93A23.69,23.69,0,0,1,29,52.39,21.52,21.52,0,0,1,36.55,46a42.74,42.74,0,0,1,10.33-3.6l.29-.07C49,42,51,41.48,53.08,41.17a62.76,62.76,0,0,1,25.14,1.59c6.87,2,13,5.43,16.8,10.7a13.88,13.88,0,0,1,2.92,9.59,12.64,12.64,0,0,1-4.88,8.43,1.34,1.34,0,0,1-1.26.28L78.6,68.38A3.69,3.69,0,0,1,75.41,66a7.73,7.73,0,0,1-.22-4,15.21,15.21,0,0,1,.22-1.6c.3-1.89.63-4.06-.89-4.72Z" onClick={() => {
        currentCall.hangup((res) => {
          console.log(`Hangup res: ${res}`);
        })
        navigate(-1);
      }}/></svg>
      

    </div>
  )
}
