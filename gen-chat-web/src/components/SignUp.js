import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import config from '../firebase/config.js';
import loginUser from '../services/users/loginUser.js'

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const auth = config.auth;

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

  // const signUp = async () => {
  //   console.log("Sign up");
  //   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       console.log("Responsed");
  //       onSignInSubmit();
  //     }, 
  //   });

  //   // try {
  //   //   const user = await loginUser(phoneNumber, password);
  //   //   alert("Log in successfully!")
  //   //   navigate("/Main");
  //   // } catch (error) {
  //   //   console.error("Registration error:", error);
  //   // }
  // };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            signInWithPhone();
          },
          "expired-callback": () => {
            
          },
        }
      );
    }
  }

  const signInWithPhone = () => {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + phoneNumber;

    console.log(auth);
    console.log(formatPh);
    console.log(appVerifier);

    navigate('/OTP', { otp: { auth: auth, formatPh: formatPh, appVerifier: appVerifier }});

    // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    // .then((confirmationResult) => {
    //   // SMS sent. Prompt user to type the code from the message, then sign the
    //   // user in with confirmationResult.confirm(code).
    //   window.confirmationResult = confirmationResult;
    //   console.log(confirmationResult);
    //   // ...
    // }).catch((error) => {
    //   console.error("Error sign in with phone number: " + error);
    // });
  }

  return (
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

        <div id='recaptcha-container'></div>
      {/* </htmlForm> */}
    </div>
  )
}
