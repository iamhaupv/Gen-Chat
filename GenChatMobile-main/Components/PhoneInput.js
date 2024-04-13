import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
// import { collection, getDocs } from "firebase/firestore"; 
import { useRoute } from "@react-navigation/native";
// import { RecaptchaVerifier } from "firebase/auth";
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

// import config from '../firebase/config.js';

export default function PhoneInput({ navigation }) {
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

  // const checkPhoneNumber = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   let isExistPhoneNumber = false;

  //   querySnapshot.forEach(doc => {
  //     const docPhoneNumber = doc.data().phoneNumber;
      
  //     if (isExistPhoneNumber == false) {
  //       if ( docPhoneNumber == phoneNumber ) {
  //         isExistPhoneNumber = true;
  //         let errors = {};
  //         errors.error = 'Phone number already exists';
  //         setErrors(errors);
  //       }
  //     } 
  //   });

  //   if (isExistPhoneNumber == false)
  //     goToOtp();
  // }

  // function goToOtp() {
  //   onCaptchVerify();

  //   const appVerifier = window.recaptchaVerifier;
  //   const formatPh = "+" + phoneNumber;

  //   navigation.navigate('OTP', {
  //     otp: { auth, formatPh, appVerifier }, 
  //     user: { 
  //       displayName: user.displayName, 
  //       phoneNumber: phoneNumber, 
  //       photoURL: user.photoURL , 
  //       password: "", 
  //       email: user.email
  //     }
  //   });
  // }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <div id="recaptcha-container">

        </div>
        <View style={[styles.twoLogoWrapper, styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
          <Image source={{uri:user.photoURL}} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome, {user.displayName}</Text>

        <Text style={[styles.marginSide, styles.fontColor]}>Please enter the phone number that we can use to send the SMS code:</Text>

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
          // onPress={checkPhoneNumber}
        >
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text>
      </View>
    </ScrollView>
  )
}
