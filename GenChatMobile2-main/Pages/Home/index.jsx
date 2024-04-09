import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, useWindowDimensions  } from 'react-native';
import React from 'react';

import GlobalStyle from '../../GlobalStyle.js';
import GlobalAsset from '../../GlobalAsset.js';

import OTPResetPassword from '../../Components/OTPResetPassword.js';
import ResetPassword from '../../Components/ResetPassword.js';
import ForgotPassword from '../../Components/ForgotPassword.js';
import PhoneInput from '../../Components/PhoneInput.js';
import SignIn from '../../Components/SignIn.js';
import SignUp from '../../Components/SignUp.js';
import OTP from '../../Components/OTP.js';

export default function Home() {
  const styles = GlobalStyle();
  const layout = useWindowDimensions();

  let coverImageView = <View style={styles.coverImageWrapper} >
    <Image style={styles.coverImage} source={GlobalAsset.coverImage}></Image>
  </View>;

  if (layout.width < layout.height * 3 / 2) {
    coverImageView = <></>
  }

  const Tab = createNativeStackNavigator();

  return (
    <View style={{
      flex: 1,
      flexDirection: "row", 
      backgroundColor: 'black',
    }}>
      <Tab.Navigator
        // screenOptions={{ headerShown: false }} rknrelbnrelbnln hẻhkrk
      >
        <Tab.Screen name="Sign In" component={SignIn} />
        <Tab.Screen name="Sign Up" component={SignUp} />
        <Tab.Screen name="Phone Input" component={PhoneInput} />
        <Tab.Screen name="Forgot Password" component={ForgotPassword} />
        <Tab.Screen name="Reset Password" component={ResetPassword} />
        <Tab.Screen name="OTP Reset Password" component={OTPResetPassword} />
        <Tab.Screen name="OTP" component={OTP} />
      </Tab.Navigator>

      {coverImageView}
    </View>
  )
}