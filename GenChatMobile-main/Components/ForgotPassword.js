import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
// import { collection, getDocs } from "firebase/firestore"; 
import { useRoute } from "@react-navigation/native";
// import { RecaptchaVerifier } from "firebase/auth";
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

// import config from '../firebase/config.js';

export default function ForgotPassword({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const route = useRoute()
  const user = route.params?.user;

  // const db = config.db;
  // const auth = config.auth;
  const styles = GlobalStyle();

  // function onCaptchVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       auth,
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           submit();
  //         },
  //         "expired-callback": () => {
            
  //         },
  //       }
  //     );
  //   }
  // }

  // const verifyInput = () => {
  //   let errors = {};

  //   if (!phoneNumber)
  //     errors.error = 'Phone Number is required.';

  //   if (errors.error)
  //     setErrors(errors);
  //   else
  //     submit();
  // }

  // const submit = async () => {
  //   onCaptchVerify();

  //   const appVerifier = window.recaptchaVerifier;
  //   const formatPh = "+" + phoneNumber;

  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     const user = doc.data();
  //     if ( doc.data().phoneNumber == phoneNumber ) {
  //       navigation.navigate('OTP Reset Password', {
  //           otp: { auth, formatPh, appVerifier }, 
  //           user: { 
  //               displayName: user.displayName, 
  //               phoneNumber: phoneNumber, 
  //               photoURL: user.photoURL, 
  //               password: user.password
  //           }
  //       });
  //     }
  //   });
  //   let errors = {};
  //   errors.error = 'Phone number does not exists';
  //   setErrors(errors);
  // }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <div id="recaptcha-container">

        </div>
        <View style={[styles.twoLogoWrapper, styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Forgot Password</Text>

        <Text style={[styles.marginSide, styles.fontColor]}>Please enter the phone number to reset your password:</Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Phone number"
            inputMode='tel'
            maxLength={11}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
          />
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} 
        // onPress={verifyInput}
        >
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 
      </View>
    </ScrollView>
  )
}
