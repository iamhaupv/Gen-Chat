import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import OTP from '../components/OTP';

export default function Home() {

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <Routes>
        <Route index path="/" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/OTP" element={<OTP/>}></Route>
      </Routes>

      <div className="w-1/2 h-screen hidden  lg:block">
        <img src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Placeholder Image" className="object-cover w-full h-full"></img>
      </div>
    </div>
  )
}
