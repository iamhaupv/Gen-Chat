import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from 'react'

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';
import config from '../firebase/config.js'

export default function EditProfle({ navigation }) {
  const route = useRoute();
  const user = route.params?.user;

  const auth = config.auth;
  const styles = GlobalStyle();

  let image = GlobalAsset.defaultLogoImage

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        {/* <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Edit Profile</Text>

        <View style={[styles.marginSide, {
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center'
        }]}>
          <Image source={{
            uri: image
          }} style={{
            width: 200, 
            borderRadius: 100, 
            aspectRatio: 1 / 1
          }}></Image>
        </View>
        
        <View style={{
          marginLeft: 40, 
          marginRight: 40, 
          flexDirection: 'row', 
        }}>
          <Text style={[styles.flex1, styles.fontColor]}>Name:</Text>
          <Text style={[styles.flex1, styles.bolder, styles.fontColor]}>{user.displayName}</Text>
        </View>

        <View style={{
          marginLeft: 40, 
          marginRight: 40, 
          flexDirection: 'row', 
        }}>
          <Text style={[styles.flex1, styles.fontColor]}>Phone Number</Text>
          <Text style={[styles.flex1, styles.bolder, styles.fontColor]}>{user.phoneNumber}</Text>
        </View> */}
      </View>
    </ScrollView>
  )
}
