import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber } from "firebase/auth";
import loginUser from '../services/users/loginUser.js'
import config from '../firebase/config.js';

export default function OTP({navigation}) {
  const [OTP, setOTP] = useState('');
  const [errors, setErrors] = useState({});
  const [alerts, setAlerts] = useState({});
  const navigate = useNavigate();

  console.log(navigation);

  let auth, formatPh, appVerifier;
//   console.log(auth);
//   console.log(formatPh);
//   console.log(appVerifier);
//   const auth = props.auth;
//   const formatPh = props.formatPh;
//   const appVerifier = props.appVerifier;

  const handleOTP = event => {
    setOTP(event.target.value);
  };

  const handleSignUp = () => {

  }

  const sendingCode = () => {
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alerts.alert = "OTP sended successfully!";
        setAlerts(alerts);
        // console.log("OTP sended successfully!");
      })
      .catch((error) => {
        errors.error = "Error sending OTP: " + error;
        setErrors(errors);
        console.error("Error sending OTP: " + error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        // addUser(user);
        console.log("---------------------------");
        handleSignUp();
        console.log("===========================");
        navigate("/Main");
      })
      .catch((error) => {
        errors.error = "Error verifying OTP: " + error;
        setErrors(errors);
        console.error("Error verifying OTP: " + error);
      });
  }

  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <img className="mb-4" src={logo}></img>

      <h1 className="text-2xl font-semibold mb-4">OTP Verification</h1>
      
      {/* <htmlForm action="http://localhost:6969/users/login" method="POST"> */}
        {/* <!-- Phone Number Input --> */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-600">Please enter the OTP that we send to this phone number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={OTP}
            onChange={handleOTP}
          />
        </div>

        {/* <!-- Forgot Password Link --> */}
        <div className="text-blue-500 py-2">
          <p className="hover:underline" 
            onClick={sendingCode}  
          >
            Sending Code to {formatPh}
        </p>
        </div>
        
        {/* <!-- Forgot Password Link --> */}
        <div className="text-blue-500 py-2">
          <a href="/" className="hover:underline">Return to Main page</a>
        </div>

        {/* <!-- Sign Up Button --> */}
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          onClick={onOTPVerify}
        >
          Submit OTP
        </button>

        {/* <!-- Error --> */}
        <div className="text-red-500 py-2">
          <p href="/" className="hover:underline">{errors.error}</p>
        </div>

        {/* <!-- Alert --> */}
        <div className="text-red-500 py-2">
          <p href="/" className="hover:underline">{alerts.alert}</p>
        </div>

        <div id='recaptcha-container'></div>
      {/* </htmlForm> */}
    </div>
  )
}
