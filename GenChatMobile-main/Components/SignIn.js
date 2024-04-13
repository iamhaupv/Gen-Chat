import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
// import { collection, getDocs, addDoc, query, where, updateDoc, doc, setDoc } from "firebase/firestore"; 
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';
// import GlobalUtils from '../GlobalUtils.js';

// import config from '../firebase/config.js';

export default function SignIn({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState({});

  // const db = config.db;
  // const auth = config.auth;
  // const provider = new GoogleAuthProvider();
  
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  // auth.onAuthStateChanged(async user => {

  //   // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
  //   // console.log(user);
  //   if (user) {
  //     navigation.navigate('Main', { user: user });
  //   }
  // });

  // const signInGoogle = async () => {
  //   const userCred = await signInWithPopup(auth, provider);

  //   console.log(userCred.user);
    
  //   const querySnapshot = await getDocs(collection(db, "users"));

  //   if (querySnapshot.size == 0)
  //     navigation.navigate('Phone Input', { user: {
  //       displayName: userCred.user.displayName, 
  //       photoURL: userCred.user.photoURL, 
  //       email: userCred.user.email, 
  //     } });

  //   for(let i = 0; i < querySnapshot.size; i++) {
  //     const user = querySnapshot.docs[i]._document.data.value.mapValue.fields;

  //     console.log("----------------------------------------");
  //     console.log(user);
  //     console.log("FireStore: " + user.email.stringValue);
  //     console.log("Google: " + userCred.user.email);
  //     console.log("Google: " + userCred.user.phoneNumber);

  //     if ( user.email.stringValue === userCred.user.email ) {
        
  //       // Neu nguoi dung chua nhap so dien thoai thi vao trang nhap so dien thoai
  //       // , neu khong thi vao trang Profile

  //       console.log("1");
  //       navigation.navigate('Main', { user: {
  //         displayName: userCred.user.displayName, 
  //         photoURL: userCred.user.photoURL, 
  //         email: userCred.user.email, 
  //         phoneNumber: user.phoneNumber.stringValue, 
  //       } });
  //       break;
  //     }
  //     else {

  //       console.log("2");
  //       navigation.navigate('Phone Input', { user: {
  //         displayName: userCred.user.displayName, 
  //         photoURL: userCred.user.photoURL, 
  //         email: userCred.user.email, 
  //       } });
  //       break;
  //     }
  //   }
    
  //   // querySnapshot.forEach(doc => {
  //   //   const user = doc.data();

  //   //   console.log("----------------------------------------");
  //   //   console.log(user);
  //   //   console.log("FireStore: " + user.email);
  //   //   console.log("Google: " + userCred.user.email);
  //   //   console.log("Google: " + userCred.user.phoneNumber);
      
  //   //   // Neu nguoi dung dang nhap bang google ma da co du lieu tren he thong

  //   //   if ( user.email == userCred.user.email ) {
        
  //   //     // Neu nguoi dung chua nhap so dien thoai thi vao trang nhap so dien thoai
  //   //     // , neu khong thi vao trang Profile

  //   //     console.log("1");
  //   //     navigation.navigate('Main', { user: {
  //   //       displayName: userCred.user.displayName, 
  //   //       photoURL: userCred.user.photoURL, 
  //   //       email: userCred.user.email, 
  //   //     } });
  //   //   }
  //   //   else {

  //   //     console.log("2");
  //   //     navigation.navigate('Phone Input', { user: {
  //   //       displayName: userCred.user.displayName, 
  //   //       photoURL: userCred.user.photoURL, 
  //   //       email: userCred.user.email, 
  //   //     } });

  //   //   }
  //   // });
  // }  

  // const signIn = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));

  //   querySnapshot.forEach(doc => {
  //     const user = doc.data();
      
  //     if ( 
  //       user.phoneNumber == phoneNumber &&
  //       user.password == password
  //     ) {
  //       navigation.navigate('Main', { user: {
  //         displayName: user.displayName, 
  //         phoneNumber: user.phoneNumber, 
  //         password: user.password
  //       } });
  //     }
  //   });

  //   let errors = {};
  //   errors.error = 'Login information does not exists.';
  //   setErrors(errors);
  // }
  
  const toggleShowPassword = () => setShowPassword(!showPassword); 

  const styles = GlobalStyle();
  
  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={[styles.container]}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome to Gen Chat</Text>
        
        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={[styles.fontColor]}>Phone Number</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Phone number"
            inputMode='tel'
            maxLength={11}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
          />
        </View>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={[styles.fontColor]}>Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Password"
            textContentType='password'
            secureTextEntry={!showPassword}
            onChangeText={onChangePassword}
            value={password}
          />
          {/* <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#aaa"
            onPress={toggleShowPassword} 
          />  */}
        </View>

        <View style={[styles.hyperlinkComponent, styles.marginSide]}>
          <Pressable 
            // onPress={() => navigation.navigate('Sign Up')}
          >
            <Text style={[styles.underline, styles.fontColor]}>Sign Up</Text>
          </Pressable>

          <Pressable 
            // onPress={() => navigation.navigate('Forgot Password')}
          >
            <Text style={[styles.underline, styles.fontColor]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} 
          // onPress={signIn}
        >
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 

        <View style={[styles.continueWrapper, styles.marginSide]}>
          <View style={styles.line}></View>
          <Text style={[styles.fontColor]}>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable style={[styles.btnGoogleWrapper, styles.marginSide]} 
          // onPress={signInGoogle}
        >
          <Image source={GlobalAsset.googleIcon} style={styles.googleIcon}></Image>
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}