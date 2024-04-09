import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  firebase,
} from "firebase/auth";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import GlobalStyle from "../GlobalStyle.js";
import GlobalAsset from "../GlobalAsset.js";

import auth from "../firebase/config.js";
//
import axios from "axios";
// import loginUser from "../services/loginUser.js";
export default function SignIn({ navigation }) {
  // console.log(auth);
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [password, onChangePassword] = useState("");

 
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  // auth.onAuthStateChanged((user) => {
  //   // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
  //   console.log(user);
  //   if (user) {
  //     navigation.navigate("Main", { user: user });
  //   }
  // });
  // console.log("firebase.auth"+ firebase.auth);
  const signInWithGoogle = async () => {
    
      var provider = new auth.GoogleAuthProvider();
      
      console.log("Pressed Sign in");
      provider.addScope('profile');
      provider.addScope('email');
      
    const userCred = await firebase.auth().signInWithPopup(provider).then(function(result){
      console.log(userCred);
      var token = result.credential.accessToken;
      var user = result.user;
    });
    
    // } catch (error) {
    //   console.log("error signGoogle:"+error );
    // }
  };
  const handleSignIn = async () => {
    try {
      // const user = await loginUser(phoneNumber, password);
      // Đăng ký thành công, chuyển hướng đến màn hình đăng nhập
      navigation.navigate("Main", {user});
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const styles = GlobalStyle();

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={[styles.container]}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>

        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>
          Welcome to Gen Chat
        </Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={[styles.fontColor]}>Phone Number</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Phone number"
            inputMode="tel"
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
            textContentType="password"
            onChangeText={onChangePassword}
            value={password}
          />
        </View>

        <View style={[styles.hyperlinkComponent, styles.marginSide]}>
          <Pressable onPress={() => navigation.navigate("Sign Up")}>
            <Text style={[styles.underline, styles.fontColor]}>Sign Up</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Forgot Password")}>
            <Text style={[styles.underline, styles.fontColor]}>
              Forgot Password
            </Text>
          </Pressable>
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={handleSignIn}>
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <View style={[styles.continueWrapper, styles.marginSide]}>
          <View style={styles.line}></View>
          <Text style={[styles.fontColor]}>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable
          style={[styles.btnGoogleWrapper, styles.marginSide]}
          onPress={signInWithGoogle}
        >
          <Image
            source={GlobalAsset.googleIcon}
            style={styles.googleIcon}
          ></Image>
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
