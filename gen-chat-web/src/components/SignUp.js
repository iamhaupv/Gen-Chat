import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import config from '../firebase/config.js';
import loginUser from '../services/users/loginUser.js'

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("NOT_INPUT_NUMBER")
  const [OTP, setOTP] = useState('');
  const [alerts, setAlerts] = useState({});
  const [formatPh, setFormatPh] = useState("");
  const navigate = useNavigate();

  const auth = config.auth;
  const appVerifier = window.recaptchaVerifier;

  console.log(auth);

  const handlePhoneNumber = event => {
    setPhoneNumber(event.target.value);
  };

  const handleSignUp = () => {
    let errors = {};
    if (!phoneNumber)
      errors.error = "Phone Number must not null";
    
    if (errors.error)
      setErrors(errors);
    else
      signInWithPhone();
  }

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      setFormatPh("+" + phoneNumber);

      console.log("-------- PHone");
      console.log("+" + phoneNumber);

      const appVerifier = window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(status);
            signInWithPhone();
          },
          "expired-callback": () => {
            
          },
        }
      );

      signInWithPhoneNumber(auth, "+" + phoneNumber, appVerifier)
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
  }

  const signInWithPhone = () => {
    onCaptchVerify();

    setStatus("dgfjn");
  }

  // 

  const handleOTP = event => {
    setOTP(event.target.value);
  };

  const sendingCode = () => {
    console.log("---------------------- PH ");
    console.log("+" + phoneNumber);

    signInWithPhoneNumber(auth, "+" + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alerts.alert = "OTP sended successfully!";
        setAlerts(alerts);
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

  // 

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      {
        status == "NOT_INPUT_NUMBER" ? (
          <>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
              <img className="mb-4" src={logo}></img>

              <h1 className="text-2xl font-semibold mb-4">Sign Up to Gen Chat!</h1>
              
              {/* <htmlForm action="http://localhost:6969/users/login" method="POST"> */}
                {/* <!-- Phone Number Input --> */}
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-600">Please enter the Phone Number that we can use to send the OTP</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                </div>
                
                {/* <!-- Forgot Password Link --> */}
                <div className="text-blue-500 py-2">
                  <a href="/" className="hover:underline">Return to Main page</a>
                </div>

                {/* <!-- Sign Up Button --> */}
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>

                {/* <!-- Error --> */}
                <div className="text-red-500 py-2">
                  <p href="/" className="hover:underline">{errors.error}</p>
                </div>

              {/* </htmlForm> */}

            </div>
          </>
        ) : (
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

            {/* </htmlForm> */}
          </div>
        )
      }

      <div className="w-1/2 h-screen hidden  lg:block">
        <img src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Placeholder Image" className="object-cover w-full h-full"></img>
      </div>

      <div id='recaptcha-container'></div>

    </div>
  )
}
