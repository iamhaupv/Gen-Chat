import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import config from '../firebase/config.js';

export default function ResetPassword({ navigation }) {
  const [password, onChangePassword] = useState('');
  const [repeatedPassword, onChangeRepeatedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const db = config.db;
  const styles = GlobalStyle();

  const route = useRoute()
  const phoneNumber = route.params?.phoneNumber;

  const toggleShowPassword = () => setShowPassword(!showPassword); 

  const toggleShowRepeatedPassword = () => setShowRepeatedPassword(!showRepeatedPassword);

  const updatePassword = async () => {
    try {
      const users = doc(db, 'users', phoneNumber);
      console.log(users);
      setDoc(users, { password: password }, { merge: true });
      alert("Password Update successfully!");
      navigation.navigate('Sign In');
    } catch (error) {
      console.error("Error updating password: " + error);
    }
  }

  const verifyInput = () => {
    let errors = {};

    if (!password)
      errors.error = 'Password is required.';
    else if (password.length < 8)
      errors.error = 'Password must be at least 8 characters.';
    else if (password !== repeatedPassword)
      errors.error = 'Password does not match Repeated Password.';

    if (errors.error)
      setErrors(errors);
    else
      updatePassword();
  }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Reset Password</Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={styles.fontColor}>Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="New Password"
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

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={styles.fontColor}>Repeat Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Repeated New Password"
            secureTextEntry={!showRepeatedPassword}
            onChangeText={onChangeRepeatedPassword}
            value={repeatedPassword}
          />
          {/* <MaterialCommunityIcons 
            name={showRepeatedPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#aaa"
            onPress={toggleShowRepeatedPassword} 
          />  */}
        </View>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]}
          onPress={verifyInput}
        >
          <Text style={styles.btnSubmit}>Update Password</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}