import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter as HomeRouter, Routes, Route } from "react-router-dom";
import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';
// import OTP from '../components/OTP';
// import host from "../GlobalVariable";

import { StringeeClient } from "stringee";

export default function Home() {
  const STRINGEE_SERVER_ADDRS = [
    "wss://v1.stringee.com:6899/",
    "wss://v2.stringee.com:6899/"
  ];
  const client = new StringeeClient(STRINGEE_SERVER_ADDRS);

  client.on('authen', (res) => {
    console.log(`authen: `, res);
  });

  client.connect();

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <Routes>
        <Route index path="/" element={<SignIn />}></Route>
        {/* <Route path="/SignUp" element={<SignUp />}></Route> */}
        {/* <Route path="/OTP" element={<OTP />}/> */}
      </Routes>
      
      <div className="w-1/2 h-screen hidden  lg:block">
        <img src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Placeholder Image" className="object-cover w-full h-full"></img>
      </div>
    </div>
  )
}
