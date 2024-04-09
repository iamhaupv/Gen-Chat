import React, { useState, useEffect } from 'react';
import { Button, TextInput, View } from 'react-native';
// import auth from '../firebase/config.js';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  //   If null, no SMS has been sent
  console.log(auth);
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

  
  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
        const confirmation = await auth().signInWithPhoneNumber('0374858237');
        setConfirm(confirmation);    
    } catch (error) {
        console.log(error);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  signInWithPhoneNumber();

  return (
      
    <View>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>

    //   <View></View>
  );
}