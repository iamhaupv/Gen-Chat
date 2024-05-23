import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

import loginUser from '../services/users/loginUser'

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePhoneNumber = event => {
    setPhoneNumber(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const logIn = async () => {
    try {
      const user = await loginUser(phoneNumber, password);
      alert("Log in successfully!")
      navigate("/Main", { state: { user: user } });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <img className="mb-4" src={logo}></img>

      <h1 className="text-2xl font-semibold mb-4">Welcome to Gen Chat!</h1>
      
      {/* <htmlForm action="http://localhost:6969/users/login" method="POST"> */}
        {/* <!-- Phone Number Input --> */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-600">Username</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
        </div>

        {/* <!-- Password Input --> */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={password}
            onChange={handlePassword}
          />
        </div>

        {/* <!-- Remember Me Checkbox --> */}
        {/* <div className="mb-4 flex items-center">
          <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
          <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
        </div> */}

        <div className="flex justify-between mb-4">
          {/* <!-- Sign up  Link --> */}
          <div className="text-blue-500">
          <a href="/OTP" className="hover:underline">Sign Up Here</a>
          </div>

          {/* <!-- Forgot Password Link --> */}
          <div className="text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
        </div>

        {/* <!-- Login Button --> */}
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          onClick={logIn}
        >
          Login
        </button>
      {/* </htmlForm> */}
    </div>
  )
}
