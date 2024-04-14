import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
// import { signInWithPhoneNumber } from "firebase/auth";
// import { setDoc, doc } from 'firebase/firestore'
import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

// import config from '../firebase/config.js';

export default function OTP({ navigation }) {
  const [OTP, setOTP] = useState('');
  const [errors, setErrors] = useState({});
  const [alerts, setAlerts] = useState({});

  const route = useRoute()
  const user = route.params?.user;

  const styles = GlobalStyle();

  const otps = route.params?.otp;
  const auth = otps.auth;
  const formatPh = otps.formatPh;
  const appVerifier = otps.appVerifier;

  // const db = config.db;

  // const signIn = () => {
  //   let errors = {};
  //   let alerts = {};

  //   signInWithPhoneNumber(auth, formatPh, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       alerts.alert = "OTP sended successfully!";
  //       setAlerts(alerts);
  //       // console.log("OTP sended successfully!");
  //     })
  //     .catch((error) => {
  //       errors.error = "Error sending OTP: " + error;
  //       setErrors(errors);
  //       console.error("Error sending OTP: " + error);
  //     });
  // }

  // const verifyInput = () => {
  //   let errors = {};

  //   if (!OTP)
  //     errors.error = 'OTP is required.';

  //   if (errors.error)
  //     setErrors(errors);
  //   else
  //     onOTPVerify();
  // }

  // function onOTPVerify() {
  //   window.confirmationResult
  //     .confirm(OTP)
  //     .then(async (res) => {
  //       addUser(user);
  //       alert("Sign Up successfully!")
  //       navigation.navigate('Main', { user });
  //     })
  //     .catch((error) => {
  //       let errors = {};
  //       errors.error = "OTP is invalid";
  //       setErrors(errors);
  //       console.error("Error verifying OTP: " + error);
  //     });
  // }

  // const addUser = async (user) => {
  //   try {
  //     // const hashedPassword = await bcrypt.hash(
  //     //   user.password, 
  //     //   "PhamVanHau"
  //     // )

  //     let userAdded = {
  //       displayName: user.displayName, 
  //       phoneNumber: user.phoneNumber, 
  //       photoURL: user.photoURL == null ? "default" : user.photoURL, 
  //       password: user.password, 
  //     }

  //     if (user.email == undefined)
  //       userAdded.email = null;
  //     else
  //       userAdded.email = user.email;

  //     await setDoc(doc(db, "users", user.phoneNumber), userAdded);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome, {user.displayName}</Text>

        <Pressable style={[styles.marginSide]} 
          // onPress={() => {signIn();}}
        >
          <Text style={[styles.underline, styles.fontColor]}>Sending Code to {user.phoneNumber}</Text>
        </Pressable>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <TextInput
            style={[styles.input, styles.fontColor]}
            inputMode='numeric'
            maxLength={6}
            onChangeText={setOTP}
            value={OTP}
            placeholder={"Enter the code from the sms we send to " + user.phoneNumber}
          />
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} 
          // onPress={() => {verifyInput();}}
        >
          <Text style={styles.btnSubmit}>Submit Code</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text>
        <Text style={[styles.success, styles.marginSide]}>{alerts.alert}</Text>
      </View>
    </ScrollView>
  )
}
