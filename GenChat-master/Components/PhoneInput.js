import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import React from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

export default function PhoneInput({ navigation }) {
  const route = useRoute()
  const user = route.params?.user;

  const styles = GlobalStyle();

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.twoLogoWrapper, styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
          <Image source={{uri:user.photoURL}} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome, {user.displayName}</Text>

        <Text style={[styles.marginSide, styles.fontColor]}>Please enter the phone number that we can use to send the SMS code:</Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <TextInput
            style={[styles.input, styles.fontColor]}
            inputMode='tel'
            placeholder="Phone Number"
            maxLength={10}
          />
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={() => navigation.navigate('OTP', {user: user})}>
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
