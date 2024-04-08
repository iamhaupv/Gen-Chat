import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
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
import loginUser from "../services/loginUser.js";

export default function SignIn({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [password, onChangePassword] = useState("");

  const provider = new GoogleAuthProvider();
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  // auth.onAuthStateChanged((user) => {
  //   // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
  //   console.log(user);
  //   if (user) {
  //     navigation.navigate("Main", { user: user });
  //   }
  // });
  const signInWithGoogle = async () => {
    console.log("Pressed Sign in");
    const userCred = await signInWithPopup(auth, provider);
    console.log(userCred);
  };
  const handleSignIn = async () => {
    try {
      const user = await loginUser(phoneNumber, password);
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
