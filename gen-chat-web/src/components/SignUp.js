import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useLocation } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {state} = useLocation();

  const handleName = e => {
    setName(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handleRepeatedPassword = e => {
    setRepeatedPassword(e.target.value);
  }

  const handleVerifyInput = () => {
    let checked = true;
    if (password != repeatedPassword) {
      checked = false;
      errors.error = "Password does not match repeated password";
      setErrors(errors);
    }

    if (password.length < 8) {
      checked = false;
      errors.error = "Password must have at least 8 characters";
      setErrors(errors);
    }

    if (checked)
      alert("Sign up successfully!");
  }

  console.log(state);

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <img className="mb-4" src={logo}></img>

        <h1 className="text-2xl font-semibold mb-4">Welcome {state.phoneNumber}!</h1>
        
        {/* <htmlForm action="http://localhost:6969/users/login" method="POST"> */}
          {/* <!-- Phone Number Input --> */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
              value={name}
              onChange={handleName}
            />
          </div>

          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
              value={password}
              onChange={handlePassword}
            />
          </div>

          {/* <!-- Repeated Password Input --> */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-600">Repeat Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
              value={repeatedPassword}
              onChange={handleRepeatedPassword}
            />
          </div>

          {/* <!-- Sign Up Button --> */}
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={handleVerifyInput}
          >
            Sign Up
          </button>

          {/* <!-- Error --> */}
          <div className="text-red-500 py-2">
            <p href="/" className="hover:underline">{errors.error}</p>
          </div>

        {/* </htmlForm> */}

      </div>

      <div className="w-1/2 h-screen hidden  lg:block">
        <img src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Placeholder Image" className="object-cover w-full h-full"></img>
      </div>

    </div>
  )
}
